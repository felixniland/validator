/**
 * Asserts that a value is an array of undefined values.
 * @param v - The value to check
 * @throws Error if the value is not an array of undefined values
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertArrUndef = getStdAsserter("arrUndef");
