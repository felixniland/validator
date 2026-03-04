import { isNum } from "./isNum.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

export const isArrNum = (val: unknown): val is Array<number> => Array.isArray(val) && !isVacuousArray(val) && val.every(isNum);