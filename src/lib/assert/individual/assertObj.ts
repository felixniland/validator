/**
 * Asserts that a value is a non-null object.
 * @param v - The value to check
 * @throws Error if the value is not a non-null object
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertObj = getStdAsserter("obj");
