export {
    mapHasKey,
}

/**
 * Checks if a Map contains the specified key.
 * @param map - The Map to check.
 * @param key - The key to look for in the Map.
 * @returns true if the Map contains the key, false otherwise.
 * @example```
    const myMap = new Map<number, string>([
        [ 1, "a" ],
        [ 2, "b" ]
    ]);

    if (mapHasKey(myMap, 1)) {
        const getOne = myMap.get(1); // string
        const getTwo = myMap.get(2); // string | undefined
    }
 * ```
 */
function mapHasKey<K, V, const TSpecificKey extends K>(map: Map<K, V>, key: TSpecificKey): map is Omit<Map<K, V>, "get"> & {
    get(key: TSpecificKey): V;
    get(key: Exclude<K, TSpecificKey>): V | undefined;
} {
    return map.has(key);
}