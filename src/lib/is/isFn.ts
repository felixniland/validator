/**
 * Checks if a value is a function.
 * @param val - The value to check
 * @returns True if the value is a function
 */
export const isFn = (val: unknown): val is Function => typeof val === "function";
