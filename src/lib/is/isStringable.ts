import type { Stringable } from "felixtypes";
import { isNull } from "./isNull.js";

export {
    isStringable
}

/**
 * TODO: finish :) the "isStringable" is done, but I want to make sure that "stringify" works according to the validator... plus set up the exports, etc
*/

function isStringable(v: unknown): v is Stringable {
    switch (typeof v) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined": // "undefined"
            return true;
        case "object":
            return isNull(v);
        default:
            return false;
            
        // case "symbol": // NTS: String(Symbol("hello")) returns `Symbol("hello")`
        // case "function": // can just stringify it directly; or return its name, if it has one
        // case "object":
        //     return (String(v) !== "[object Object]"); // NTS: this will capture nulls, and tries in order: toPrimitive => toString => valueOf
    }
}