/** Checks if val is a Promise */
export const isPromise = (val: unknown): val is Promise<unknown> => val instanceof Promise;