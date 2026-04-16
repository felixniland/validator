import { isNonEmpty } from "$lib/is/index.js";
import type { ReadonlyNonEmptyArr, MutNonEmptyArr } from "felixtypes";

export {
    assertNonEmpty,
}

/**
 * asserts array is non empty
 * handles sparse arrays (i.e., arr[someIndex] === undefined)
 * "nulls" are considered valid; e.g., 'isNonEmpty([null]) === true'
*/
function assertNonEmpty<T>(arr: Array<T>, errMsg?: string): asserts arr is MutNonEmptyArr<T>;
function assertNonEmpty<T>(arr: ReadonlyArray<T>, errMsg?: string): asserts arr is ReadonlyNonEmptyArr<T>;
function assertNonEmpty<T>(
    arr: ReadonlyArray<T> | Array<T>,
    errMsg: string = "expected non-empty array"
): asserts arr is ReadonlyNonEmptyArr<T> | MutNonEmptyArr<T> {
    if (!isNonEmpty(arr)) throw new Error(errMsg);
}