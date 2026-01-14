import * as asserters from "../assert/individual/index.js";
import { INTERNAL_GET_VALIDATOR } from "$lib/refine/index.js";
import type { ValIden, GetValidatorReturn, ValidatorFn } from "felixtypes";


export {
    getAsserter
}

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
const getAsserter = <const T, const VType extends ReadonlyArray<ValIden | ValidatorFn<any, T>>>(
    ...refiners: VType
) => {
    const validatorArr = refiners.map((idenOrFn) => INTERNAL_GET_VALIDATOR(idenOrFn));
    const refiner = (v: unknown) => validatorArr.some((validator) => (validator as any)(v));
    type Asserted = GetValidatorReturn<VType[number]>;
   
    function asserter<const TErrMsg extends string>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted {
        if (!refiner(v)) throw new Error(errMsg || "asserter failure");
    }

    return asserter;
}