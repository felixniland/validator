import type { NonEmptyArr, NonSymbolPrim, NullOr } from "felixtypes";
import { isArr } from "../is/isArr.js";
import { isSet } from "../is/isSet.js";

export {
    newPrimValidator,
    newStrValidator,
    PrimValidator
};

/**
 * @template T - any non-Symbol primitive
 * @param col - Set<T> or Array<T>: the collection that is used for validation
 * @returns typegurd fn: (v: unknown) => v is T
 * @throws if col is empty
*/
function newPrimValidator<T extends NonSymbolPrim>(col: NonEmptyArr<T> | Set<T>): ((v: unknown) => v is T) {
    if (isArr(col) && !col.length) throw new Error("newPrimValidator received empty Array");
	if (isSet(col) && !col.size) throw new Error("newPrimValidator received empty Set");

	/** make a new Set whether it is already a Set, or not, to break the object reference */
    const set = new Set(col);
    
	return (v: unknown): v is T => (set as Set<unknown>).has(v);
}

/**
 * @deprecated use {@link newPrimValidator} instead
 * @returns a typed validator for the given array
 * @throws if it receives an empty array
*/
const newStrValidator = <T extends string>(arr: NonEmptyArr<T>) => newPrimValidator(arr);

/**
 * @template T the type to validate
 * @template T defaults to "never", so if you are not providing a list of "prims" to the constructor and/or do not wish it to infer, invoke it with a manually specified type
 * similar to 'newPrimValidator', except:
 * - it allows you to add (but not remove!) prims
 * - if 'prims' is empty, the return value is 'false', rather than a throw
 * @todo better err msg, or just join the prims as a default
*/
class PrimValidator<T extends NonSymbolPrim = never> {
    constructor(prims?: NonEmptyArr<T>) {
        this.#prims = (prims as Array<T>) ?? [];
    }

    #prims: Array<T>;

    #validator: NullOr<(v: unknown) => v is T> = null;

    /** is 'v' T (defaulting to FALSE if you have not provided any prims) */
    validate(v: unknown): v is T {
        return Boolean(this.#validator?.(v));
    }

    /** throws if 'v' is not T; also throws if there is no validator, i.e., you haven't provided anhy prims */
    ensure(v: unknown): T {
        if (this.validate(v)) return v;
        if (!this.#prims.length) throw new Error("cannot call 'ensure' before providing any prims");
        throw new Error("expected something else...");
    }

    addPrim(v: T): void {
        this.#prims.push(v);
        this.#validator = newPrimValidator((this.#prims as NonEmptyArr<T>));
    }
}

// const SPECIAL_STRS = ["a", "b"] as const;
// type SpecialStr = typeof SPECIAL_STRS[number];
// const test = new PrimValidator<SpecialStr>();

// const someVal = "" as unknown;

// if (test.validate(someVal)) {
//     someVal; // "a" | "b"
// } else {
//     someVal; // "unknown"
// }

// const bla = test.ensure(someVal); // "a" | "b"