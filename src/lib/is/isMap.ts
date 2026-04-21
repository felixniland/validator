/** Checks if val is a Map */
export const isMap = (val: unknown): val is Map<unknown, unknown> => val instanceof Map;