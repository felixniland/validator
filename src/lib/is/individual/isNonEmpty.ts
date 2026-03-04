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
function isNonEmpty<T>(arr: ReadonlyArray<T>): arr is ReadonlyNonEmptyArr<Exclude<T, undefined>>;
function isNonEmpty<T>(arr: Array<T>): arr is MutNonEmptyArr<Exclude<T, undefined>>;
function isNonEmpty<T>(arr: ReadonlyArray<T> | Array<T>): arr is ReadonlyNonEmptyArr<Exclude<T, undefined>> | MutNonEmptyArr<Exclude<T, undefined>> {
    if (!arr.length) return false;
    return Boolean(arr
        .filter((v) => !isUndef(v))
        .length
    )
}