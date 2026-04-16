/**
 * Checks if a value is an HTMLElement.
 * @param val - The value to check
 * @returns True if the value is an HTMLElement
 */
export const isHtmlEl = (val: unknown): val is HTMLElement => val instanceof HTMLElement;