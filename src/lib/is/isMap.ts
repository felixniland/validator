export {
    isMap
}

/** Checks if val is a Map */
function isMap<T>(val: T | unknown): val is T extends Map<infer K, infer V> ? Map<K, V> : Map<unknown, unknown>;
function isMap<T>(val: T | unknown): val is Map<unknown, unknown> {
    return val instanceof Map;
}