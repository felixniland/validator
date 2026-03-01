/**
 * Checks if a value is `undefined`.
 * @param val - The value to check
 * @returns True if the value is `undefined`
 */
export const isUndef = (val: unknown): val is undefined => typeof val === "undefined";
