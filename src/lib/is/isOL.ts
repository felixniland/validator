import { isElement } from "./isElement.js";

/**
 * Checks if a value is an HTMLOListElement (ol).
 * @param val - The value to check
 * @returns True if the value is an HTMLOListElement
 */
export const isOL = (val: unknown): val is HTMLUListElement => isElement(val) && val.tagName === "OL";