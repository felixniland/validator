/**
 * Checks if a value is a WeakMap.
 * @param val - The value to check
 * @returns True if the value is a WeakMap
 */
export const isWeakMap = (val: unknown): val is WeakMap<object, unknown> => val instanceof WeakMap;