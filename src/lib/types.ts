import type { BoolNum, Compute, FnInOut, MakeBrandedType, NonEmptyArr, NumKey, PrimitiveBase, VoidElement } from "felixtypes";
import type { SvelteMap, SvelteSet } from "svelte/reactivity";
import { CORE_VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
import type { VALIDATOR_REGISTRY } from "./mgr/index.js";

/**
 * TODO:
    * []: "WithInput_GetRelatedValidatorReturn" needs to maintain 'object' type, the way it retains 'arr', 'set', etc...
    * []: TODOs from felixTypes...:
        * 16/01: changed the final line in "GetRelatedValidatorReturn"
            * PREV: = WithInput_GetValidatorReturn<T, VType[number]> extends T ? WithInput_GetValidatorReturn<T, VType[number]> : never
            * NEW: WithInput_GetValidatorReturn<T, VType[number]>
            * what would happen is, when a refiner was used that was broader than the type that triggered it - e.g., "KeyStr" was given "str" => the return type would be "NEVER", since "str (i.e., string)" doesn't extend KeyStr... except, like, it does lol
            * so the idea is that as long as the "RelatedValidators" is accurate, this is accurate too
 */

export type {
    // GetPrettyValIden,
    AllowsDirectComparison,
    ContentEditableElement,
    CorePrettyValIden,
    CoreValIden,
    DateStr,
    DigitStr,
    ExtractValIden,
    GetRelatedValidatorReturn,
    GetValidatorReturn,
    HTMLListElement,
    InferValidatedType,
    PrettyValIden,
    RelatedValidators,
    ReturnInputOrValType,
    Stringable,
    V4UUID,
    ValidatorExtendsT,
    ValidatorFn,
    ValIden
};

// type GetPrettyValIden<I extends ValIden> = typeof VAL_IDEN_TO_PRETTY_MAP[I];
/** a "pretty" validator iden for use in public error messages */
type CorePrettyValIden = typeof CORE_VAL_IDEN_TO_PRETTY_MAP[CoreValIden];
type PrettyValIden = Compute<CorePrettyValIden | VALIDATOR_REGISTRY[keyof VALIDATOR_REGISTRY]["pretty"]>;

type AllowsDirectComparison = Exclude<PrimitiveBase, number>;
type DigitStr = NumKey; //MakeBrandedType<NumKey, "DigitStr">;
type V4UUID = MakeBrandedType<string, "V4UUID">;
type DateStr = MakeBrandedType<string, "DateStr">;

type ContentEditableElement = Omit<HTMLElement, "contenteditable"> & {
    isContentEditable: true;
}

type HTMLListElement = HTMLUListElement | HTMLOListElement;

type Stringable = Exclude<PrimitiveBase, symbol>;

/** provides the return type for "getRelatedRefiner" */
type GetRelatedValidatorReturn<
    T,
    RType extends T,
    VType extends ReadonlyArray<RelatedValidators<T> | ValidatorFn<RType, T>>
> = WithInput_GetValidatorReturn<T, VType[number]>; // extends T ? WithInput_GetValidatorReturn<T, VType[number]> : never

/**
 * like the standard "GetValidatorReturn", but incl. an InputType, and checks for matches to it
 * used for the "getRelatedRefiner"
*/
type WithInput_GetValidatorReturn<TInputType, TRet> = 
	[TRet] extends Array<infer U> // discriminate
		? U extends ValIden
			? U extends RelatedValidators<TInputType>
                /** preserve the generic thru "nonNullable" */
                ? U extends "nonNullable"
                    ? NonNullable<TInputType>
                /** these checks for "arr", "map", and "set" are to preserve the generics if TInputType extends any of them */
                : U extends "nonEmpty"
                    ? TInputType extends Array<infer ArrType>
                        ? NonEmptyArr<ArrType>
                        : InferValidatedType<U>
                : U extends "arr"
                    ? TInputType extends Array<infer ArrType>
                        ? Array<ArrType>
                        : InferValidatedType<U>
                : U extends "map"
                    ? TInputType extends Map<infer KType, infer VType>
                        ? Map<KType, VType>
                        : InferValidatedType<U>
                : U extends "set"
                    ? TInputType extends Set<infer SetType>
                        ? Set<SetType>
                        : InferValidatedType<U>
                : InferValidatedType<U>
            : never
        : U extends ValidatorFn<infer R, TInputType> // is it a validator Fn...?
            ? R extends TInputType ? R : never // return the type IF it matches
            : never // "not validator fn" // it isn't a validtor fn ,so go away 
    : never // "does not extend arr" 

type InferValidatedType<K extends ValIden> = ValIdenToTypeMap[K];

/**
 * helper: provide a ValIden, and get the related type; or else get back to the type you entered
 * @example GetValidatorReturn<"str"> => string
 * @example GetValidatorReturn<"date"> => Date
 * @example GetValidatorReturn<number> => number
 * @example GetValidatorReturn<SomeClass> => SomeClass
 */
type GetValidatorReturn<T> = 
	[T] extends Array<infer U> // discriminate
		? U extends ValIden
			? InferValidatedType<U> // fetch the type :)
			: U extends ValidatorFn<infer R> // is it a validator Fn...?
				? R // return the type
				: U // return it directly; remember, this is answering the question ("if I put this type in my ValidatorFnMaker, what do I get back")
		: never // { "shit": true };

type ValidatorFn<Definitely extends Input, Input = unknown> = (v: Input) => v is Definitely; // NTS: typeguards must be sync, thus not using the FnInOut util

/** @return ValidatorExtendsT<T> | TExtendsValidator<T> */
type RelatedValidators<T> = Compute<ValidatorExtendsT<T> | TExtendsValidator<T>>;

/**
 * @return StdValidators which _EXTEND_ T
 * @example type ApplicableToStr = ApplicableValidator<string>; // "str" | "dateStr" | "digitStr"
 */
type ValidatorExtendsT<T> = {
	[K in ValIden]: InferValidatedType<K> extends T ? K : never
}[ValIden];

/**
 * @return StdValidators _EXTENDED BY_ T
 * @example type ApplicableToStr = ApplicableValidator<string>; // "str" | "dateStr" | "digitStr"
 */
type TExtendsValidator<T> = {
	[K in ValIden]: T extends InferValidatedType<K> ? K : never
}[ValIden];

type CoreValIdenToTypeMap = {
    blockEl: HTMLElement;
	asyncFn: FnInOut<unknown, unknown, "async">;
	str: string;
	num: number;
	compNum: number;
	digitStr: DigitStr;
	bigint: bigint;
    symbol: symbol;
	bool: boolean;
	arr: Array<unknown>;
	obj: object;
	arrStr: Array<string>;
	arrNum: Array<number>;
	arrArr: Array<Array<unknown>>;
	arrBool: Array<boolean>;
	arrFn: Array<Function>;
	arrNull: Array<null>;
	arrObj: Array<object>;
	arrUndef: Array<undefined>;
	boolNum: BoolNum;
	date: Date;
	dateStr: DateStr;
	err: Error;
	fn: Function;
	map: Map<unknown, unknown>;
	null: null;
	promise: Promise<unknown>;
	regExp: RegExp;
	set: Set<unknown>;
	true: true;
	false: false;
	undef: undefined;
	weakMap: WeakMap<WeakKey, unknown>;
	weakSet: WeakSet<WeakKey>;
	el: Element;
	htmlEl: HTMLElement;
    span: HTMLSpanElement;
	inputEl: HTMLInputElement;
	formEl: HTMLFormElement;
	contentEditable: ContentEditableElement;
	node: Node;
	svelteMap: SvelteMap<unknown, unknown>;
	svelteSet: SvelteSet<unknown>;
    ul: HTMLUListElement;
    ol: HTMLOListElement;
    listEl: HTMLUListElement | HTMLOListElement;
    listItem: HTMLLIElement;
    headingEl: HTMLHeadingElement;
    BR: HTMLBRElement;
    textNode: Text;
    emptyTextNode: Text;
    v4UUID: V4UUID;
    voidEl: VoidElement;
    nonNullable: NonNullable<unknown>;
    stringable: Stringable
    nonEmpty: Array<unknown>;
    // plainObj: PlainObject;
}

/** the core map + the registered ones */
type ValIdenToTypeMap = CoreValIdenToTypeMap & {[K in keyof VALIDATOR_REGISTRY]: VALIDATOR_REGISTRY[K]["type"]};
type CoreValIden = keyof CoreValIdenToTypeMap; //"map" | "contentEditable" | "null" | "true" | "false" | "str" | "num" | "compNum" | "digitStr" | "bool" | "arr" | "obj" | "arrStr" | "arrNum" | "arrArr" | "arrBool" | "arrFn" | "arrNull" | "arrObj" | "arrUndef" | "boolNum" | "date" | "dateStr" | "err" | "fn" | "asyncFn" | "promise" | "regExp" | "set" | "undef" | "weakMap" | "weakSet" | "el" | "htmlEl" | "inputEl" | "formEl" | "node" | "svelteMap" | "svelteSet" | "ul" | "ol" | "listEl" | "listItem" | "blockEl" | "headingEl" | "bigint";
type ValIden = Compute<CoreValIden | keyof VALIDATOR_REGISTRY>;

// type IsValIden = `is${Capitalize<ValIden>}`;
// type AssertsValIden = `asserts${Capitalize<ValIden>}`;

/**
 * @param TInput
 * converts any ValIden/s within TInput to their actual type
 * @example ReturnInputOrValType<"str" | 100> // string | 100
 * @usage it's required in the Schema validators to ensure any string literals that are ValIdens are correctly handled
 * @usage even though one should implement runtime functionality to handle this, that wouldn't prevent Typescript from generating ReturnTypes that would show that ValIden string literal
 * @example { str: ["one", "two", "digitStr"] } // without this type = INCORRECT!
 * @example { str: ["one", "two", "digitStr"] } // "one" | "two" | DigitStr // CORRECT
*/
type ReturnInputOrValType<TInput> = TInput extends Array<infer Inner>
    ? ReturnInputOrValType<Inner> : ExtractValIden<TInput> extends never
        ? TInput extends ValidatorFn<infer TOutput, any>
            ? TOutput
            : TInput //ValIdenToTypeMap[ExtractValIden<TInput>] // | Exclude<TInput, ExtractValIden<TInput>>
        : ValIdenToTypeMap[ExtractValIden<TInput>] // | Exclude<TInput, ExtractValIden<TInput>>;

// type ReturnInputOrValType<TInput> = ExtractValIden<TInput> extends never ? TInput : ValIdenToTypeMap[ExtractValIden<TInput>] | Exclude<TInput, ExtractValIden<TInput>>;

type ExtractValIden<TInput> = Extract<TInput, ValIden>;