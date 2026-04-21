/** Checks if val is a WeakMap */
export const isWeakMap = (val: unknown): val is WeakMap<object, unknown> => val instanceof WeakMap;