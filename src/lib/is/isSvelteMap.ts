import { SvelteMap } from "svelte/reactivity";

/** Checks if val is a SvelteMap */
export const isSvelteMap = (val: unknown): val is SvelteMap<unknown, unknown> => val instanceof SvelteMap;