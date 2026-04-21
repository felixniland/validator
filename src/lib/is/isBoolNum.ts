import type { BoolNum } from "felixtypes";
import { isNum } from "./isNum.js";

/** Checks if val is a boolean number (0 or 1) */
export const isBoolNum = (val: unknown): val is BoolNum => isNum(val) && (val === 0 || val === 1);