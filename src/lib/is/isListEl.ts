import type { HTMLListElement } from "felixtypes";
import { isUL } from "./isUL.js";
import { isOL } from "./isOL.js";

/** Checks if val is an HTMLListElement */
export const isListEl = (val: unknown): val is HTMLListElement => isUL(val) || isOL(val);