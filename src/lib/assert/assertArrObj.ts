/**
 * Asserts that a value is an array of objects.
 * @param v - The value to check
 * @throws Error if the value is not an array of objects
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertArrObj = getStdAsserter("arrObj");
