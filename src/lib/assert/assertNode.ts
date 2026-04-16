import { getStdAsserter } from "./_assertUtils.js";

export {
    assertNode,
    assertBR,
    assertTextNode,
    assertEmptyTextNode,
}

/**
 * Asserts that a value is a DOM Node.
 * @param v - The value to check
 * @throws Error if the value is not a DOM Node
 */
const assertNode = getStdAsserter("node");

/** Asserts v is an HTMLBrElement */
const assertBR = getStdAsserter("BR");

/** Asserts v is a Text Node */
const assertTextNode = getStdAsserter("textNode");

/** Asserts v is a Text Node with length of 0 */
const assertEmptyTextNode = getStdAsserter("emptyTextNode");