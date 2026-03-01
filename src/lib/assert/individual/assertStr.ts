/**
 * Asserts that a value is a string.
 * @param v - The value to check
 * @throws Error if the value is not a string
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertStr = getStdAsserter("str");
