/**
 * Checks if a value is a non-null object.
 * @param val - The value to check
 * @returns True if the value is a non-null object
 */
export const isObj = (val: unknown): val is object => typeof val === "object" && val !== null;
