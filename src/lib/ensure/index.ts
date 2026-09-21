import { type GetRelatedValidatorReturn, type Getter, type NullOr, type ReadonlyNonEmptyArr, type RelatedValidators, type ValidatorFn } from "felixtypes";
import { assertNonEmpty } from "../assert/assertNonEmpty.js";
import { getErrMsg } from "../assert/get/getErrMsg.js";
import { INTERNAL_getValidator } from "../internal/index.js";
import { isFn } from "../is/isFn.js";
import { isObj } from "../is/isObj.js";

/**
 * TODO:
    * []: now that I've added the 'errMsg' prop, there is some odd crossover with "assertCondition"
        * THIS is much cleaner than 'assertCondition', but 'assertCondition' also takes any old '(val: T) => boolean'
    * []: tests
    * []: a wrapper around {@link ensure} that returns the val - i.e., essentially typecasts it - if not in 'dev' mode
        // function devEnsure<const TVal, etc...>(
        //     val: TVal, etc...
        // ): GetRelatedValidatorReturn<TVal, TVal, [TIden]> {
        //     // @ts-expect-error(2322: ReturnType is not assignable to...)
        //     if (!dev) return val;
        //     return ensure(val, iden, getDefault, devWarnOnDefault);
        // }
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
 * Ensures that a value satisfies a given validator identifier, OR provides getDefaultVal?.(), or throws an Error.
 * @param val - The value to validate
 * @param refiners - spread Array of (related!) ValIdens and/or ValidatorFns
 * @param opts.getDefaultVal - (OPTIONAL) getter for the default value to return, which can optoinally take "val" as an argument; must be the same as what the refiners check for, not a new value type
 * @param opts.customErrMsg - (OPTIONAL) getter for a custom err msg, which can optionally take "val" as an argument
 * @returns The validated value, narrowed to the type specified by the identifier
 * @throws if 'refiners' is empty
 * @throws if 'refiners' has a non-ValIden, non-Function entry
 * @throws if the last member of refiners is an empty object - i.e., you provide an empty 'param.opts'
 * @usage you will get undefined behaviour if you pass a sparse array, u disorganised monster
*/
// NTS: Overload 1: no opts — preserves direct VType inference
function ensure<
    const TVal,
    const RType extends TVal,
    const VType extends ReadonlyNonEmptyArr<RelatedValidators<TVal> | ValidatorFn<RType, TVal>>
>(
    val: TVal,
    ...refiners: VType
): GetRelatedValidatorReturn<TVal, RType, VType>;

// NTS: Overload 2: with opts — opts is required, which lets TS see the difference between "VType" and "opts"; when opts was in the all-in-one signature before ('opts?:'), it would aggressively widen 'VType'
function ensure<
    const TVal,
    const RType extends TVal,
    const VType extends ReadonlyNonEmptyArr<RelatedValidators<TVal> | ValidatorFn<RType, TVal>>
>(
    val: TVal,
    ...args: [...refiners: VType, opts: {
        getDefaultVal?: (val: TVal) => NoInfer<GetRelatedValidatorReturn<TVal, RType, VType>>;
        customErrMsg?: (val: TVal) => string;
    }]
): GetRelatedValidatorReturn<TVal, RType, VType>;

function ensure<
    const TVal,
    const RType extends TVal,
    const VType extends ReadonlyNonEmptyArr<RelatedValidators<TVal> | ValidatorFn<RType, TVal>>
>(val: TVal, ...args: Array<any>): GetRelatedValidatorReturn<TVal, RType, VType> {
    let getDefaultVal: NullOr<(val: TVal) => GetRelatedValidatorReturn<TVal, RType, VType>> = null;

    /** the default 'generateErrMsg' is 'getErrMsg(...refiners)'; but we may overwrite it with the user's */
    let generateErrMsg: Getter<string, TVal> = (() => getErrMsg(...(refiners as any)));
    
    /** this is untrue, as it may have 'opts' as the last member, but we will check that shortly */
    const refiners = args as Array<RelatedValidators<TVal> | ValidatorFn<RType, TVal>>;

    const maybeOpts = refiners.at(-1);
    
    /** a flag used to ensure that if 'isObj(maybeOpts)', if it is an empty object, the error is thrown below */
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

        if (!isOpts) throw new Error("Validator.ensure expected a non-empty options object; provide 'getDefaultVal' and/or 'customErrMsg', or do not provide an object");
        void refiners.pop();
    }

    assertNonEmpty(refiners, "Validator.ensure expected a non-empty Array of refiners");
    
    for (let i = 0; i < refiners.length; i++) {
        if ((INTERNAL_getValidator(refiners[i]!))(val)) return val as any;
    }

    if (getDefaultVal) return getDefaultVal(val);
    throw new Error(generateErrMsg(val));
}