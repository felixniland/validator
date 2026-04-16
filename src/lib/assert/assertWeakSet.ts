/**
 * Asserts that a value is a WeakSet.
 * @param v - The value to check
 * @throws Error if the value is not a WeakSet
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertWeakSet = getStdAsserter("weakSet");
