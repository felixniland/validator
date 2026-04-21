import { isNum } from "./isNum.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

/** Checks if val is an Array of numbers */
export const isArrNum = (val: unknown): val is Array<number> => Array.isArray(val) && !isVacuousArray(val) && val.every(isNum);
