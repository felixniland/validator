import { isNull } from "./isNull.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

/** Checks if val is an Array of nulls */
export const isArrNull = (val: unknown): val is Array<null> => Array.isArray(val) && !isVacuousArray(val) && val.every(isNull);
