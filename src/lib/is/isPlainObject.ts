import type { PlainObject } from "felixtypes";

/**
 * TODO:
    * []: export this - I just gotta update 'felixtypes', make the asserter, etc
*/

/** Checks if v is a PlainObject */
const isPlainObject = (v: unknown): v is PlainObject => {
    if (
        v === null
        || typeof v !== "object"
        || Symbol.iterator in v
        /** NTS: 'typeof v !== objects' above will remove Functions, so no need to check "call" below; but the 'PlainObject' type does have 'call?: never', since it must apply all its checks at once */
        // || ("call" in v && typeof v.call === "function")
    ) {
        return false;
    }

    const prototype = Object.getPrototypeOf(v);
    return prototype === Object.prototype || prototype === null;
}