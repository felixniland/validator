import { type GetRelatedValidatorReturn, type Getter, type NullOr, type ReadonlyNonEmptyArr, type RelatedValidators, type ValidatorFn } from "felixtypes";
import { assertNonEmpty } from "../assert/assertNonEmpty.js";
import { getErrMsg } from "../assert/get/getErrMsg.js";
import { INTERNAL_getValidator } from "../internal/index.js";
import { isFn } from "../is/isFn.js";
import { isObj } from "../is/isObj.js";

/**
 * TODO:
    * []: now that I've added the 'errMsg' prop, there is some odd crossover with "assertCondition"; this is also, frankly, cleaner, and should be used preferably
    * []: 'ensure' should be a different export based on 'mode', rather than directing as it does...
    * []: this doesn't use 'devWarn', since 'utils' depends on 'validator'... I think that's fine...
    * []: tests
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

/**
 * Ensures that a value satisfies a given validator identifier.
 * Returns the value if it passes validation, otherwise returns the result of 'getDefaultVal()' if it was provided, otherwise throws an Error.
 * @template TIden - The validator identifier type; there are no generics on any ValidatorFns passed to this fn, as TS can be annoying with those :) as with any assert, ensuring is up to you!
 * @param val - The value to validate
 * @param refiners - spread Array of (related!) ValIdens and/or ValidatorFns
 * @param opts.getDefaultVal - (OPTIONAL) getter for the default value to return; must be the same as what the refiners check for, not a new value type
 * @param opts.customErrMsg - (OPTIONAL) getter for a custom err msg, which can optionally take "val" as an argument
 * @returns The validated value, narrowed to the type specified by the identifier
 * @throws if the value does not satisfy the validator
 * @throws if 'refiners' is empty
 * @throws if the last member of refiners is an empty object - i.e., you provide an empty 'param.opts'
 * you will get undefined behaviour if you pass a sparse array, u disorganised monster
*/
function ensure<
    const TVal,
    const RType extends TVal,
    const VType extends ReadonlyNonEmptyArr<RelatedValidators<TVal> | ValidatorFn<RType, TVal>>
>(
    val: TVal, ...args: [
        ...refiners: VType,
        opts?: {
            getDefaultVal?: () => GetRelatedValidatorReturn<TVal, RType, VType>;
            customErrMsg?: (val: TVal) => string;
        }
    ]
): GetRelatedValidatorReturn<TVal, RType, VType> {
    const refiners = args as Array<RelatedValidators<TVal> | ValidatorFn<RType, TVal>>;
    
    let getDefaultVal: NullOr<() => GetRelatedValidatorReturn<TVal, RType, VType>> = null;
    /** the default 'generateErrMsg' is 'getErrMsg(...refiners)'; but we may overwrite it with the user's */
    let generateErrMsg: Getter<string, TVal | undefined> = (() => getErrMsg(...(refiners as any)));

    const maybeOpts = refiners.at(-1);
    let isOpts: boolean = false;

    /** if 'maybeOpts' is 'opts', pop it off reinfers so it doesn't get passed to 'getValidator' */
    if (isObj(maybeOpts)) {
        if ("getDefaultVal" in maybeOpts && isFn(maybeOpts.getDefaultVal)) {
            // @ts-expect-error(2322 - "fn" is too broad for the signature)
            getDefaultVal = maybeOpts.getDefaultVal;
            isOpts = true;
        }
        
        if ("customErrMsg" in maybeOpts && isFn(maybeOpts.customErrMsg)) {
            // @ts-expect-error(2322 - "fn" is too broad for the signature)
            generateErrMsg = maybeOpts.customErrMsg;
            isOpts = true;
        }

        if (!isOpts) throw new Error("ensure - empty object was passed to refiners Array");
        void refiners.pop();
    }

    assertNonEmpty(refiners);
    
    for (let i = 0; i < refiners.length; i++) {
        if ((INTERNAL_getValidator(refiners[i]!))(val)) return val as any;
    }

    if (getDefaultVal) return getDefaultVal();

    throw new Error(generateErrMsg(val));
}

// /**
//  * a wrapper around 'ensure' to make a reuseable call to it
//  * if 'getDefault' is provided to this caller, it will be used as default, though can be overriden on a per-call basis
// */
// // @ts-expect-error(6133 - no unused locals)
// function getEnsurer<TIden extends RelatedValidators<TVal>, TVal>(iden: TIden, getDefault?: () => GetRelatedValidatorReturn<TVal, TVal, [TIden]>, devWarnOnDefault?: boolean) {
//     const errMsg = getErrMsg(iden);
//     const refiner = getRefiner(iden);

//     return (val: TVal, getDefaultOverride = getDefault): GetRelatedValidatorReturn<TVal, TVal, [TIden]> => {
//         // @ts-expect-error(2322: ReturnType is not assignable to...)
//         if (refiner(val)) return val;
//         if (getDefaultOverride) {
//             if (devWarnOnDefault && DEV) console.warn("ensure received val", val, `but returning getDefault(), because ${errMsg}`);
//             return getDefaultOverride();
//         }
//         throw new Error(errMsg);
//     };
// }

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