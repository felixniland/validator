import { newPrimValidator } from "$lib/prim/index.js";
import type { VoidElement } from "felixtypes";
import { isElement } from "./isElement.js";

export {
    isVoidEl
};

/** i.e., self-closing; no children */
const VOID_ELEMENT_TAGS = [
    "IMG",
    "BR",
    "HR",
    "INPUT",
    "META",
    "LINK",
    "AREA",
    "BASE",
    "EMBED",
    "SOURCE",
    "TRACK",

    "COL",
    
    "PARAM",
    "WBR",
] as const;

const isVoidElTag = newPrimValidator(VOID_ELEMENT_TAGS);

/** checks if v is {@link VoidElement} */
function isVoidEl(v: unknown): v is VoidElement {
    return (isElement(v) && isVoidElTag(v.tagName));
}