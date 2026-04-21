import { isElement } from "./isElement.js";

/** Checks if val is an HTMLLIElement */
export const isListItem = (val: unknown): val is HTMLLIElement => isElement(val) && val.tagName === "LI";