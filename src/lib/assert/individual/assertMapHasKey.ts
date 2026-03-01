export {
    assertMapHasKey,
}

/**
 * Checks if a Map contains the specified key.
 * @param map - The Map to check.
 * @param key - The key to look for in the Map.
 * @example```
    const myMap = new Map<number, string>([
        [ 1, "a" ],
        [ 2, "b" ]
    ]);

    assertMapHasKey(myMap, 1);
    const getOne = myMap.get(1); // string
    const getTwo = myMap.get(2); // string | undefined
 * ```
 */
function assertMapHasKey<K, V, const TSpecificKey extends K>(map: Map<K, V>, key: TSpecificKey, errMsg?: string): asserts map is Omit<Map<K, V>, "get"> & {
    get(key: TSpecificKey): V;
    get(key: Exclude<K, TSpecificKey>): V | undefined;
} {
    if (!map.has(key)) throw new Error(errMsg || `expected key "${String(key)}" not found in map`);
}