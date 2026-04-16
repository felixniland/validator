import { isElement } from "./isElement.js";

/**
 * Checks if a value is an HTMLLIElement.
 * @param val - The value to check
 * @returns True if the value is an HTMLLIElement
 */
export const isListItem = (val: unknown): val is HTMLLIElement => isElement(val) && val.tagName === "LI";