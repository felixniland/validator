/** Checks if val is a non-null object */
export const isObj = (val: unknown): val is object => typeof val === "object" && val !== null;
