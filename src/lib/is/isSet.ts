/**
 * Checks if a value is a Set.
 * @param val - The value to check
 * @returns True if the value is a Set
 */
export const isSet = (val: unknown): val is Set<unknown> => val instanceof Set;