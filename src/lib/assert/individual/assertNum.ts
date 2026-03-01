/**
 * Asserts that a value is a number.
 * @param v - The value to check
 * @throws Error if the value is not a number
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertNum = getStdAsserter("num");
