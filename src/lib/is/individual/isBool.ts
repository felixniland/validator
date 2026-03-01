/**
 * Checks if a value is a boolean.
 * @param val - The value to check
 * @returns True if the value is a boolean
 */
export const isBool = (val: unknown): val is boolean => typeof val === "boolean";
