import { SvelteSet } from "svelte/reactivity";

/**
 * Checks if a value is a SvelteSet.
 * @param val - The value to check
 * @returns True if the value is a SvelteSet
 */
export const isSvelteSet = (val: unknown): val is SvelteSet<unknown> => val instanceof SvelteSet;