import * as IsIndividual from "../is/individual/index.js";
import type { ValIden } from "$lib/index.js";
import type { Compute } from "$lib/internal/types.js";
import { getIsValidator } from "$lib/is/index.js";
import { isValIden } from "$lib/labels/index.js";

export {
    getRefiner,
    getRelatedRefiner,
}

export type {
    ValidatorFn,
    InferValidatedType,
    RelatedValidators,
    GetValidatorReturn,
}

/**
 * like the standard "GetValidatorReturn", but incl. an InputType, and checks for matches to it
 * used for the "getRelatedRefiner"
*/
type WithInput_GetValidatorReturn<TInputType, TRet> = 
	[TRet] extends Array<infer U> // discriminate
		? U extends ValIden
			? U extends RelatedValidators<TInputType> ? InferValidatedType<U> : never
			: U extends ValidatorFn<infer R, TInputType> // is it a validator Fn...?
				? R extends TInputType ? R : never // return the type IF it matches
				: never // "not validator fn" // it isn't a validtor fn ,so go away 
		: never // "does not extend arr" 

type InferValidatedType<K extends ValIden> = 
    typeof IsIndividual[IsIndividual.GET_IS_IDEN[K]] extends (val: unknown) => val is infer T 
        ? T 
        : never;

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
	[K in ValIden]: T extends InferValidatedType<K>  ? K : never
}[ValIden];












/**
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: unknown"
 * @returns a Typeguard function that amalgamates "refiners"
 * see also {@link getRelatedRefiner}, which takes a type for "V", and only accepts ValIdens/Typeguards that narrow that type
 * @example 'getRefiner("str")' returns '(v: unknown) => v is string'
 * @example 'getRefiner((o): o is Date => o instance of Date))' returns '(o: unknown) => o is Date'
 * @example 'getRefiner("str", (o): o is Date => o instance of Date))' returns '(o: unknown) => o is string | Date'
 * note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean" (and you will get an intellisense error from me)
*/
function getRefiner<const T, const VType extends ReadonlyArray<ValIden | ValidatorFn<any, T>>>(
    ...refiners: VType
): (v: unknown) => v is (VType[number] extends ValIden ? InferValidatedType<VType[number]> : GetValidatorReturn<VType[number]>) {
    const validatorArr = refiners.map((idenOrFn) => (isValIden(idenOrFn) ? getIsValidator(idenOrFn) : idenOrFn));
    // const validatorArr = fnsOrTypes.map((idenOrFn) => getRefiner(idenOrFn as any)); // weirdly, this changed the order of the ReturnType (but nothing else...)
    const validator = (v: unknown) => validatorArr.some((validator) => (validator as any)(v));
    return validator as any;
}















/**
 * @template T
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: T"
 * @returns a Typeguard function that amalgamates "refiners"
 * see also {@link getRefiner}, which does not take a type for V (returns "v: unknown: v is...")
 * @example 'getRefiner<string>()("dateStr", "digitStr")' returns '(v: string) => v is DateStr | DigitStr'
*/
function getRelatedRefiner<const T>() {
    return <const RType extends T, const VType extends ReadonlyArray<RelatedValidators<T> | ValidatorFn<RType, T>>>(
        ...fnsOrTypes: VType
    ) => (v: T): v is (WithInput_GetValidatorReturn<T, VType[number]> extends T ? WithInput_GetValidatorReturn<T, VType[number]> : never) => {
        const validatorArr = fnsOrTypes.map((idenOrFn) => (isValIden(idenOrFn) ? getIsValidator(idenOrFn) : idenOrFn));
        const validator = (v: unknown) => validatorArr.some((validator) => (validator as any)(v));
        return validator as any;
    }
}















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
function NOT_EXPORTED_GET_SINGLE_REFINER<K extends ValIden>(type: K): (v: unknown) => v is InferValidatedType<K>;
function NOT_EXPORTED_GET_SINGLE_REFINER<T, R extends T>(validatorFn: ValidatorFn<R, T>): (v: T) => v is R;
function NOT_EXPORTED_GET_SINGLE_REFINER<T, R extends T>(fnOrType: any): any {
	return (isValIden(fnOrType)
		? getIsValidator(fnOrType)
		: fnOrType) as ValidatorFn<R>;
}