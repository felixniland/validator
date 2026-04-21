/** Checks if val is an HTMLFormElement */
export const isFormEl = (val: unknown): val is HTMLFormElement => val instanceof HTMLFormElement;