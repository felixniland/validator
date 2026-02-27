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
export * from "./individual/index.js";
export * from "./assertCondition/index.js";
