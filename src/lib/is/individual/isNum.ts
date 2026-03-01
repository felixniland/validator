/**
 * Checks if a value is a number.
 * @param val - The value to check
 * @returns True if the value is a number
 */
export const isNum = (val: unknown): val is number => typeof val === "number";
