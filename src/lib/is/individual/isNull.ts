/**
 * Checks if a value is `null`.
 * @param val - The value to check
 * @returns True if the value is `null`
 */
export const isNull = (val: unknown): val is null => val === null;
