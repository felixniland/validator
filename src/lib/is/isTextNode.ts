import { isNode } from "./isNode.js";

/** Checks if v is a Text Node */
export const isTextNode = (v: unknown): v is Text => isNode(v) && v.nodeType === Node.TEXT_NODE;