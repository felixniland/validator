/**
 * Asserts that a value is a DOM Element.
 * @param v - The value to check
 * @throws Error if the value is not a DOM Element
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertElement = getStdAsserter("el");
