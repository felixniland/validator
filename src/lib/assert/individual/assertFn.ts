/**
 * Asserts that a value is a function.
 * @param v - The value to check
 * @throws Error if the value is not a function
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertFn = getStdAsserter("fn");
