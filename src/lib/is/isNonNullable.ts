import { isNull } from "./isNull.js";
import { isUndef } from "./isUndef.js";

/** Checks if v is neither null, nor undefined */
export function isNonNullable<T>(v: T): v is NonNullable<T> {
	if (isNull(v) || isUndef(v)) return false;
	return true;
}