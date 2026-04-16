/**
 * Asserts that a value is a heading HTMLElement (h1-h6).
 * @param v - The value to check
 * @throws Error if the value is not a heading HTMLElement
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertHeadingEl = getStdAsserter("headingEl");
