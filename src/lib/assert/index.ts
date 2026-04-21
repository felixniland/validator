/**
 * TODO:
    * []: the three non-exported asserter functions WORK during runtime... but "sneakyAsserter" is the only way I found to get around TS's limitation on this (type must be explicit), which I don't love, so leaving these here for now..
    * []: Typescript for the defaultErrMsg on get(/Related)Asserter
        - type ValIdenString<TArr extends Array<any>> = ExtractValIden<TArr[number]>;
        - type TEST_ValIdenString = ValIdenString<["str", "digitStr", (v: unknown) => v is TestClass]>
 */

// export {
//     getAsserter,
//     getRelatedAsserter,
//     sneakyAsserter,
// }

export * from "./assertCondition/index.js";

export * from "./assertArr.js";
export * from "./assertArrArr.js";
export * from "./assertArrBool.js";
export * from "./assertArrFn.js";
export * from "./assertArrNull.js";
export * from "./assertArrNum.js";
export * from "./assertArrObj.js";
export * from "./assertArrStr.js";
export * from "./assertArrUndef.js";
export * from "./assertAsyncFn.js";
export * from "./assertBigInt.js";
export * from "./assertBool.js";
export * from "./assertBoolNum.js";
export * from "./assertBlockEl.js";
export * from "./assertCompNum.js";
export * from "./assertContentEditable.js";
export * from "./assertDate.js";
export * from "./assertDateStr.js";
export * from "./assertDigitStr.js";
export * from "./assertElement.js";
export * from "./assertError.js";
export * from "./assertFalse.js";
export * from "./assertFn.js";
export * from "./assertFormEl.js";
export * from "./assertHeadingEl.js";
export * from "./assertHtmlEl.js";
export * from "./assertInputEl.js";
export * from "./assertListEl.js";
export * from "./assertListItem.js";
export * from "./assertMap.js";
export * from "./assertNode.js";
export * from "./assertTextNode.js";
export * from "./assertEmptyTextNode.js";
export * from "./assertBR.js";
export * from "./assertNonNullable.js";
export * from "./assertNull.js";
export * from "./assertNum.js";
export * from "./assertObj.js";
export * from "./assertOL.js";
export * from "./assertPromise.js";
export * from "./assertRegExp.js";
export * from "./assertSet.js";
export * from "./assertSpan.js";
export * from "./assertStr.js";
export * from "./assertSymbol.js";
export * from "./assertSvelteMap.js";
export * from "./assertSvelteSet.js";
export * from "./assertTrue.js";
export * from "./assertUL.js";
export * from "./assertUndef.js";
export * from "./assertWeakMap.js";
export * from "./assertWeakSet.js";
export * from "./assertMapHasKey.js";
export * from "./assertNonEmpty.js";