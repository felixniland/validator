import { isArr } from "./isArr.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

export const isArrArr = (val: unknown): val is Array<Array<unknown>> => Array.isArray(val) && !isVacuousArray(val) && val.every(isArr);