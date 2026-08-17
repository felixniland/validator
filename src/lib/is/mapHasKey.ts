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
function mapHasKey<K, V, const TSpecificKey extends K>(map: Map<K, V>, key: TSpecificKey): map is Omit<Map<K, V>, "get" | "delete"> & {
    get(key: TSpecificKey): V;
    get(key: Exclude<K, TSpecificKey>): V | undefined;
    // there is no 'delete: thisKey" method, as that would allow you to enter it; the below signature means it errors if you try to delete TSpecificKey
    delete(key: Exclude<K, TSpecificKey>): boolean;
    // this is not-obvious... if you are just calling it, you don't see the return value...
    // clear(): never;
} {
    return map.has(key);
}

// const someMap = new Map<"a" | "b" | "c", number>();

// someMap.set("a", 1);
// someMap.set("b", 2);
// someMap.set("c", 3);

// if (mapHasKey(someMap, "a")) {
//     someMap;
//     const cleared = someMap.clear();
//     // const what = someMap.get("a");
//     // const deleted = someMap.delete("a");
// }








// T ODO: from 'TypedRocks' on Youtube <3 // works, but doesn't handle 'clear / delete', so... gotta think on it...

            // declare const __marker: unique symbol;
            // type Marker = {[__marker]: 'Marker'};

            // interface TypeSafeMap<K, V> extends Omit<Map<K, V>, "has" | "get"> {
            //     // clear(): void; // this does not 'un-validate' a key
            //     // delete(key: K): boolean; // T ODO: this does not 'un-validate' a key
            //     has(key: K): key is K & Marker;
            //     get<PossiblyMarked extends K>(key: PossiblyMarked): PossiblyMarked extends Marker ? V : V | undefined;
            // }

            // interface MapConstructor {
            //     new (): Map<any, any>;
            //     new <K, V>(entries?: readonly (readonly [K, V])[] | null): TypeSafeMap<K, V>;
            //     readonly prototype: Map<any, any>;
            // }

            // declare var Map: MapConstructor;


















/** SVELTE MAP VERSION */
// interface TypeSafeSvelteMap<K, V> extends Omit<SvelteMap<K, V>, "has" | "get"> {
//     has(key: K): key is K & Marker;
//     get<PossiblyMarked extends K>(key: PossiblyMarked): PossiblyMarked extends Marker ? V : V | undefined;
// }

// interface SvelteMapConstructor {
//     new (): SvelteMap<any, any>;
//     new <K, V>(entries?: readonly (readonly [K, V])[] | null): TypeSafeSvelteMap<K, V>;
//     readonly prototype: SvelteMap<any, any>;
// }

// declare var BetterSvelteMap: SvelteMapConstructor;

// function testSvelteMap() {
//     const someKey = "someKey" as const;
//     const bla = new BetterSvelteMap<string, number>(); // with the 'overridden' constructor
//     // const bla = new SvelteMap<string, number>() as u nknown as TypeSafeSvelteMap<string, number>;

//     if (bla.has(someKey)) {
//         const val = bla.get(someKey);
//     } else {
//         const val = bla.get(someKey);
//     }
// }