import { DEV } from "esm-env";
import { type GetRelatedValidatorReturn, type GetValidatorReturn, type ReadonlyNonEmptyArr, type RelatedValidators, type ValidatorFn } from "felixtypes";
import { assertNonEmpty } from "../assert/assertNonEmpty.js";
import { getErrMsg } from "../assert/get/getErrMsg.js";
import { INTERNAL_getValidator } from "../internal/index.js";
import { getRefiner } from "../refine/index.js";

/**
 * TODO:
    * []: add errMsg prop :)
        * []: after which, there is some odd crossover with "assertCondition"; this is also, frankly, cleaner, and should be used preferably
    * []: currently only takes ValIden; update it to take ValidatorFns too
    * []: 'ensure' should be a different export based on 'mode', rather than directing as it does...
    * []: this doesn't use 'devWarn', since 'utils' depends on 'validator'... I think that's fine...
    * []: I need to manually check that this works for all ValIden... I think it should, tho
    * []: I have not tested if it properly preserves generics, tho it should, as it uses the same types as Opt/Match, and they do...
    * []: maybe... 'makeEnsurer' takes TVal early, which means the user needs to provide it manually... having it passed to the internal function would be cool, but then that doesn't allow narrowing of the idens... hmm...
    * []: finish JSDoc
 */

/** 
 * NTS: 
    * I'm curious about the performance cost of 'ensure' vs 'devEnsure' (or, really, asserters in general); I'll have to ctrl-shift-f an entire codebase and check :)
        * I found that when I tested 'ensure' vs 'devEnsure' in prod - i.e., just returning the value, vs. actually checking - with 1,000,000 iterations, it took 10x longer (~20s vs ~2s) to actually do the work
            * ... so VERY negligible for the way I do it
*/

export {
    ensure
};

// /**
//      * takes a spread array of either Typeguards (that are applicable to the inner value), or, the related validators from the "validator" lib
//      * @example Match("some str").refine("str")... // since "some str" is tightly inferred, the intellisense only suggests "str"
//      * @example Match.loose("some str").refine("str", "digitStr", "dateStr")... // with Match.loose, the type is broadened; the intellisense will suggest these validators, and error if you overwrite a non-compatible one, e.g., '.refine("null")'
//      * @example Match.loose("some str").refine("str", (v: string): string is MagicStr => ["magic", "gems"].includes(v as any)) // example of providing a validator fn, along with an inbuilt one
//     */
//     const refine = <
//         const VType extends ReadonlyNonEmptyArr<Exclude<RelatedValidators<TVal>, TRefineSeen[number]> | ValidatorFn<RType, TVal>>,
//         /** the ValidatorReturn type */
//         const VReturn = GetRelatedValidatorReturn<TVal, RType, VType>,
//         /** this 'extends TEqSeen...' bit stops it from allowing refiners that resolve to a val that's been seen */ 
//     >(...refiners: VReturn extends TEqSeen[number] ? never : VType) => {
//         return {} as any;
//     }

/**
 * Ensures that a value satisfies a given validator identifier.
 * Returns the value if it passes validation, otherwise returns the result of 'getDefault()' if it was provided, otherwise throws an Error.
 * @template TIden - The validator identifier type; there are no generics on any ValidatorFns passed to this fn, as TS can be annoying with those :) as with any assert, ensuring is up to you!
 * @template TIden - There are no generics on any ValidatorFns passed to this fn - as with any assert, ensuring accuracy is up to you!
 * @param iden - The validator identifier to check against
 * @param val - The value to validate
 * @returns The validated value, narrowed to the type specified by the identifier
 * @throws if the value does not satisfy the validator
 * @throws if 'refiners' is empty
 * you will get undefined behaviour if you pass a sparse array, u disorganised monster
//  * @param getDefault - (OPTIONAL) Getter for a default value
 */
// function getRefiner<const T, (
//     ...refiners: VType
// ): (v: unknown) => v is GetValidatorReturn<VType[number]> {
function ensure<
    const TVal,
    const VType extends ReadonlyNonEmptyArr<RelatedValidators<TVal> | ValidatorFn<any, TVal>>
>(
    val: TVal,
    ...refiners: VType
): GetValidatorReturn<VType[number]> {
    assertNonEmpty(refiners);
    for (let i = 0; i < refiners.length; i++) {
        if ((INTERNAL_getValidator(refiners[i]!))(val)) return val as any;
    }

    // @ts-expect-error(2345: "not assignable"... due to "Validator<any, TVal>" vs "Validator<any>" in 'geterrMsg')
    throw new Error(getErrMsg(...refiners));
}

/**
 * a wrapper around 'ensure' to make a reuseable call to it
 * if 'getDefault' is provided to this caller, it will be used as default, though can be overriden on a per-call basis
*/
function getEnsurer<TIden extends RelatedValidators<TVal>, TVal>(iden: TIden, getDefault?: () => GetRelatedValidatorReturn<TVal, TVal, [TIden]>, devWarnOnDefault?: boolean) {
    const errMsg = getErrMsg(iden);
    const refiner = getRefiner(iden);

    return (val: TVal, getDefaultOverride = getDefault): GetRelatedValidatorReturn<TVal, TVal, [TIden]> => {
        // @ts-expect-error(2322: ReturnType is not assignable to...)
        if (refiner(val)) return val;
        if (getDefaultOverride) {
            if (devWarnOnDefault && DEV) console.warn("ensure received val", val, `but returning getDefault(), because ${errMsg}`);
            return getDefaultOverride();
        }
        throw new Error(errMsg);
    };
}

// /** a wrapper around {@link ensure} that returns the val - i.e., essentially typecasts it - if not in 'dev' mode */
// function devEnsure<
//     const TVal,
//     TIden extends RelatedValidators<TVal>
// >(
//     val: TVal,
//     iden: TIden,
//     getDefault?: () => NoInfer<GetRelatedValidatorReturn<TVal, TVal, [TIden]>>,
//     devWarnOnDefault?: boolean,
// ): GetRelatedValidatorReturn<TVal, TVal, [TIden]> {
//     // @ts-expect-error(2322: ReturnType is not assignable to...)
//     if (!dev) return val;
//     return ensure(val, iden, getDefault, devWarnOnDefault);
// }