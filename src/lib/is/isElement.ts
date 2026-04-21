/** Checks if val is a DOM Element */
export const isElement = (val: unknown): val is Element => val instanceof Element;