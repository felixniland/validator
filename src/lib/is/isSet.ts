export {
    isSet
}

/** Checks if val is a Set */
function isSet<T>(val: T | unknown): val is Set<T extends Set<infer U> ? U : unknown>;
function isSet<T>(val: T | unknown): val is Set<unknown> {
    return val instanceof Set;
}