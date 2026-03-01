import { isBool } from "./isBool.js";

/**
 * Checks if a value is an array of booleans.
 * @param val - The value to check
 * @returns True if the value is an array of booleans
 */
export const isArrBool = (val: unknown): val is Array<boolean> => Array.isArray(val) && val.every(isBool);