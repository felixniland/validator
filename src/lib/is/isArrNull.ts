import { ValidatorConfig } from "../index.js";
import { isNull } from "./isNull.js";

/** Checks if val is an Array of nulls */
export const isArrNull = (val: unknown): val is Array<null> => Array.isArray(val) && !ValidatorConfig.isVacuousArray(val) && val.every(isNull);
