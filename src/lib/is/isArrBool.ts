import { isBool } from "./isBool.js";
import { isVacuousArray } from "$lib/internal/isVacuousArr/index.js";

/** Checks if val is an Array of booleans */
export const isArrBool = (val: unknown): val is Array<boolean> => Array.isArray(val) && !isVacuousArray(val) && val.every(isBool);
