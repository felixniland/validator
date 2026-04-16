/**
 * Asserts that a value is `undefined`.
 * @param v - The value to check
 * @throws Error if the value is not `undefined`
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertUndef = getStdAsserter("undef");
