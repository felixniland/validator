import { ValidatorConfig } from "../index.js";
import { isNum } from "./isNum.js";

/** Checks if val is an Array of numbers */
export const isArrNum = (val: unknown): val is Array<number> => Array.isArray(val) && !ValidatorConfig.isVacuousArray(val) && val.every(isNum);
