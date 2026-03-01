/**
 * Asserts that a value is a string containing only digits (0-9).
 * @param v - The value to check
 * @throws Error if the value is not a digit string
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertDigitStr = getStdAsserter("digitStr");
