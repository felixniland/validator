import type { DateStr } from "felixtypes";
import { isStr } from "./isStr.js";

/** Checks if val is a valid date string */
export const isDateStr = (val: unknown): val is DateStr => isStr(val) && !Number.isNaN(Date.parse(val));