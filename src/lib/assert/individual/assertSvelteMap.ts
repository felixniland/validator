/**
 * Asserts that a value is a SvelteMap.
 * @param v - The value to check
 * @throws Error if the value is not a SvelteMap
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertSvelteMap = getStdAsserter("svelteMap");
