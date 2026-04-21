import { isTextNode } from "./isTextNode.js";

/** Checks if v is an empty Text Node */
export const isEmptyTextNode = (v: unknown): v is Text => isTextNode(v) && !Boolean(v.length);
