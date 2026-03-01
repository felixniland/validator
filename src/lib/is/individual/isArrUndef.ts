import { isUndef } from "./isUndef.js";

/**
 * Checks if a value is an array of undefined values.
 * @param val - The value to check
 * @returns True if the value is an array of undefined values
 */
export const isArrUndef = (val: unknown): val is Array<undefined> => Array.isArray(val) && val.every(isUndef);