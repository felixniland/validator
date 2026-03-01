/**
 * Checks if a value is an array.
 * @param val - The value to check
 * @returns True if the value is an array
 */
export const isArr = (val: unknown): val is Array<unknown> => Array.isArray(val);
