import type { MutNonEmptyArr, ReadonlyNonEmptyArr } from "felixtypes";
import { isUndef } from "./isUndef.js";

/** NTS: hmm, I I've thought to include Sets and Maps (whether in this, or in a separate function), but the need for it doesn't seem to come up in my code..., and it doesn't lend itself usefully, like how you can call "!nonEmptyArr.pop()" with confidence... */

export {
    isNonEmpty
};

/**
 * typeguard to confirm an array is not empty, specifically: that it has at least one index that is NOT undefined
 * @remarks handles sparse arrays
 * @example isNonEmpty([null]) // true
 * @example isNonEmpty([undefined]) // false
 * @example isNonEmpty([undefined, null]) // true
 * @example isNonEmpty(["str", undefined]) // true
*/

// NTS: added this last overload to avoid issues where "getRefiner(whatever)(someVal)" would error, since "T" may not extend "Array<T>"...BUT I have not yet tested, so let's se    e :)
function isNonEmpty<T>(arr: T): arr is (T extends Array<infer U> ? MutNonEmptyArr<U> extends T ? MutNonEmptyArr<U> : never : never);
function isNonEmpty<T>(arr: ReadonlyArray<T>): arr is ReadonlyNonEmptyArr<T>;
function isNonEmpty<T>(arr: Array<T>): arr is MutNonEmptyArr<T>;
function isNonEmpty<T>(arr: ReadonlyArray<T> | Array<T>): arr is ReadonlyNonEmptyArr<T> | MutNonEmptyArr<T> {
    return arr.some((e) => !isUndef(e));
}