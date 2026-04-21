import { newStrValidator } from "$lib/index.js";
import { isHtmlEl } from "./isHtmlEl.js";

const isHeaderTag = newStrValidator(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

/** Checks if a value is an HTMLHTMLHeadingElement (H1..H6) */
export const isHeadingEl = (v: unknown): v is HTMLHeadingElement => {
	return isHtmlEl(v) && isHeaderTag(v.tagName);
};