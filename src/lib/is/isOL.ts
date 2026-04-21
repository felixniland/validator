import { isElement } from "./isElement.js";

/** Checks if val is an HTMLOListElement */
export const isOL = (val: unknown): val is HTMLUListElement => isElement(val) && val.tagName === "OL";