/**
 * Asserts that a value is a valid date string.
 * @param v - The value to check
 * @throws Error if the value is not a parseable date string
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertDateStr = getStdAsserter("dateStr");
