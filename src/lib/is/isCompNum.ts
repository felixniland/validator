/** Checks if val is a finite number */
export const isCompNum = (val: unknown): val is number => (typeof val === "number") && Number.isFinite(val);