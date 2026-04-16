/**
 * Checks if a value is a DOM Element.
 * @param val - The value to check
 * @returns True if the value is a DOM Element
 */
export const isElement = (val: unknown): val is Element => val instanceof Element;