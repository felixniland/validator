/**
 * Asserts that a value is an HTMLInputElement.
 * @param v - The value to check
 * @throws Error if the value is not an HTMLInputElement
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertInputEl = getStdAsserter("inputEl");
