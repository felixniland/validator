import { isUndef } from "./isUndef.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

export const isArrUndef = (val: unknown): val is Array<undefined> => Array.isArray(val) && !isVacuousArray(val) && val.every(isUndef);