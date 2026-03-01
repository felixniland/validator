/**
 * Asserts that a value is an array of functions.
 * @param v - The value to check
 * @throws Error if the value is not an array of functions
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertArrFn = getStdAsserter("arrFn");
