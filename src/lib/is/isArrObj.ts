import { ValidatorConfig } from "../index.js";
import { isObj } from "./isObj.js";

/** Checks if val is an Array of objects */
export const isArrObj = (val: unknown): val is Array<object> => Array.isArray(val) && !ValidatorConfig.isVacuousArray(val) && val.every(isObj);
