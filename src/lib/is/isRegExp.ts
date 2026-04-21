/** Checks if val is a RegExp */
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp;