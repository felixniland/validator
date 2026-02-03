import * as asserters from "../assert/individual/index.js";
import { getRefiner,
INTERNAL_GET_VALIDATOR } from "$lib/refine/index.js";
import { type ValIden, type GetValidatorReturn, type ValidatorFn, type NullOr, type GetRelatedValidatorReturn, type RelatedValidators } from "felixtypes";
import { isValIden,VAL_IDEN_TO_PRETTY_MAP } from "$lib/labels/index.js";

/**
 * TODO:
    * []: the three non-exported asserter functions WORK during runtime... but "sneakyAsserter" is the only way I found to get around TS's limitation on this (type must be explicit), which I don't love, so leaving these here for now..
    * []: Typescript for the defaultErrMsg on get(/Related)Asserter
        - type ValIdenString<TArr extends Array<any>> = ExtractValIden<TArr[number]>;
        - type TEST_ValIdenString = ValIdenString<["str", "digitStr", (v: unknown) => v is TestClass]>
 */

const DEFAULT_ERR_MSG = "asserter received incorrect type" as const;

// export {
//     getAsserter,
//     getRelatedAsserter,
//     sneakyAsserter,
// }

export * from "./individual/index.js";

export const ASSERT = {
    str: asserters.assertStr,
    num: asserters.assertNum,
    digitStr: asserters.assertDigitStr,
    compNum: asserters.assertCompNum,
    bool: asserters.assertBool,
    "true": asserters.assertTrue,
    "false": asserters.assertFalse,
    obj: asserters.assertObj,
    arr: asserters.assertArr,
    fn: asserters.assertFn,
    asyncFn: asserters.assertAsyncFn,
    "null": asserters.assertNull,
    undef: asserters.assertUndef,
    boolNum: asserters.assertBoolNum,
    dateStr: asserters.assertDateStr,
    arrStr: asserters.assertArrStr,
    arrNum: asserters.assertArrNum,
    arrBool: asserters.assertArrBool,
    arrObj: asserters.assertArrObj,
    arrArr: asserters.assertArrArr,
    arrFn: asserters.assertArrFn,
    arrNull: asserters.assertArrNull,
    arrUndef: asserters.assertArrUndef,
    date: asserters.assertDate,
    el: asserters.assertElement,
    htmlEl: asserters.assertHTMLElement,
    formEl: asserters.assertFormEl,
    inputEl: asserters.assertInputEl,
    contentEditable: asserters.assertContentEditable,
    node: asserters.assertNode,
    err: asserters.assertError,
    regExp: asserters.assertRegExp,
    map: asserters.assertMap,
    set: asserters.assertSet,
    weakMap: asserters.assertWeakMap,
    weakSet: asserters.assertWeakSet,
    promise: asserters.assertPromise,
    svelteSet: asserters.assertSvelteSet,
    svelteMap: asserters.assertSvelteMap,
}

// export {
//     assertArr,
//     assertArrArr,
//     assertArrBool,
//     assertArrFn,
//     assertArrNull,
//     assertArrNum,
//     assertArrObj,
//     assertArrStr,
//     assertArrUndef,
//     assertAsyncFn,
//     assertBool,
//     assertBoolNum,
//     assertCompNum,
//     assertContentEditable,
//     assertDate,
//     assertDateStr,
//     assertDigitStr,
//     assertElement,
//     assertError,
//     assertFalse,
//     assertFn,
//     assertFormEl,
//     assertHTMLElement,
//     assertInputEl,
//     assertMap,
//     assertNode,
//     assertNull,
//     assertNum,
//     assertObj,
//     assertPromise,
//     assertRegExp,
//     assertSet,
//     assertStr,
//     assertSvelteMap,
//     assertSvelteSet,
//     assertTrue,
//     assertUndef,
//     assertWeakMap,
//     assertWeakSet,
// } from "./individual/index.js";

/**
 * @usage DO NOT USE! TESTING ONLY!
 * @todo add the errMsg validators etc, same as the internal asserter generator
 */

function getExpectedMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any>>>(...arr: VType): NullOr<string> {
    const expectedTypes = arr
        .map((entry) => isValIden(entry) ? VAL_IDEN_TO_PRETTY_MAP[entry] : null)
        .filter(Boolean)
        .join(", or ");

    if (!expectedTypes.length) return null;
    return `expected ${expectedTypes}`;
}

/**
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: unknown"
 * @returns an asserter of the amalgamated refiners
 * see also {@link getRelatedAsserter}, which takes a type for "V", and only accepts ValIdens/Typeguards that narrow that type
 * @example 'getAsserter("str")' returns '(v: unknown) => asserts v is string'
 * @example 'getAsserter((o): o is Date => o instance of Date))' returns '(o: unknown) => asserts o is Date'
 * @example 'getAsserter("str", (o): o is Date => o instance of Date))' returns '(o: unknown) => asserts is string | Date'
 * note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean" (and you will get an intellisense error from me)
 * @returns the asserter takes two arguments
 * @param v the value to be 'asserted'
 * @param errMsg {string} (OPTIONAL)
 * @param errMsg each refiner that is provided as a ValIden will be worked into the default errMsg
 * @example getAsserter("str", "num") // 'expected string, or number'
 * @example getAsserter("arr", "arrBool", "obj") // 'expected Array<unknown>, or Array<boolean>, or object'
 * @param errMsg if no errMsg is provided, and the refiners contains no ValIdens, defaults to {@link DEFAULT_ERR_MSG}
*/
const getAsserter = <const T, const VType extends ReadonlyArray<ValIden | ValidatorFn<any, T>>>(
    ...refiners: VType
) => {
    type Asserted = GetValidatorReturn<VType[number]>;
    const defaultErrMsg = getExpectedMsg(...refiners as any) || DEFAULT_ERR_MSG;

    const validatorArr = refiners.map((idenOrFn) => INTERNAL_GET_VALIDATOR(idenOrFn));
    const refiner = (v: unknown) => validatorArr.some((validator) => (validator as any)(v));
   
    // function asserter<const TErrMsg extends string>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted {
    function asserter(v: unknown): asserts v is Asserted {
        // if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
        if (!refiner(v)) throw new Error(defaultErrMsg);
    }
    
    return asserter;
}




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
        
        const validatorArr = refiners.map((idenOrFn) => INTERNAL_GET_VALIDATOR(idenOrFn));
        const refiner = (v: T) => validatorArr.some((validator) => (validator as any)(v));
    
        function asserter<const TErrMsg extends string>(v: T, errMsg?: TErrMsg): asserts v is Asserted {
            if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
        }

        return asserter;

    }

    return provideRefiners;
}

function sneakyAsserter<const T, const VType extends ReadonlyArray<ValIden | ValidatorFn<any, T>>>(
    ...refiners: VType
): (v: unknown) => GetValidatorReturn<VType[number]> {
    const refiner = getRefiner(...refiners as any)
    
    const asserter = (v: unknown) => {
        if (!refiner(v)) throw new Error("i am not the thing");
    }

    const ret = (v: unknown) => {
        asserter(v);
        return v;
    }

    return ret as any;
}