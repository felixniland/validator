/**
 * Checks if a value is a Map.
 * @param val - The value to check
 * @returns True if the value is a Map
 */
export const isMap = (val: unknown): val is Map<unknown, unknown> => val instanceof Map;