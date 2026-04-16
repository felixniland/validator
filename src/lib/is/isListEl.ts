import type { HTMLListElement } from "felixtypes";
import { isUL } from "./isUL.js";
import { isOL } from "./isOL.js";

/**
 * Checks if a value is an HTMLListElement (ul or ol).
 * @param val - The value to check
 * @returns True if the value is an HTMLListElement
 */
export const isListEl = (val: unknown): val is HTMLListElement => isUL(val) || isOL(val);