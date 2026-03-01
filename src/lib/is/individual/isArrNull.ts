import { isNull } from "./isNull.js";

/**
 * Checks if a value is an array of null values.
 * @param val - The value to check
 * @returns True if the value is an array of nulls
 */
export const isArrNull = (val: unknown): val is Array<null> => Array.isArray(val) && val.every(isNull);