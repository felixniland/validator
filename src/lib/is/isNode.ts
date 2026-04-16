export {
    isNode,
    isTextNode,
    isEmptyTextNode,
    isBR
}

/**
 * Checks if a value is a DOM Node.
 * @param val - The value to check
 * @returns True if the value is a DOM Node
 */
const isNode = (val: unknown): val is Node => val instanceof Node;

/** Checks if a value is a Text Node */
const isTextNode = (v: unknown): v is Text => isNode(v) && v.nodeType === Node.TEXT_NODE;

/** Checks if a value is a Text Node with length of 0 */
const isEmptyTextNode = (v: unknown): v is Text => isTextNode(v) && !Boolean(v.length);

/** Checks if a value is an HTMLBrElement */
const isBR = (v: unknown): v is HTMLBRElement => v instanceof HTMLBRElement;