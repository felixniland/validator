/**
 * Asserts that a value is an HTMLListElement (ul or ol).
 * @param v - The value to check
 * @throws Error if the value is not an HTMLListElement
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertListEl = getStdAsserter("listEl");
