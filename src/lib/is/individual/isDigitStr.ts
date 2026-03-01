import type { DigitStr } from "felixtypes";

import { isStr } from "./isStr.js";

/**
 * Checks if a value is a string containing only digits (0-9).
 * @param val - The value to check
 * @returns True if the value is a digit string
 */
export const isDigitStr = (val: unknown): val is DigitStr => {
	if (!isStr(val)) return false;
	for (const char of val) {
		if (false === (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char))) return false;
	}
	return true;
};