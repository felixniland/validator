/**
 * Asserts that a value is a content editable HTMLElement.
 * @param v - The value to check
 * @throws Error if the value is not a content editable HTMLElement
 */
import { getStdAsserter } from "./_assertUtils.js";
export const assertContentEditable = getStdAsserter("contentEditable");
