import { ValidatorConfig } from "../index.js";
import { isBool } from "./isBool.js";

/** Checks if val is an Array of booleans */
export const isArrBool = (val: unknown): val is Array<boolean> => Array.isArray(val) && !ValidatorConfig.isVacuousArray(val) && val.every(isBool);
