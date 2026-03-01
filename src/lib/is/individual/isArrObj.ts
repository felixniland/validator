import { isObj } from "./isObj.js";

/**
 * Checks if a value is an array of objects.
 * @param val - The value to check
 * @returns True if the value is an array of objects
 */
export const isArrObj = (val: unknown): val is Array<object> => Array.isArray(val) && val.every(isObj);