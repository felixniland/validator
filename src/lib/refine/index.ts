import * as IsIndividual from "../is/individual/index.js";
import { getIsValidator } from "$lib/is/index.js";
import { isValIden } from "$lib/labels/index.js";
import type { GetRelatedValidatorReturn, GetValidatorReturn, RelatedValidators, ValidatorFn, ValIden } from "felixtypes";

export {
    getRefiner,
    getRelatedRefiner,
}

function INTERNAL_GET_VALIDATOR(validator: ValIden | ValidatorFn<any, any>): ValidatorFn<any, any> {
    if (isValIden(validator)) return getIsValidator(validator);
    if (IsIndividual.isFn(validator)) { // just assertFn here
        // testing... TODO: need to put under devFlag, once I import that utility into here
            // if (validator.length !== 1) throw new Error("expected validator to have args.length of 1");
            // const res = validator({});
            // if (typeof res !== "boolean") throw new Error("validator functions must return boolean");
        return validator as ValidatorFn<any>;
    }
    throw new Error("expected valIden or function");
} 



/**
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: unknown"
 * @returns a Typeguard function that amalgamates "refiners"
 * see also {@link getRelatedRefiner}, which takes a type for "V", and only accepts ValIdens/Typeguards that narrow that type
 * @example 'getRefiner("str")' returns '(v: unknown) => v is string'
 * @example 'getRefiner((o): o is Date => o instance of Date))' returns '(o: unknown) => o is Date'
 * @example 'getRefiner("str", (o): o is Date => o instance of Date))' returns '(o: unknown) => o is string | Date'
 * note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean" (and you will get an intellisense error from me)
*/
const getRefiner = <const T, const VType extends ReadonlyArray<ValIden | ValidatorFn<any, T>>>(
    ...refiners: VType
) => {
    const validatorArr = refiners.map((idenOrFn) => INTERNAL_GET_VALIDATOR(idenOrFn));
    // const validatorArr = fnsOrTypes.map((idenOrFn) => getRefiner(idenOrFn as any)); // weirdly, this changed the order of the ReturnType (but nothing else...)
    const validator = (v: unknown) => validatorArr.some((validator) => (validator as any)(v));
    // return validator as (v: unknown) => v is (VType[number] extends ValIden ? InferValidatedType<VType[number]> : GetValidatorReturn<VType[number]>);
    return validator as (v: unknown) => v is GetValidatorReturn<VType[number]>;
}



/**
 * @template T
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: T"
 * @returns a Typeguard function that amalgamates "refiners"
 * see also {@link getRefiner}, which does not take a type for V (returns "v: unknown: v is...")
 * @example 'getRefiner<string>()("dateStr", "digitStr")' returns '(v: string) => v is DateStr | DigitStr'
*/
const getRelatedRefiner = <const T>() => {
    const provideRefiners = <const RType extends T, const VType extends ReadonlyArray<RelatedValidators<T> | ValidatorFn<RType, T>>>(
        ...refiners: VType
    ) => {
        const validatorArr = refiners.map((idenOrFn) => INTERNAL_GET_VALIDATOR(idenOrFn));
        const validator = (v: T): v is GetRelatedValidatorReturn<T, RType, VType> => validatorArr.some((validator) => (validator as any)(v));
        return validator;
    }

    return provideRefiners;
}



// /**
//  * @returns a validatorFn if given one
//  * @returns the related validatorFn if given a StdValidator
//  * {@link getRelatedRefiner} to create a validatorFn from a list of StdValidator keys that extend T
//  * @param type a {@ilnk StdValidator}, or a validator function
//  * @example 'getRefiner("str")' returns '(v: unknown) => v is string'
//  * @example 'getRefiner((o): o is Date => o instance of Date))' returns '(o: unknown) => o is Date'
//  * @example 'getRefiner((o: object): o is Date => o instance of Date))' returns '(o: object) => o is Date'
//  * note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean", and you will get an intellisense error
//  */
// function NOT_EXPORTED_GET_SINGLE_REFINER<K extends ValIden>(type: K): (v: unknown) => v is InferValidatedType<K>;
// function NOT_EXPORTED_GET_SINGLE_REFINER<T, R extends T>(validatorFn: ValidatorFn<R, T>): (v: T) => v is R;
// function NOT_EXPORTED_GET_SINGLE_REFINER<T, R extends T>(fnOrType: any): any {
// 	return (isValIden(fnOrType)
// 		? getIsValidator(fnOrType)
// 		: fnOrType) as ValidatorFn<R>;
// }