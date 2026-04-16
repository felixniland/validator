/**
 * Asserts that a value is a bigint.
 * @param v - The value to check
 * @throws Error if the value is not a bigint
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertBigInt = getStdAsserter("bigint");