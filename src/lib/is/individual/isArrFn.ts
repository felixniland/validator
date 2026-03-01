import { isFn } from "./isFn.js";

/**
 * Checks if a value is an array of functions.
 * @param val - The value to check
 * @returns True if the value is an array of functions
 */
export const isArrFn = (val: unknown): val is Array<Function> => Array.isArray(val) && val.every(isFn);