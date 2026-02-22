import type { RelatedValidators, GetRelatedValidatorReturn, ValidatorFn } from "felixtypes";
import { DEFAULT_ERR_MSG,
getExpectedMsg } from "./utils.js";
import { INTERNAL_getValidator } from "$lib/internal/getValidator/index.js";

/**
 * @template T
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: T"
 * @returns an asserter of the amalgamated refiners
 * @see {@link getAsserter}, which does not take a type for V (returns "v: unknown: asserts v is...")
 * @see {@link getAsserter} for more notes, incl. on the default errMsg / providing your own
 * @example 'getAsserter<string>()("dateStr", "digitStr")' returns '(v: string) => asserts v is DateStr | DigitStr'
*/
const getRelatedAsserter = <const T>() => {
    const provideRefiners = <const RType extends T, const VType extends ReadonlyArray<RelatedValidators<T> | ValidatorFn<RType, T>>>(
        ...refiners: VType
    ) => {
        type Asserted = GetRelatedValidatorReturn<T, RType, VType>;

        const defaultErrMsg = getExpectedMsg(...refiners as any) || DEFAULT_ERR_MSG;
        
        const validatorArr = refiners.map((idenOrFn) => INTERNAL_getValidator(idenOrFn));
        const refiner = (v: T) => validatorArr.some((validator) => (validator as any)(v));
    
        function asserter<const TErrMsg extends string>(v: T, errMsg?: TErrMsg): asserts v is Asserted {
            if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
        }

        return asserter;

    }

    return provideRefiners;
}