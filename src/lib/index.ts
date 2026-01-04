import { type PRETTY_STR_MAP } from "./labels/index.js";

/**
 * TODO:
    * []: use some plugin or other to programatically generate JSDoc for the functions (where useful)
*/

export * from "./is/index.js"
export * from "./assert/index.js"
export * from "./instanceOf/index.js";
export * from "./str/index.js";
export * from "./kb/index.js";
export * from "./types/index.js";
export * from "./refine/index.js";
export { isValIden, PRETTY_STR_MAP } from "./labels/index.js";

export type {
    ValIden,
    PrettyValIden,
    IsValIden,
    AssertsValIden,
    GetPrettyValIden,
}

type GetPrettyValIden<I extends ValIden> = typeof PRETTY_STR_MAP[I];

type ValIden = keyof typeof PRETTY_STR_MAP;

/** a "pretty" validator iden for use in public error messages */
type PrettyValIden = typeof PRETTY_STR_MAP[ValIden];

type IsValIden = `is${Capitalize<ValIden>}`;
type AssertsValIden = `asserts${Capitalize<ValIden>}`;