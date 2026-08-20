import type { GetRelatedValidatorReturn, RelatedValidators } from "felixtypes";
import { getErrMsg } from "../assert/get/getErrMsg.js";
import { getRefiner } from "../refine/index.js";
import { DEV } from "esm-env";

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

// export {
//     ensure,
//     getEnsurer,
// };

/**
 * Ensures that a value satisfies a given validator identifier.
 * Returns the value if it passes validation, otherwise returns the result of 'getDefault()' if it was provided, otherwise throws an Error.
 * @template TIden - The validator identifier type
 * @param iden - The validator identifier to check against
 * @param val - The value to validate
 * @param getDefault - (OPTIONAL) Getter for a default value
 * @returns The validated value, narrowed to the type specified by the identifier
 * @throws if the value does not satisfy the validator
 */
function ensure<
    const TVal,
    TIden extends RelatedValidators<TVal>
>(
    val: TVal,
    iden: TIden,
    getDefault?: () => NoInfer<GetRelatedValidatorReturn<TVal, TVal, [TIden]>>,
    devWarnOnDefault?: boolean,
): GetRelatedValidatorReturn<TVal, TVal, [TIden]> {
    // @ts-expect-error(2322: ReturnType is not assignable to...)
    if (getRefiner(iden)(val)) return val;
    if (getDefault) {
        if (devWarnOnDefault && DEV) console.warn("ensure received val", val, `but returning getDefault(), because ${getErrMsg(iden)}`);
        return getDefault();
    }
    throw new Error(getErrMsg(iden));
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