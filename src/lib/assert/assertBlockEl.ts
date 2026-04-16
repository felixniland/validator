/**
 * Asserts that a value is a block-level HTMLElement.
 * @param v - The value to check
 * @throws Error if the value is not a block-level HTMLElement
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertBlockEl = getStdAsserter("blockEl");
