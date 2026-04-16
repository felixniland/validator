/**
 * Asserts that a value is a Set.
 * @param v - The value to check
 * @throws Error if the value is not a Set
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertSet = getStdAsserter("set");
