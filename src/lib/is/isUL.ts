import { isElement } from "./isElement.js";

/** Checks if val is an HTMLUListElement */
export const isUL = (val: unknown): val is HTMLUListElement => isElement(val) && val.tagName === "UL";