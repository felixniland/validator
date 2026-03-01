/**
 * Checks if a value is a valid Date object.
 * @param val - The value to check
 * @returns True if valid Date object the value is a
 */
export const isDate = (val: unknown): val is Date => val instanceof Date && !Number.isNaN(val.getTime());