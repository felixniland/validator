/**
 * Checks if a value is a Promise.
 * @param val - The value to check
 * @returns True if the value is a Promise
 */
export const isPromise = (val: unknown): val is Promise<unknown> => val instanceof Promise;