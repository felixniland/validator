/**
 * Asserts that a value is strictly `false`.
 * @param v - The value to check
 * @throws Error if the value is not exactly `false`
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertFalse = getStdAsserter("false");
