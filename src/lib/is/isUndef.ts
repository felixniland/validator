/** Checks if val is `undefined` */
export const isUndef = (val: unknown): val is undefined => typeof val === "undefined";
