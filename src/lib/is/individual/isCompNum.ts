/**
 * Checks if a value is a comparable (i.e., finite) number.
 * @param val - The value to check
 * @returns True if the value is a finite number
 */
export const isCompNum = (val: unknown): val is number => (typeof val === "number") && Number.isFinite(val);
