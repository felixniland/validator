/**
 * Asserts that a value is an HTMLLIElement.
 * @param v - The value to check
 * @throws Error if the value is not an HTMLLIElement
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertListItem = getStdAsserter("listItem");
