import type { ReadonlyNonEmptyArr, MutNonEmptyArr } from "felixtypes";
import { isUndef } from "./isUndef.js";

/**
 * TODO:
    * []: have this work for Sets & Maps
        * []: for which I'd need to create 'compact' logic for them (easy for Sets; have to decide for Maps)
 */

export {
    isNonEmpty
}

/**
 * typeguard to confirm an array is not empty
 * handles sparse arrays (i.e., arr[someIndex] === undefined)
 * "nulls" are considered valid; e.g., 'isNonEmpty([null]) === true'
*/
// NTS: added this last overload to avoid issues where "getRefiner(whatever)(someVal)" would error, since "T" may not extend "Array<T>"...BUT I have not yet tested, so let's see :)
function isNonEmpty<T>(arr: T): arr is (T extends Array<infer U> ? MutNonEmptyArr<U> extends T ? MutNonEmptyArr<U> : never : never);
function isNonEmpty<T>(arr: Array<T>): arr is MutNonEmptyArr<T>;
function isNonEmpty<T>(arr: ReadonlyArray<T>): arr is ReadonlyNonEmptyArr<T>;
function isNonEmpty<T>(arr: ReadonlyArray<T> | Array<T>): boolean {
    if (!arr.length) return false;
    
    return Boolean(arr
        .filter((v) => !isUndef(v))
        .length
    )
}