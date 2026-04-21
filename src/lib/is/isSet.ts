/** Checks if val is a Set */
export const isSet = (val: unknown): val is Set<unknown> => val instanceof Set;