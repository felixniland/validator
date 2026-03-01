import { isHtmlEl } from "./isHtmlEl.js";

/**
 * Checks if a value is a block-level HTMLElement.
 * @param val - The value to check
 * @returns True if the value is a block-level HTMLElement
 */
export const isBlockEl = (val: unknown): val is HTMLElement => {
	if (!isHtmlEl(val)) return false;
	return (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DIV', 'BLOCKQUOTE', 'LI']).includes(val.tagName);
};