/** Checks if val is strictly `true` */
export const isTrue = (val: unknown): val is true => typeof val === "boolean" && val === true;
