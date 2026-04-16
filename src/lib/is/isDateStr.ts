import type { DateStr } from "felixtypes";
import { isStr } from "./isStr.js";

/**
 * Checks if a value is a valid date string.
 * @param val - The value to check
 * @returns True if the value is a parseable date string
 */
export const isDateStr = (val: unknown): val is DateStr => isStr(val) && !Number.isNaN(Date.parse(val));