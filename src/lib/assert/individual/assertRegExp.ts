/**
 * Asserts that a value is a RegExp.
 * @param v - The value to check
 * @throws Error if the value is not a RegExp
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertRegExp = getStdAsserter("regExp");
