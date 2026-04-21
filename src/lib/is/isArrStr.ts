import { isStr } from "./isStr.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

/** Checks if val is an Array of strings */
export const isArrStr = (val: unknown): val is Array<string> => Array.isArray(val) && !isVacuousArray(val) && val.every(isStr);
