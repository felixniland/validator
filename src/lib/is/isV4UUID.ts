// Yes, each portion in a UUID has a fixed length. crypto.randomUUID() generates UUID v4 strings in this format:
// 
// The segment lengths are:
// - 8 characters
// - 4 characters  
// - 4 characters (starts with '4' for v4)
// - 4 characters (first char is 8, 9, a, or b)
// - 12 characters
// Total: 36 characters (32 hex + 4 hyphens)
// A regex validator would be:
// /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
// Would you like me to check your codebase to see where you'd like to add this validator, or do you have other questions about UUID validation?

import type { V4UUID } from "felixtypes";
import { isStr } from "./isStr.js";

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** @returns boolean representing if 'v' is  str that matches the V4 UUID shape (i.e., segment lengths + the few known chars: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx) */
export const isV4UUID = (v: unknown): v is V4UUID => {
    if (!isStr(v)) return false;
    return regex.test(v);
}