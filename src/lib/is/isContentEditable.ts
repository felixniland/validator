import type { ContentEditableElement } from "../types.js";

/** Checks if val is a content editable HTMLElement */
export const isContentEditable = (val: unknown): val is ContentEditableElement => val instanceof HTMLElement && val.isContentEditable;