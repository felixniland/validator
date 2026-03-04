import { isNull } from "./isNull.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

export const isArrNull = (val: unknown): val is Array<null> => Array.isArray(val) && !isVacuousArray(val) && val.every(isNull);