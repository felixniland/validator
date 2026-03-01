/**
 * Asserts that a value is an array of null values.
 * @param v - The value to check
 * @throws Error if the value is not an array of nulls
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertArrNull = getStdAsserter("arrNull");
