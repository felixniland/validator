import { isStr } from "./isStr.js";

/**
 * Checks if a value is an array of strings.
 * @param val - The value to check
 * @returns True if the value is an array of strings
 */
export const isArrStr = (val: unknown): val is Array<string> => Array.isArray(val) && val.every(isStr);