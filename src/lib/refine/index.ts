import * as IsIndividual from "../is/individual/index.js";
import { getIsValidator } from "$lib/is/index.js";
import { isValIden } from "$lib/labels/index.js";
import type { GetRelatedValidatorReturn, GetValidatorReturn, RelatedValidators, ValidatorFn, ValIden, IsNot,ReturnInputOrValType, OneOrMore } from "felixtypes";

export {
    getRefiner,
    getRelatedRefiner,
    INTERNAL_GET_VALIDATOR,
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




















/**
 * TODO:
    * []: hmm, this works best with "eq"...which is in utils, and imports this... d'oh! What's the best practice there lol?
    * []: I want "TVal" to extend "IsNotFunction" more elegantly than what I'm doing now (changing the ReturnType of "provideRefiners" internally)
    * []: the "provideRefiners" fn signature is no good; I was not able to get it to both provide intellisense for str refiners *AND* generate "never" when it gets an invalid refiner... :(
    * []: the "provideRefiners" fn signature should also be upgraded to take ValidatorFns (I removed it whilst I was playing w/the above)
 */

/**
 * @template TVal anything except "Function"
*/
function OR_EQ_getRelatedRefiner<const TVal>() {
    // if (typeof val === "function") throw new Error("cannot call this with FUNCTIONS");

    // NTS: this funny signature is so it gives intellisense for the str types; it works perfectly, except even tho the validator returns "never" when given an inappropriate validator, the fn signature doesn't generate an error 
    function provideRefiners<const VType extends ReadonlyArray<VTypeArgs<TVal>>>(...refiners: ValidVType<TVal, VType | Array<RelatedValidators<TVal>>>) {
        const refinerArr = (Array.isArray(refiners) ? refiners : [refiners]) as Array<VType>; // NTS: arrayify
        
        const validatorArr: Array<RelatedValidators<TVal>> = [];
        const directComparators: Array<TVal> = [];
        
        refinerArr.forEach((criteria) => {
            if (isValIden(criteria)) {
                validatorArr.push(INTERNAL_GET_VALIDATOR(criteria) as any);
            } else if (typeof criteria === "function") {
                validatorArr.push(criteria as any);
            } else {
                directComparators.push(criteria as any);
            }
        });

        if (directComparators.length) {
            const validator = (val: TVal): boolean => directComparators.some((match) => EQ(match, val));
            validatorArr.push(validator as any);
        }

        type Validated = ReturnInputOrValType<ToArray<VType>[number]> extends TVal ? ReturnInputOrValType<ToArray<VType>[number]> : never;
        const validator = (v: TVal): v is Validated => validatorArr.some((validator) => (validator as any)(v));
        return validator;
        // return {} as VType;
    }

    type Ret = typeof provideRefiners;
    return (provideRefiners as TVal extends Function ? never : Ret);
}


/** TYPE TOWN, population: YOU */
            declare function EQ(a: any, b: any): boolean;

            // /** HELPER TYPES COPIED FROM THE OBJ VERSION */
                type StrValidators = RelatedValidators<string>;
                type ToArray<T> = T extends ReadonlyArray<infer R> ? ReadonlyArray<R> : T extends Array<infer M> ? Array<M> : Array<T>;
                type NonRelatedValidators<T> = Exclude<ValIden, RelatedValidators<T>>;
                type ExclFromStrKeys = NonRelatedValidators<string>;
            //     // type ExcludedStr<TVal> = TVal extends string ? ExclFromStrKeys : never;
            type VTypeArgs<TVal> = TVal extends string ? (string & {}) | StrValidators : TVal | RelatedValidators<TVal>;
            type ValidVType<TVal, TArgs> = TVal extends string ? ToArray<TArgs>[number] extends ExclFromStrKeys ? never : TArgs : TArgs;









/** TESTING ONE */
    let someStr = "some str";

    const isCoolDigitDateStr = OR_EQ_getRelatedRefiner<string>()("digitStr", "dateStr", "cool");

    if (isCoolDigitDateStr(someStr)) {
        someStr;
    } else {
        someStr;
    }

/** TESTING TWO */
    let someNum = 1;
    const isNumOrCompNum = OR_EQ_getRelatedRefiner<number>()("num", "compNum");
    if (isNumOrCompNum(someNum)) {
        someNum;
    } else {
        someNum;
    }

/** TESTING THREE */
    // const badWithFunction = OR_EQ_getRelatedRefiner<Function>()("cool");
    // This expression is not callable.
    // Type 'never' has no call signatures.