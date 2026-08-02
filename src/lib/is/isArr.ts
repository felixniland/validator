export {
    isArr
}

/** Checks if val is an array */
function isArr<T>(val: T | unknown): val is Array<T extends Array<infer U> ? U : unknown>;
function isArr<T>(val: T | unknown): val is Array<unknown> {
    return Array.isArray(val);
}