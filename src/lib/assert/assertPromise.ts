/**
 * Asserts that a value is a Promise.
 * @param v - The value to check
 * @throws Error if the value is not a Promise
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertPromise = getStdAsserter("promise");
