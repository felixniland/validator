/**
 * Checks if a value is strictly `false`.
 * @param val - The value to check
 * @returns True if the value is exactly `false`
 */
export const isFalse = (val: unknown): val is false => typeof val === "boolean" && val === false;
