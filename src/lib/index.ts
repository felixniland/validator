import { type VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
import type { AllowsDirectComparison, ValIden } from "felixtypes";

/**
 * TODO:
    * []: use some plugin or other to programatically generate JSDoc for the functions (where useful)
    * []: "isAsyncFn" returns "(...args?: any)", but I'd rather it return a spread; however, a spread cannot be optional. Not sure how to properly do this without it mandating that validat'ED asyncFns have args
*/

export * from "./is/index.js"
export * from "./assert/index.js"
export * from "./instanceOf/index.js";
export * from "./str/index.js";
export * from "./kb/index.js";
export * from "./refine/index.js";
export { isValIden, VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
export { allowsDirectComparison };

export type {
    PrettyValIden,
    IsValIden,
    AssertsValIden,
    GetPrettyValIden,
}

type GetPrettyValIden<I extends ValIden> = typeof VAL_IDEN_TO_PRETTY_MAP[I];
/** a "pretty" validator iden for use in public error messages */
type PrettyValIden = typeof VAL_IDEN_TO_PRETTY_MAP[ValIden];
type IsValIden = `is${Capitalize<ValIden>}`;
type AssertsValIden = `asserts${Capitalize<ValIden>}`;

function allowsDirectComparison(v: unknown): v is AllowsDirectComparison {
    return (v === null)
	|| ["string", "number", "bigint", "boolean", "symbol", "undefined"].includes(typeof v);
}