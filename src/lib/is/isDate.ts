/** Checks if val is a valid Date object */
export const isDate = (val: unknown): val is Date => val instanceof Date && !Number.isNaN(val.getTime());