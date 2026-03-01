/**
 * Asserts that a value is an HTMLElement.
 * @param v - The value to check
 * @throws Error if the value is not an HTMLElement
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertHTMLElement = getStdAsserter("htmlEl");
