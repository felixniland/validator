import { ValidatorConfig } from "../cfg/index.js";
import { isArr } from "./isArr.js";

/** Checks if val is an Array of Arrays */
export const isArrArr = (val: unknown): val is Array<Array<unknown>> => Array.isArray(val) && !ValidatorConfig.isVacuousArray(val) && val.every(isArr);
