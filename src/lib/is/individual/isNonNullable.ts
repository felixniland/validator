import { isNull } from "./isNull.js";

/**
 * Checks if a value is not null or undefined.
 * @param v - The value to check
 * @returns True if the value is not null or undefined
 */
export function isNonNullable<T>(v: T): v is NonNullable<T> {
	if (isNull(v)) return false;
	if (v === undefined) return false;
	return true;
}
