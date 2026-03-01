/**
 * Checks if a value is strictly `true`.
 * @param val - The value to check
 * @returns True if the value is exactly `true`
 */
export const isTrue = (val: unknown): val is true => typeof val === "boolean" && val === true;
