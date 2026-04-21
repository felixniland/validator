import { SvelteSet } from "svelte/reactivity";

/** Checks if val is a SvelteSet */
export const isSvelteSet = (val: unknown): val is SvelteSet<unknown> => val instanceof SvelteSet;