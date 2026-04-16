/**
 * Checks if a value is an HTMLFormElement.
 * @param val - The value to check
 * @returns True if the value is an HTMLFormElement
 */
export const isFormEl = (val: unknown): val is HTMLFormElement => val instanceof HTMLFormElement;