import { isElement } from "./isElement.js";

/**
 * Checks if a value is an HTMLUListElement (ul).
 * @param val - The value to check
 * @returns True if the value is an HTMLUListElement
 */
export const isUL = (val: unknown): val is HTMLUListElement => isElement(val) && val.tagName === "UL";