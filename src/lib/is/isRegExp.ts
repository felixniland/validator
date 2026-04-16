/**
 * Checks if a value is a RegExp.
 * @param val - The value to check
 * @returns True if the value is a RegExp
 */
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp;