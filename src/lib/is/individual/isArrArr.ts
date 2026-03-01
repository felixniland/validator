import { isArr } from "./isArr.js";

/**
 * Checks if a value is an array of arrays.
 * @param val - The value to check
 * @returns True if the value is an array of arrays
 */
export const isArrArr = (val: unknown): val is Array<Array<unknown>> => Array.isArray(val) && val.every(isArr);