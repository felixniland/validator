import { ValidatorConfig } from "../index.js";
import { isUndef } from "./isUndef.js";

/** Checks if val is an Array of undefined */
export const isArrUndef = (val: unknown): val is Array<undefined> => Array.isArray(val) && !ValidatorConfig.isVacuousArray(val) && val.every(isUndef);
