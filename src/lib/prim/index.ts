import type { NonEmptyArr, NonSymbolPrim } from "felixtypes";

export {
    newStrValidator,
    newPrimValidator,
}

/**
 * @returns a typed validator for the given array of non-symbol primitives
 * @throws if it receives an empty array
*/
function newPrimValidator<T extends NonSymbolPrim>(arr: NonEmptyArr<T>) {
    if (!arr.length) throw new Error("newStrValidator received empty array");
    const set = new Set(arr);

    return (val: unknown): val is T => set.has(val as any);
}

/**
 * @deprecated use {@link newPrimValidator} instead
 * @returns a typed validator for the given array
 * @throws if it receives an empty array
*/
const newStrValidator = <T extends string>(arr: NonEmptyArr<T>) => newPrimValidator(arr);