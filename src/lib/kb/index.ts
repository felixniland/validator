export * from "./is/index.js";
export * from "./assert/index.js";

/** checker that there are no missing is/asserts */
// type CutStrPrefix<S extends string, P extends string> = S extends `${P}${infer Rest}` ? Rest : never;
// type IsFunctions = keyof typeof import ("./is/index.js");
// type AsserterFunctions = keyof typeof import("./assert/index.js");
// type TypeGuards = CutStrPrefix<IsFunctions, "is">;
// type Asserters = CutStrPrefix<AsserterFunctions, "assert">;

// type AsserterWithNoIs = Exclude<Asserters, TypeGuards | "MapHasKey">;
// type IsWithNoAsserter = Exclude<TypeGuards, Asserters>;