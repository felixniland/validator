import { SvelteMap } from "svelte/reactivity";

/**
 * Checks if a value is a SvelteMap.
 * @param val - The value to check
 * @returns True if the value is a SvelteMap
 */
export const isSvelteMap = (val: unknown): val is SvelteMap<unknown, unknown> => val instanceof SvelteMap;