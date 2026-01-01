import type { ValidatorFn } from "$lib/index.js";
import { isStr } from "$lib/is/index.js";
import type { NonEmptyArr } from "$lib/internal/types.js";

/**
 * TODO:
    * []: a version that returns a brandedType, as otherwise feels stupid to allow validator props (even the current case-insensitivity is...irksome)
 */

export {
    newStrValidator
}

export type {
    StrValidatorFn,
}

type StrValidatorFn<T extends string> = ValidatorFn<T>;

type StrValidatorOpts = {
    caseInsensitive?: boolean;
    // min?: number;
    // max?: number;
};

/** i.e., without props lol */
function newStrValidator<T extends string>(arr: NonEmptyArr<T>) {
    const set = new Set(arr);
    
    const fn = (val: unknown): val is T => (
        isStr(val) && set.has(val as any)
    );

    return fn;
}

// NTS: stopped using this, as the params make the "v is T" return a lie. this was a silly idea for a validator; it makes more sense as a util, esp if it returns the transformed match (e.g., lowercase'd) 
// generateStrValidator<T extends string>(arr: Array<T>, opts?: StrValidatorOpts<true>): string;
// generateStrValidator<T extends string>(arr: Array<T>, opts?: StrValidatorOpts<false>): string;
// function newStrValidatorWithProps<T extends string>(arr: NonEmptyArr<T>, opts?: StrValidatorOpts): StrValidatorFn<T> {
//     const normalised = opts?.caseInsensitive ? arr.map(str => str.toLowerCase()) : arr;
    
//     const set = new Set(normalised);
//     const normalisedStr = (str: string): string => opts?.caseInsensitive ? str.toLowerCase() : str;

//     // const passMin = (typeof opts?.min === "number") ? (str: string) => min(str, opts.min!) : true;
//     // const passMax = (typeof opts?.max === "number") ? (str: string) => min(str, opts.max!) : true;
    
//     const fn = (val: unknown): val is T => (
//         isStr(val)
//         && set.has(normalisedStr(val)) 
//         // && (typeof passMin === "boolean" ? passMin : passMin(val))
//         // && (typeof passMax === "boolean" ? passMax : passMax(val))
//     );

//     return fn;
// }