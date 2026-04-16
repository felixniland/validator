import type { ContentEditableElement } from "felixtypes";

/**
 * Checks if a value is a content editable HTMLElement.
 * @param val - The value to check
 * @returns True if the value is a content editable HTMLElement
 */
export const isContentEditable = (val: unknown): val is ContentEditableElement => val instanceof HTMLElement && val.isContentEditable;