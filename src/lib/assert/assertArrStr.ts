/**
 * Asserts that a value is an array of strings.
 * @param v - The value to check
 * @throws Error if the value is not an array of strings
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertArrStr = getStdAsserter("arrStr");
