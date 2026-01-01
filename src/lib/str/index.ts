import { isStr } from "$lib/is/index.js";
import type { NonEmptyArr } from "$lib/internal/types.js";

export {
    newStrValidator
}

function newStrValidator<T extends string>(arr: NonEmptyArr<T>) {
    const set = new Set(arr);
    
    const fn = (val: unknown): val is T => (
        isStr(val) && set.has(val as any)
    );

    return fn;
}