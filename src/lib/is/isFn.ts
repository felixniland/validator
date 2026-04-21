/** Checks if val is a function */
export const isFn = (val: unknown): val is Function => typeof val === "function";
