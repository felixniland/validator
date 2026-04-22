import type { KBNonTextInput } from "felixtypes";
import { isStr } from "../../is/isStr.js";
import { isNavKey } from "./isNavKey.js";
import { isEditingKey } from "./isEditingKey.js";
import { isFnKey } from "./isFnKey.js";

export const isNonInputKey = (v: unknown): v is KBNonTextInput => isStr(v) && (isFnKey(v) || isEditingKey(v) || isNavKey(v));