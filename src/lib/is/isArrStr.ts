import { ValidatorConfig } from "../index.js";
import { isStr } from "./isStr.js";

/** Checks if val is an Array of strings */
export const isArrStr = (val: unknown): val is Array<string> => Array.isArray(val) && !ValidatorConfig.isVacuousArray(val) && val.every(isStr);
