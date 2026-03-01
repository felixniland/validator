import type { BoolNum } from "felixtypes";
import { isNum } from "./isNum.js";

/**
 * Checks if a value is a boolean number (0 or 1).
 * @param val - The value to check
 * @returns True if the value is 0 or 1
 */
export const isBoolNum = (val: unknown): val is BoolNum => isNum(val) && (val === 0 || val === 1);