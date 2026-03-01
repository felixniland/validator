/**
 * Checks if a value is an HTMLInputElement.
 * @param val - The value to check
 * @returns True if the value is an HTMLInputElement
 */
export const isInputEl = (val: unknown): val is HTMLInputElement => val instanceof HTMLInputElement;