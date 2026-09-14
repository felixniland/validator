import { isArr, isSet } from "../is/index.js";
import type { NonEmptyArr, NonSymbolPrim } from "felixtypes";

export {
    newStrValidator,
    newPrimValidator,
}

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