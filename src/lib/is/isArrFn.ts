import { ValidatorConfig } from "../cfg/index.js";
import { isFn } from "./isFn.js";

/** Checks if val is an Array of functions */
export const isArrFn = (val: unknown): val is Array<Function> => Array.isArray(val) && !ValidatorConfig.isVacuousArray(val) && val.every(isFn);
