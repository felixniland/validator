import { type VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
import type { AllowsDirectComparison, ValIden, ValIdenToTypeMap } from "felixtypes";
import { getAsserter } from "./assert/index.js";

/**
 * TODO:
    * []: make "getAsserter" and "getRelatedAsserter", same as for refiners...
    * []: use some plugin or other to programatically generate JSDoc for the functions (where useful)
    * []: "isAsyncFn" returns "(...args?: any)", but I'd rather it return a spread; however, a spread cannot be optional. Not sure how to properly do this without it mandating that validat'ED asyncFns have args
*/

export * from "./is/index.js"
export * from "./assert/index.js"
export * from "./instanceOf/index.js";
export * from "./str/index.js";
export * from "./kb/index.js";
export { getRefiner, getRelatedRefiner } from "./refine/index.js";
export { isValIden, VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
export { allowsDirectComparison };

export type {
    PrettyValIden,
    IsValIden,
    AssertsValIden,
    GetPrettyValIden,
    ReturnInputOrValType,
    ExtractValIden,
}

type GetPrettyValIden<I extends ValIden> = typeof VAL_IDEN_TO_PRETTY_MAP[I];
/** a "pretty" validator iden for use in public error messages */
type PrettyValIden = typeof VAL_IDEN_TO_PRETTY_MAP[ValIden];
type IsValIden = `is${Capitalize<ValIden>}`;
type AssertsValIden = `asserts${Capitalize<ValIden>}`;

/**
 * @param TInput
 * converts any ValIden/s within TInput to their actual type
 * @example ReturnInputOrValType<"str" | 100> // string | 100
 * @usage it's required in the Schema validators to ensure any string literals that are ValIdens are correctly handled
 * @usage even though one should implement runtime functionality to handle this, that wouldn't prevent Typescript from generating ReturnTypes that would show that ValIden string literal
 * @example { str: ["one", "two", "digitStr"] } // without this type = INCORRECT!
 * @example { str: ["one", "two", "digitStr"] } // "one" | "two" | DigitStr // CORRECT
*/
type ReturnInputOrValType<TInput> = ExtractValIden<TInput> extends never ? TInput : ValIdenToTypeMap[ExtractValIden<TInput>] | Exclude<TInput, ExtractValIden<TInput>>;

type ExtractValIden<TInput> = Extract<TInput, ValIden>;

function allowsDirectComparison(v: unknown): v is AllowsDirectComparison {
    return (v === null)
	|| ["string", "number", "bigint", "boolean", "symbol", "undefined"].includes(typeof v);
}