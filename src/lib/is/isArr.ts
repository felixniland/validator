/** Checks if val is an array */
export const isArr = (val: unknown): val is Array<unknown> => Array.isArray(val);