/**
 * Asserts that a value is a valid Date object.
 * @param v - The value to check
 * @throws Error if the value is not a valid Date object
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertDate = getStdAsserter("date");
