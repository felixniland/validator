/**
 * Asserts that a value is a symbol.
 * @param v - The value to check
 * @throws Error if the value is not a symbol
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertSymbol = getStdAsserter("symbol");
