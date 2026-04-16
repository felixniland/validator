import { isFn } from "./isFn.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

export const isArrFn = (val: unknown): val is Array<Function> => Array.isArray(val) && !isVacuousArray(val) && val.every(isFn);