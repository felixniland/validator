import { someObj } from "$lib/test.js";
import type { NarrowProp, PropKeysOnly } from "felixtypes";

/**
     * NEW NOTES:
        * I'm not using "createobjvalidator...", I can delete it // type CreateObjValidatorByProp<T extends object, K extends PropKeysOnly<T>, NewV extends T[K]> = ValidatorFn<NarrowProp<T, K, NewV>, T>;
 */

/**
 * OLD NOTES
    * PURPOSE: constructing validator functions that narrow an obj's type via obj[key]
        * @example type CompletedTask = NarrowProp<Task, "done", true>;
        * to avoid TS's "predicate must extend...", therefore, returns the INTERSCTION of [RemapProp & T], thus:
            * - narrows the type as one intuitively expects (e.g., CompletedTask above still works)
            * - *generally* quiets TS
        * still errors if used when there's no intersections(such as boolean => BoolNum, since they don't intersect at all), so this is not the right type for that
*/

type EqArgs<T> = {}

declare function EQ<const T>(a: T, b: unknown, opts?: EqArgs<T>): b is T;

const newKeyOfValValidator = <
    T extends Record<PropertyKey, any>, // 1. apply the T type as a generic, without passing the object
>(_obj?: T) => {
    
    // 2. apply the K type as a generic; the key must be passed, so we can use it to index in during runtime
    const key =<const K extends PropKeysOnly<T>>(key: K) => {
        
        // takes in the 
        const equals = <NewV extends T[K]>(...matches: Array<NewV>) => {
            const retFn = (obj: T): obj is NarrowProp<T, K, NewV> => {
                return matches.some((match) => EQ(match, obj[key]));
            }

            return retFn;
        }
        
        return { equals };
    }

    return { key };
}

// const val = newKeyOfValValidator<StrNumMaybeObj>()({ key: "num", matches: [1] })
const easyAsABC = newKeyOfValValidator(someObj).key("num").equals(1, 2, 3);

if (easyAsABC(someObj)) {
    someObj;
} else {
    someObj;
}