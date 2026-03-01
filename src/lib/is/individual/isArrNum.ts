import { isNum } from "./isNum.js";

/**
 * Checks if a value is an array of numbers.
 * @param val - The value to check
 * @returns True if the value is an array of numbers
 */
export const isArrNum = (val: unknown): val is Array<number> => Array.isArray(val) && val.every(isNum);