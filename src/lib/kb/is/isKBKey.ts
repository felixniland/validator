import type { KBKey } from "felixtypes";
import { isInputKey } from "./isInputKey.js";
import { isNonInputKey } from "./isNonInputKey.js";
import { isUnusedKey } from "./isUnusedKey.js";
import { isStr } from "../../is/isStr.js";

export const isKBKey = (v: unknown): v is KBKey => isStr(v) && (isInputKey(v) || isNonInputKey(v) || isUnusedKey(v));