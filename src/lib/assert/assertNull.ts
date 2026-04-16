/**
 * Asserts that a value is `null`.
 * @param v - The value to check
 * @throws Error if the value is not `null`
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertNull = getStdAsserter("null");
