/** Checks if val is a DOM Node */
export const isNode = (val: unknown): val is Node => val instanceof Node;
