/**
 * Checks if a value is a string.
 * @param val - The value to check
 * @returns True if the value is a string
 */
export const isStr = (val: unknown): val is string => typeof val === "string";
