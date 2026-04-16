/**
 * Asserts that a value is a SvelteSet.
 * @param v - The value to check
 * @throws Error if the value is not a SvelteSet
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertSvelteSet = getStdAsserter("svelteSet");
