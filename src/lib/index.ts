/**
 * TODO:
    * []: TODO: not sure how to add "IsNonNullable" to my ValIden type map... right now it's "NonNullable<any>"
    * []: "isPosNum" (> 0...)
    * []: make "getAsserter" and "getRelatedAsserter", same as for refiners...
    * []: triple-check the JSDoc (AI wrote it for all the standard 'isStr', I only wrote the weird ones, like 'mapHasKey'...)
    * []: "isAsyncFn" returns "(...args?: any)", but I'd rather it return a spread; however, a spread cannot be optional. Not sure how to properly do this without it mandating that validat'ED asyncFns have args
*/

export * from "./allowsDirectComparison/index.js"
export * from "./assert/index.js"
export * from "./instanceOf/index.js";
export * from "./is/index.js"
export * from "./kb/index.js";
export * from "./str/index.js";
export * from "./refine/index.js";
export * from "./labels/index.js";

export * from "./types.js";
export * from "./cfg/index.js";

/** checker that there are no missing asserts */
// type CutStrPrefix<S extends string, P extends string> = S extends `${P}${infer Rest}` ? Rest : never;
// type IsFunctions = keyof typeof import ("./is/index.js");
// type AsserterFunctions = keyof typeof import("./assert/index.js");
// type TypeGuards = CutStrPrefix<IsFunctions, "is">; // i.e., this will exclude "getIsValidator"
// type Asserters = CutStrPrefix<AsserterFunctions, "assert">;

// /** exclude 'MapHasKey' explicitly since it does not match the 'is' prefix above */
// type AsserterWithNoIs = Exclude<Asserters, TypeGuards | "MapHasKey">;
// // "BR" // "textNode" // "emptyTextNode"
// type IsWithNoAsserter = Exclude<TypeGuards, Asserters>;
// type IsFunctionsMappedToValIden = typeof import ("./is/getIsValidator.js")["_INTERNAL_GET_IS_IDEN"][keyof typeof import ("./is/getIsValidator.js")["_INTERNAL_GET_IS_IDEN"]];
// /** note: this isn't *quite* accurate, since what it does is check the "getIsValidator" fn; however that fn will error if it is missing any ValIdens */
// type IsFunctionsWithoutValIden = Exclude<IsFunctions, IsFunctionsMappedToValIden | "mapHasKey" | "getIsValidator">;