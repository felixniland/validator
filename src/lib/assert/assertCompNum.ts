/**
 * Asserts that a value is a comparable (i.e., finite) number.
 * @param v - The value to check
 * @throws Error if the value is not a finite number
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertCompNum = getStdAsserter("compNum");
