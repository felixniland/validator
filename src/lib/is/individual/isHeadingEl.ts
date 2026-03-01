import { isHtmlEl } from "./isHtmlEl.js";

/**
 * Checks if a value is a heading HTMLElement (h1-h6).
 * @param val - The value to check
 * @returns True if the value is a heading HTMLElement
 */
export const isHeadingEl = (val: unknown): val is HTMLHeadingElement => {
	if (!isHtmlEl(val)) return false;
	return (['H1', 'H2', 'H3', 'H4', 'H5', 'H6']).includes(val.tagName);
};