/**
 * Asserts that a value is an async function.
 * @param v - The value to check
 * @throws Error if the value is not an async function
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertAsyncFn = getStdAsserter("asyncFn");
