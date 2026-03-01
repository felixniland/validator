/**
 * Asserts that a value is a DOM Node.
 * @param v - The value to check
 * @throws Error if the value is not a DOM Node
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertNode = getStdAsserter("node");
