/** Checks if val is a WeakSet */
export const isWeakSet = (val: unknown): val is WeakSet<object> => val instanceof WeakSet;