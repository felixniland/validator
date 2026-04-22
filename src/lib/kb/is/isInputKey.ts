import type { KBTextInput } from "felixtypes";
import { isAlpha } from "./isAlpha.js";
import { isStr } from "../../is/isStr.js"
import { isNumKey } from "./isNumKey.js";
import { isSpecialChar } from "./isSpecialChar.js";

export const isInputKey = (v: unknown): v is KBTextInput => isStr(v) && (isAlpha(v) || isNumKey(v) || isSpecialChar(v));