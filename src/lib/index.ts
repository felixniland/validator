import { getIsValidator } from "./is/individual/index.js";
import { isValIden, PRETTY_STR_MAP } from "./labels/index.js";
import type { Compute } from "./internal/types.js";
import * as IsIndividual from "./is/individual/index.js";

/**
 * TODO: am I exporting "GET_IS_IDEN"? the Type? cuz I do not want to
 */

export * from "./is/index.js"
export * from "./assert/index.js"
export * from "./instanceOf/index.js";
export * from "./str/index.js";
export * from "./kb/index.js";
export { isValIden, PRETTY_STR_MAP } from "./labels/index.js";

export {
    getRefiner,
}

export type {
    ValidatorFn,
    ValIden,
    PrettyValIden,
    IsValIden,
    AssertsValIden,
    InferValidatedType,
    GetPrettyValIden,
    RelatedValidators,
    GetValidatorReturn,
}

type GetPrettyValIden<I extends ValIden> = typeof PRETTY_STR_MAP[I];

type ValIden = keyof typeof PRETTY_STR_MAP;

/** a "pretty" validator iden for use in public error messages */
type PrettyValIden = typeof PRETTY_STR_MAP[ValIden];

type IsValIden = `is${Capitalize<ValIden>}`;
type AssertsValIden = `asserts${Capitalize<ValIden>}`;

type InferValidatedType<K extends ValIden> = 
    typeof IsIndividual[IsIndividual.GET_IS_IDEN[K]] extends (val: unknown) => val is infer T 
        ? T 
        : never;

// type TEST_InferValidated = InferValidatedType<"arr">; // unknown[]
// type TEST_InferValidated = InferValidatedType<"str">; // string
// type TEST_InferValidated = InferValidatedType<"el">; // string // unknown
// type TEST_MakeIsIden = IsIndividual.MakeIsIden<"el">; // never

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

type ValidatorFn<Definitely extends Input, Input = unknown> = (obj: Input) => obj is Definitely; // NTS: typeguards must be sync, thus not using the FnInOut util

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
	[K in ValIden]: T extends InferValidatedType<K>  ? K : never
}[ValIden];

/**
 * @returns a validatorFn if given one
 * @returns the related validatorFn if given a StdValidator
 * {@link getRelatedRefiner} to create a validatorFn from a list of StdValidator keys that extend T
 * @param type a {@ilnk StdValidator}, or a validator function
 * @example 'getRefiner("str")' returns '(v: unknown) => v is string'
 * @example 'getRefiner((o): o is Date => o instance of Date))' returns '(o: unknown) => o is Date'
 * @example 'getRefiner((o: object): o is Date => o instance of Date))' returns '(o: object) => o is Date'
 * note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean", and you will get an intellisense error
 */
function getRefiner<K extends ValIden>(type: K): (v: unknown) => v is InferValidatedType<K>;
function getRefiner<T, R extends T>(validatorFn: ValidatorFn<R, T>): (v: T) => v is R;
function getRefiner<T, R extends T>(fnOrType: any): any {
	return (isValIden(fnOrType)
		? getIsValidator(fnOrType)
		: fnOrType) as ValidatorFn<R>;
}