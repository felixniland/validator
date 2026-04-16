/**
 * Asserts that a value is an HTMLFormElement.
 * @param v - The value to check
 * @throws Error if the value is not an HTMLFormElement
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertFormEl = getStdAsserter("formEl");
