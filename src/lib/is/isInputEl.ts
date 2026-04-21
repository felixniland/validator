/** Checks if val is an HTMLInputElement */
export const isInputEl = (val: unknown): val is HTMLInputElement => val instanceof HTMLInputElement;