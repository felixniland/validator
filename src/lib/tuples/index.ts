import { getRefiner } from "../refine/index.js";
import type { GetValidatorReturn, RelatedValidators, TODO } from "felixtypes";

/**
 * TODO:
    * []: this works! The next thing is to properly add it to this lib - to felixtypes, etc - and to then add it to 'utils[match/opt].eq'
*/

export {
    nthMemberOfTupleIs,
    assertNthMemberOfTupleIs
}

// type GetTupleType<T extends ReadonlyArray<any>> = IsTuple<T> extends true ? T[number] : never;
// type TEST_GetTupleType = GetTupleType<SomeTuple>; // number // correct

/** @returns boolean representing if 'T' is a Tuple, which is determined by seeing if number extends T["length"], which will fail when it is a specific number */
type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"] ? false : true;
// type isSomeTupleTuple = IsTuple<SomeTuple>; // true // correct

/** for a tuple with a length of between 1-10, inclusive, returns the valid indices */
type GetTupleIndices<T extends ReadonlyArray<any>> = IsTuple<T> extends false
    ? never
    : T["length"] extends infer Len
        ? Len extends number
            ? Len extends 10 ? Len10
            : Len extends 9 ? Len9
            : Len extends 8 ? Len8
            : Len extends 7 ? Len7
            : Len extends 6 ? Len6
            : Len extends 5 ? Len5
            : Len extends 4 ? Len4
            : Len extends 3 ? Len3
            : Len extends 2 ? Len2
            : Len extends 1 ? Len1
            : never // Len does not extend 10..1
            : never // Len does not extend number
        : never;
// type TEST_GetMaxTupleIndex = GetMaxTupleIndex<SomeTuple>; // 1 // correct

/** the indices available for the given length */
type Len10 = 9 | Len9;
type Len9 = 8 | Len8;
type Len8 = 7 | Len7;
type Len7 = 6 | Len6;
type Len6 = 5 | Len5;
type Len5 = 4 | Len4;
type Len4 = 3 | Len3;
type Len3 = 2 | Len2;
type Len2 = 1 | Len1;
type Len1 = 0;

type GetValidatedTuple<
    TTuple extends ReadonlyArray<any>,
    TIdx extends GetTupleIndices<TTuple>,
    TValidator extends RelatedValidators<TTuple[TIdx]>,
> = {[K in keyof TTuple]: K extends `${TIdx}` // NTS: the keys of a tuple are strings, i.e., '${number}'
            ? GetValidatorReturn<TValidator>
            : TTuple[K]
    } extends infer Validated
        ? Validated extends TTuple
            ? Validated
            : never // does not extend
        : never; // cannot infer 'Validated'

/**
 * @param tuple the tuple to validate
 * @param idx the member of the tuple to evaluate
 * @param validators validator/s assignable to tuple[idx]
 * @returns boolean representing if the tuple itself at 'tuple[idx]' is one of the checks passed as a validator
*/
function nthMemberOfTupleIs<
    const TTuple extends ReadonlyArray<any>,
    const TIdx extends GetTupleIndices<TTuple>,
    const TValidator extends RelatedValidators<TTuple[TIdx]>,
>(tuple: TTuple, idx: TIdx, ...validators: Array<TValidator>): tuple is GetValidatedTuple<TTuple, TIdx, TValidator> {
    for (const v of validators) {
        if (getRefiner(v)(tuple[idx])) return true;
    }

    return false;
}

/**
 * asserter version of {@link nthMemberOfTupleIs}
*/
function assertNthMemberOfTupleIs<
    const TTuple extends ReadonlyArray<any>,
    const TIdx extends GetTupleIndices<TTuple>,
    const TValidator extends RelatedValidators<TTuple[TIdx]>,
>(tuple: TTuple, idx: TIdx, ...validators: Array<TValidator>): asserts tuple is GetValidatedTuple<TTuple, TIdx, TValidator> {
    if (nthMemberOfTupleIs(tuple, idx, ...validators)) return;
    throw new Error(`expected tuple[${idx}] to be ${"TODO" as TODO}`);
}

// Crab's testing shack
    // const bla: SomeTuple = [1, 2];
    // if (nthMemberOfTupleIs(bla, 1, "boolNum")) {
    //     bla;
    // } else {
    //     bla;
    // }