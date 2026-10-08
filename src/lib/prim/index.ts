import type { NonEmptyArr, NonSymbolPrim, NullOr } from "felixtypes";
import { isArr } from "../is/isArr.js";
import { isSet } from "../is/isSet.js";

/**
 * TODO:
    * []: PrimValidator class: allow customErrMsg
*/

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
 * @usage meant to be used with declaration merging; it does not return new instances with the expanded type
 * @usage this is footgun-prone, but sometimes this is the pattern you need, so use with caution :)
*/
class PrimValidator<T extends NonSymbolPrim = never> {
    constructor(prims?: NonEmptyArr<T> | Set<T>) {
        this.#prims = Array.from(prims ?? []);
    }

    #prims: Array<T>;

    #validator: NullOr<(v: unknown) => v is T> = null;

    /** is 'v' T (defaulting to FALSE if you have not provided any prims) */
    validate(v: unknown): v is T {
        return Boolean(this.#validator?.(v));
    }

    /**
     * @throws error if 'v' is not T
     * @throws error if you haven't provided any prims
     * errMsg: `received ${String(v)}, but expected one of: ${this.#prims.join(", or")`
    */
    ensure(v: unknown): T {
        if (this.validate(v)) return v;
        if (!this.#prims.length) throw new Error("cannot call 'ensure' before providing any prims");
        throw new Error(`received ${String(v)}, but expected one of: ${this.#prims.join(", or")}`);
    }

    addPrim(v: T): void {
        this.#prims.push(v);
        this.#validator = newPrimValidator((this.#prims as NonEmptyArr<T>));
    }
}

// interface CatNames {
//     razz: any;
//     crab: any;
// }

// type KittyIden = Compute<keyof CatNames>;

// const test = new PrimValidator<KittyIden>(["razz", "crab"]);

// interface CatNames {
//     buttons: any;
// }

// test.addPrim("buttons");