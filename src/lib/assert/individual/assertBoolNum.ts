/**
 * Asserts that a value is a boolean number (0 or 1).
 * @param v - The value to check
 * @throws Error if the value is not 0 or 1
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertBoolNum = getStdAsserter("boolNum");
