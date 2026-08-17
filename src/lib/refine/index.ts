import type { GetValidatorReturn, NoDuplicatesAllowed, RelatedValidators, ValidatorFn, ValIden, NonSymbolPrim, ReadonlyNonEmptyArr } from "felixtypes";
import { INTERNAL_getValidator } from "../internal/getValidator/index.js";
import { assertNonEmpty } from "../assert/assertNonEmpty.js";

export {
    getRefiner,
}

/**
 * TODO: "isRelatedRefiner" validator fn - see notes below
 * NTS: stopped exporting 'getRefiner', since inevitably wherever it's used - i.e., Match, Opt - there is typecasting anyway, so just using 'getRefiner' is fine :)
*/

/**
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: unknown"
 * @returns a Typeguard function that amalgamates "refiners"
 * @throws if provided "refiners" is empty
 * @usage note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean" (and you will get an intellisense error from me)
 * see also {@link getRelatedRefiner}, which takes a type for "V", and only accepts ValIdens/Typeguards that narrow that type
 * @example 'getRefiner("str")' returns '(v: unknown) => v is string'
 * @example 'getRefiner((o): o is Date => o instance of Date))' returns '(o: unknown) => o is Date'
 * @example 'getRefiner("str", (o): o is Date => o instance of Date))' returns '(o: unknown) => o is string | Date'
*/
function getRefiner<const T, const VType extends ReadonlyNonEmptyArr<ValIden | ValidatorFn<any, T>>>(
    ...refiners: VType
): (v: unknown) => v is GetValidatorReturn<VType[number]> {
    assertNonEmpty(refiners);
    const validatorArr = refiners.map(INTERNAL_getValidator);

    /** return early if they've only requested a single refiner */
    if (validatorArr.length === 1) return (validatorArr.pop()!) as ((v: unknown) => v is GetValidatorReturn<VType[number]>);
    
    return function validator(v: unknown): v is GetValidatorReturn<VType[number]> {
        return validatorArr.some((validator) => validator(v));
    }
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









/**
 * copied from "UTILS" so that I can make this "ALL_RELATED_REFINERS", the purpose of which is to make an "isRelatedRefiner" validator
 * what is missing is that it's obviously quite broad
    * I want to expand the 'K' of the Record to have, e.g., "arr"
        * and I call "isArr" before I call "isRelatedRefiner", so I can know which key of the "ALL_RELATED_REFINERS" to call :)
*/
type EnsureAllMembers<Union extends NonSymbolPrim, Arr extends ReadonlyArray<Union>> = 
	[Union] extends [Arr[number]] 
		? [Arr[number]] extends [Union] 
			? Arr 
			: never
	: `Missing members in array: ${Exclude<Union, Arr[number]>}`

function allOf<Union extends NonSymbolPrim>() {
	return function<const Arr extends ReadonlyArray<Union>>(
		arr: Arr & EnsureAllMembers<Union, Arr> & NoDuplicatesAllowed<Arr>
	): Arr {
        return arr as Arr;
	};
}

type JsTypes = "bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined";

/** my bespoke relatedValidators for each type... */

type RelatedStr = Exclude<RelatedValidators<string>, "nonNullable">;
type RelatedBigInt = Exclude<RelatedValidators<bigint>, "nonNullable">;
type RelatedBool = Exclude<RelatedValidators<boolean>, "nonNullable">;
type RelatedFn = Exclude<RelatedValidators<Function>, "nonNullable">;
type RelatedSymbol = Exclude<RelatedValidators<symbol>, "nonNullable">;
type RelatedUndef = Exclude<RelatedValidators<undefined>, "nonNullable">;
type RelatedNumber = Exclude<RelatedValidators<number>, "nonNullable">;
/** unchanged */
type RelatedObj = Exclude<RelatedValidators<object>, "v4UUID">;

const ALL_RELATED_REFINERS = {
    "string": allOf<RelatedStr>()(["dateStr", "digitStr", "str", "v4UUID", "stringable"]),
    "bigint": allOf<RelatedBigInt>()(["bigint", "stringable"]),
    "boolean": allOf<RelatedBool>()(["bool", "true", "false", "stringable"]),
    "function": allOf<RelatedFn>()(["asyncFn", "fn", "obj"]),
    "object": allOf<RelatedObj>()(["nonEmpty", "weakSet", "weakMap", "ul", "svelteSet", "svelteMap", "set", "regExp", "promise", "ol", "obj", "node", "map", "listItem", "listEl", "inputEl", "headingEl", "htmlEl", "formEl", "fn", "err", "el", "digitStr", "dateStr", "date", "contentEditable", "blockEl", "asyncFn", "arrUndef", "arrStr", "arrObj", "arrNum", "arrNull", "arrFn", "arrBool", "arrArr", "arr", "textNode", "emptyTextNode", "BR", "span", "voidEl", "nonNullable"]), // "nonEmpty"
    "symbol": allOf<RelatedSymbol>()(["symbol"]),
    "undefined": allOf<RelatedUndef>()(["undef", "stringable"]),
    "number": allOf<RelatedNumber>()(["boolNum", "compNum", "num", "stringable"]),
} as const satisfies {
    [K in JsTypes]: ReadonlyArray<ValIden>;
};