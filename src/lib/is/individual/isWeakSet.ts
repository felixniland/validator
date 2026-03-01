/**
 * Checks if a value is a WeakSet.
 * @param val - The value to check
 * @returns True if the value is a WeakSet
 */
export const isWeakSet = (val: unknown): val is WeakSet<object> => val instanceof WeakSet;