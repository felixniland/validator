/** Checks if val is an Error object */
export const isError = (val: unknown): val is Error => val instanceof Error;