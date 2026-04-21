import { isObj } from "./isObj.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

/** Checks if val is an Array of objects */
export const isArrObj = (val: unknown): val is Array<object> => Array.isArray(val) && !isVacuousArray(val) && val.every(isObj);
