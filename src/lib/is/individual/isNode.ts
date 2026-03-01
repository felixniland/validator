/**
 * Checks if a value is a DOM Node.
 * @param val - The value to check
 * @returns True if the value is a DOM Node
 */
export const isNode = (val: unknown): val is Node => val instanceof Node;