import { isArr } from "./isArr.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

/** Checks if val is an Array of Arrays */
export const isArrArr = (val: unknown): val is Array<Array<unknown>> => Array.isArray(val) && !isVacuousArray(val) && val.every(isArr);
