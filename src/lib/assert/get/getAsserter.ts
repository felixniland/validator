import type { ValIden, GetValidatorReturn, ValidatorFn } from "felixtypes";
import { getErrMsg } from "./getErrMsg.js";
import { INTERNAL_getValidator } from "$lib/internal/getValidator/index.js";

// this works wonderfully, but requires manually type-ing the output, per TS's asserter conditions...

/**
 * TODO:
    * []: check the 'scratchPad' to do list stuff
    * last thing = update the documentation to
        * []: remove errMsg, since it isn't in play (I may add it later tho)
        * []: explain the options they have in terms of types; i.e., manually type "Asserter", use 'at-ts-expect-err' or similar, use "sneakyAsserter"...
            * you can actually do THIS, which is just insane LOL
                * const someAsserter = getAsserter("arr", "arrStr");
                * type Asserter = typeof someAsserter;
                * const typedAsserter: Asserter = someAsserter;
                * typedAsserter("some val");
    * []: clean up the folder structure, export locations, naming of "INTERNAL_GET_VALIDATOR" into a proper "internal/..." folder, etc
    * 
 */

/**
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: unknown"
 * @returns an asserter of the amalgamated refiners
 * see also {@link getRelatedAsserter}, which takes a type for "V", and only accepts ValIdens/Typeguards that narrow that type
 * @example 'getAsserter("str")' returns '(v: unknown) => asserts v is string'
 * @example 'getAsserter((o): o is Date => o instance of Date))' returns '(o: unknown) => asserts o is Date'
 * @example 'getAsserter("str", (o): o is Date => o instance of Date))' returns '(o: unknown) => asserts is string | Date'
 * note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean" (and you will get an intellisense error from me)
 * @returns the asserter takes two arguments
 * @param v the value to be 'asserted'
 * @param errMsg {string} (OPTIONAL)
 * @param errMsg each refiner that is provided as a ValIden will be worked into the default errMsg
 * @example getAsserter("str", "num") // 'expected string, or number'
 * @example getAsserter("arr", "arrBool", "obj") // 'expected Array<unknown>, or Array<boolean>, or object'
 * @param errMsg if no errMsg is provided, and the refiners contains no ValIdens, defaults to {@link DEFAULT_ERR_MSG}
*/
function getAsserter<const VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(...refiners: VType) {
    type Asserted = GetValidatorReturn<VType[number]>;
    const defaultErrMsg = getErrMsg(...refiners as any);

    const validatorArr = refiners.map((idenOrFn) => INTERNAL_getValidator(idenOrFn));
    const refiner = (v: unknown) => validatorArr.some((validator) => (validator as any)(v));
   
    // function asserter<const TErrMsg extends string>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted {
    function asserter(v: unknown): asserts v is Asserted {
        // if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
        if (!refiner(v)) throw new Error(defaultErrMsg);
    }

    return asserter;
}

// // const tryAsserter = provideRefiners("arr"); // errors, since no type declaration
// const tryAsserter: Asserter<["arr"]> = getAsserter("arr");
// tryAsserter("some Str"); // still errors...  acn't get aroudn it... gotta declare that type YO

/**
 * provide an array of 'refiner' shorthands and/or validator functions, and it will parse it for you
 * @example```
 * type IsStarter = ((v: unknown) => v is "Charmander" | "Bulbasaur" | "Squirtle");
 * type Example = ParsedAsserter<["arrNum", "num", IsStarter]>; // (v: unknown) => asserts v is number | "Bulbasaur" | "Charmander" | "Squirtle" | number[]
 * ```
*/
type ParsedAsserter<VType extends ReadonlyArray<ValIden | ValidatorFn<any, any>>> = ReturnType<typeof getAsserter<VType>>;
/** create an asserter simply from types
 * @example```
 * type Example = AsserterFromTypeUnion<string | number>; // (v: unknown) => asserts v is string | number
 * ```
*/
type AsserterFromTypeUnion<TAsserted> = ((v: unknown) => asserts v is TAsserted);

/**
 * provide an array of validatorFns and/or refiners, or, a union of types
 * @example
 * ```
 * type IsStarter = ((v: unknown) => v is "Charmander" | "Bulbasaur" | "Squirtle");
 * type ExampleWithRefinersAndFn = Asserter<["arrNum", "num", IsStarter]>; // (v: unknown) => asserts v is number | "Bulbasaur" | "Charmander" | "Squirtle" | number[]
 * type ExampleWithUnion = Asserter<string | number>; // (v: unknown) => asserts v is string | number
 * ```
*/
type Asserter<TAsserted> = TAsserted extends ReadonlyArray<ValIden | ValidatorFn<any, any>> ? ParsedAsserter<TAsserted> : AsserterFromTypeUnion<TAsserted>;