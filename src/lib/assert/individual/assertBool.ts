/**
 * Asserts that a value is a boolean.
 * @param v - The value to check
 * @throws Error if the value is not a boolean
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertBool = getStdAsserter("bool");
