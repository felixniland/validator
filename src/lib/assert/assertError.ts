/**
 * Asserts that a value is an Error object.
 * @param v - The value to check
 * @throws Error if the value is not an Error object
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertError = getStdAsserter("err");
