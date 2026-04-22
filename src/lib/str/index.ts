import type { NonEmptyArr } from "felixtypes";

export {
    newStrValidator
}

function newStrValidator<T extends string>(arr: NonEmptyArr<T>) {
    const set = new Set(arr);
    
    const fn = (val: unknown): val is T => (
        set.has(val as any)
    );

    return fn;
}