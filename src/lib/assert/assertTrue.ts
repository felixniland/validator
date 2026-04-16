/**
 * Asserts that a value is strictly `true`.
 * @param v - The value to check
 * @throws Error if the value is not exactly `true`
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertTrue = getStdAsserter("true");
