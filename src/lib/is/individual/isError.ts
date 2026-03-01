/**
 * Checks if a value is an Error object.
 * @param val - The value to check
 * @returns True if the value is an Error object
 */
export const isError = (val: unknown): val is Error => val instanceof Error;