/** Checks if val is strictly `false` */
export const isFalse = (val: unknown): val is false => typeof val === "boolean" && val === false;
