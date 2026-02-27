import { getErrMsg } from "./getErrMsg.js";
import { INTERNAL_getValidator } from "../../internal/getValidator/index.js";
/**
 * @template T
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: T"
 * @returns an asserter of the amalgamated refiners
 * @see {@link getAsserter}, which does not take a type for V (returns "v: unknown: asserts v is...")
 * @see {@link getAsserter} for more notes, incl. on the default errMsg / providing your own
 * @example 'getAsserter<string>()("dateStr", "digitStr")' returns '(v: string) => asserts v is DateStr | DigitStr'
*/
const getRelatedAsserter = () => {
    const provideRefiners = (...refiners) => {
        const defaultErrMsg = getErrMsg(...refiners);
        const validatorArr = refiners.map((idenOrFn) => INTERNAL_getValidator(idenOrFn));
        const refiner = (v) => validatorArr.some((validator) => validator(v));
        function asserter(v, errMsg) {
            if (!refiner(v))
                throw new Error(errMsg || defaultErrMsg);
        }
        return asserter;
    };
    return provideRefiners;
};
