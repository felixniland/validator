import { DEV } from "esm-env";
import type { Compute, NonEmptyArr, NullOr, ReadonlyNonEmptyArr, ReverseMap } from "felixtypes";
import { INTERNAL_getValidator } from "../internal/index.js";
import { _INTERNAL_GET_IS_IDEN } from "../is/getIsValidator.js";
import * as IS from "../is/index.js";
import { isCoreValIden } from "../labels/index.js";
import { INTERNAL_REGISTRY } from "../mgr/index.js";
import { newPrimValidator } from "../prim/index.js";
import type { GetValidatorReturn, ValidatorFn, ValIden } from "../types.js";

export {
    getRefiner
};

type FnIden = keyof typeof FN_IDEN_TO_VAL_IDEN;

/** Map concatenated strings of multiple ValIden => a single function */
const IDEN_GROUP_CACHE = new Map<string, (v: unknown) => v is unknown>();

/** get 'allValidators' by removing 'mapHasKey', and then convert them to a Set */
const FN_IDEN_TO_VAL_IDEN = reverseLookup(_INTERNAL_GET_IS_IDEN);
const isFnIden = newPrimValidator(Object.keys(FN_IDEN_TO_VAL_IDEN) as NonEmptyArr<FnIden>);
function assertFnIden(v: unknown): asserts v is FnIden {
    if (isFnIden(v)) return;
    throw new Error(`expected FnIden, received: ${v}`);
}

const VALIDATOR_TO_VAL_IDEN_MAP = new Map<ValidatorFn<any, any>, ValIden>();

const { mapHasKey, ...rest} = IS;

for (const [iden, validator] of Object.entries(rest)) {
    assertFnIden(iden);
    const valIden = FN_IDEN_TO_VAL_IDEN[iden];
    VALIDATOR_TO_VAL_IDEN_MAP.set(validator, valIden);
}

/**
 * @returns ValIden | undefined, if the given fn maps DIRECTLY to a ValIden
 * 
 * i.e., it must be this lib's "isStr"; an equivalent fn will return 'undefined'
 * @emits console.warn IN DEV if true, providing the ValIden
 * @usage to enable caching of requests with multiple validators, it is preferable to use the ValIden;
 * (functions are not cached, to avoid interfering with their garbage collection)
*/
function validatorIsFromThisLib(fn: ValidatorFn<any, any>): ValIden | undefined {
    // throw new Error("TODO - needs to check the Mgr as well");
    const maybeIden = VALIDATOR_TO_VAL_IDEN_MAP.get(fn) satisfies ValIden | undefined;
    if (maybeIden && DEV) console.warn(`the function for ValIden "${maybeIden}" was passed directly: prefer passing the ValIden to enable caching`);
    return maybeIden;
}

/**
 * TODO: "isRelatedRefiner" validator fn - see notes below
    * []: it has the BrandedTypes in the "object" Array, which is incorrect!
 * NTS: stopped exporting 'getRefiner', since inevitably wherever it's used - i.e., Match, Opt - there is typecasting anyway, so just using 'getRefiner' is fine :)
*/

/**
 * @param refiners spread array of (a) {@link CoreValIden} and/or (b) TypeGuard functions that take "v: unknown"
 * @returns a Typeguard function that amalgamates "refiners"
 * @throws if provided "refiners" is empty
 * @usage note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean" (and you will get an intellisense error from me)
 * see also {@link getRelatedRefiner}, which takes a type for "V", and only accepts ValIdens/Typeguards that narrow that type
 * @example 'getRefiner("str")' returns '(v: unknown) => v is string'
 * @example 'getRefiner((o): o is Date => o instance of Date))' returns '(o: unknown) => o is Date'
 * @example 'getRefiner("str", (o): o is Date => o instance of Date))' returns '(o: unknown) => o is string | Date'
 * @usage internally, caches the 'combined' ValidatorFn generated from requests that contain 2+ ValIdens
 * @emits console.warn in div when (a) a ValIden is passed multiple times, or (b) a fn from this lib is passed, rather than its ValIden
 * @usage due to caching, the refiners are NOT guaranteed to be checked in the same order you provided them; so do not expect it to operate like a switch; only group validators when your code works with 'the returned value is any of these refined types'
*/
function getRefiner<const T, const VType extends ReadonlyNonEmptyArr<ValIden | ValidatorFn<any, T>>>(
    ...refiners: VType
): (v: unknown) => v is GetValidatorReturn<VType[number]> {
    if (!refiners.length) throw new Error("getRefiner requires a non-empty Array of arguments");

    /** keep a Set of ValIdens as we loop thru 'refiners', so that: (a) we can cache and combine them all if there are > 1, and (b) we can emit console.warn if there are duplicates */
    const valIdens = new Set<ValIden>();

    const addToValIdensAndDevWarnOnDuplicate = (iden: ValIden): void => {
        if (valIdens.has(iden)) {
            DEV && console.warn(`this ValIden was passed more than once to validator.getRefiner: "${iden}"`);
            return;
        }

        valIdens.add(iden);
    }

    /** gather fns (as opposed to ValIdens) as we go, and then add the ValIdens */
    const validatorArr: Array<ValidatorFn<any, any>> = [];

    for (const r of refiners) {
        /** we do 'isValIden' in its two parts to avoid import order issues */
        if (isCoreValIden(r)) {
            addToValIdensAndDevWarnOnDuplicate(r);
            continue;
        }

        if (INTERNAL_REGISTRY.isRegisteredValIden(r)) {
            addToValIdensAndDevWarnOnDuplicate(r);
            continue;
        }

        /** check if the validator is from this lib, and if so, convert it to its iden so it can be cached and combined; otherwise, add it to 'validatorArr' directly */
        const maybeIden = validatorIsFromThisLib(r);
        if (maybeIden) {
            if (valIdens.has(maybeIden)) {
                DEV && console.warn(`this ValIden was passed more than once to validator.getRefiner: "${maybeIden}"`);
                continue;
            }

            valIdens.add(maybeIden satisfies ValIden);
        } else {
            validatorArr.push(r satisfies ValidatorFn<T, any>);
        }
    }

    /** if there are any ValIdens, get the fn; plus that helper handles all the caching, etc, etc, etc */
    const maybeFn = getValidatorFnFromValIdens(valIdens);
    maybeFn && validatorArr.push(maybeFn);
    
    return function validator(v: unknown): v is GetValidatorReturn<VType[number]> {
        return validatorArr.some((validator) => validator(v));
    }
}

// NTS: this is separate, rather than using 'getOrInsertComputed', because that method does not exist in all Node versions, so 'build-time' calls will throw
/**
 * @param valIdens Set<ValIden>
 * @returns null if (set.size === 0)
 * @returns the related validator if (set.size === 1)
 * @returns the cached function for the combined ValIden, or generates the new one and adds it to the Map
*/
function getValidatorFnFromValIdens(valIdens: Set<ValIden>): NullOr<ValidatorFn<unknown, unknown>> {
    if (valIdens.size === 0) return null;
    if (valIdens.size === 1) {
        for (const iden of valIdens) return _getValidatorFromValIden(iden);
    }

    const iden = Array.from(valIdens).toSorted().join("-");
    
    const extant = IDEN_GROUP_CACHE.get(iden);
    if (extant) return extant;

    const validatorArr: Array<ValidatorFn<any, any>> = [];
    
    for (const v of valIdens) {
        validatorArr.push(_getValidatorFromValIden(v));
    }
    
    const validatorFn = (v: unknown): v is unknown => validatorArr.some((fn) => fn(v));

    IDEN_GROUP_CACHE.set(iden, validatorFn);
    
    return validatorFn;
}

/** trusts that the value given to it is a trusted ValIden, and returns it from the internal source / REGISTRY as appropriate */
function _getValidatorFromValIden(iden: ValIden): ValidatorFn<any, any> {
    if (isCoreValIden(iden)) return INTERNAL_getValidator(iden);
    return INTERNAL_REGISTRY.getValidator(iden);
}













// /**
//  * @throws if provided "refiners" is empty
//  * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: T"
//  * @returns a Typeguard function that amalgamates "refiners"
//  * see also {@link getRefiner}, which does not take a type for V (returns "v: unknown: v is...")
//  * @example 'getRefiner<string>()("dateStr", "digitStr")' returns '(v: string) => v is DateStr | DigitStr'
// */
// function getRelatedRefiner<const T>(v?: T) {
//     return function provideRefiners<const RType extends T, const VType extends ReadonlyNonEmptyArr<RelatedValidators<T> | ValidatorFn<RType, T>>>(
//         ...refiners: VType
//     // @ts-expect-error(TODO: it is technically correct in that, e.g., "string does not extend Pokemon"; but in runtime, the value IS a Pokemon, and it's just loosely-typed as a "string", hence we are narrowing... so I'm not sure what the best practice is here)
//     ): (v: T) => v is GetRelatedValidatorReturn<T, RType, VType> {
//         return getRefiner(...refiners as a ny);
//     }
// }









// // COPIED FROM UTILS, usd only to generate the reverseLookup above for the "fnIden" validation
function reverseLookup<const T extends Record<PropertyKey, PropertyKey>>(obj: T): Compute<ReverseMap<T>> {
    const seen = new Set<PropertyKey>();

    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => {
            if (seen.has(v)) throw new Error(`reverseMap does not have unique keys: key ${String(v)} has already been seen`);
            seen.add(v);
            return [v, k]
        })
    ) as any;
}

// /**
//  * copied from "UTILS" so that I can make this "ALL_RELATED_REFINERS", the purpose of which is to make an "isRelatedRefiner" validator
//  * what is missing is that it's obviously quite broad
//     * I want to expand the 'K' of the Record to have, e.g., "arr"
//         * and I call "isArr" before I call "isRelatedRefiner", so I can know which key of the "ALL_RELATED_REFINERS" to call :)
// */
// type EnsureAllMembers<Union extends NonSymbolPrim, Arr extends ReadonlyArray<Union>> = 
// 	[Union] extends [Arr[number]] 
// 		? [Arr[number]] extends [Union] 
// 			? Arr 
// 			: never
// 	: `Missing members in array: ${Exclude<Union, Arr[number]>}`

// function allOf<Union extends NonSymbolPrim>() {
// 	return function<const Arr extends ReadonlyArray<Union>>(
// 		arr: Arr & EnsureAllMembers<Union, Arr> & NoDuplicatesAllowed<Arr>
// 	): Arr {
//         return arr as Arr;
// 	};
// }

// type JsTypes = "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";

// /** my bespoke relatedValidators for each type... */

// type RelatedStr = Exclude<RelatedValidators<string>, "nonNullable">;
// type RelatedBigInt = Exclude<RelatedValidators<bigint>, "nonNullable">;
// type RelatedBool = Exclude<RelatedValidators<boolean>, "nonNullable">;
// type RelatedFn = Exclude<RelatedValidators<Function>, "nonNullable">;
// type RelatedSymbol = Exclude<RelatedValidators<symbol>, "nonNullable">;
// type RelatedUndef = Exclude<RelatedValidators<undefined>, "nonNullable">;
// type RelatedNumber = Exclude<RelatedValidators<number>, "nonNullable">;
// /** unchanged */
// type RelatedObj = Exclude<RelatedValidators<object>, "v4UUID">;

// // @ts-expect-error(6133 - no unused locals)
// const ALL_RELATED_REFINERS = {
//     "string": allOf<RelatedStr>()(["dateStr", "digitStr", "str", "v4UUID", "stringable", "special"]),
//     "bigint": allOf<RelatedBigInt>()(["bigint", "stringable"]),
//     "boolean": allOf<RelatedBool>()(["bool", "true", "false", "stringable"]),
//     "function": allOf<RelatedFn>()(["asyncFn", "fn", "obj"]),
//     "object": allOf<RelatedObj>()(["nonEmpty", "weakSet", "weakMap", "ul", "svelteSet", "svelteMap", "set", "regExp", "promise", "ol", "obj", "node", "map", "listItem", "listEl", "inputEl", "headingEl", "htmlEl", "formEl", "fn", "err", "el", "dateStr", "date", "contentEditable", "blockEl", "asyncFn", "arrUndef", "arrStr", "arrObj", "arrNum", "arrNull", "arrFn", "arrBool", "arrArr", "arr", "textNode", "emptyTextNode", "BR", "span", "voidEl", "nonNullable"]), // "nonEmpty"
//     "symbol": allOf<RelatedSymbol>()(["symbol"]),
//     "undefined": allOf<RelatedUndef>()(["undef", "stringable"]),
//     "number": allOf<RelatedNumber>()(["boolNum", "compNum", "num", "stringable"]),
// } as const satisfies {
//     [K in JsTypes]: ReadonlyArray<ValIden>;
// };