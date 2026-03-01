/**
 * Asserts that a value is a WeakMap.
 * @param v - The value to check
 * @throws Error if the value is not a WeakMap
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertWeakMap = getStdAsserter("weakMap");
