/**
 * Asserts that a value is an array.
 * @param v - The value to check
 * @throws Error if the value is not an array
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertArr = getStdAsserter("arr");
