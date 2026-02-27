import { INTERNAL_getValidator } from "../internal/getValidator/index.js";
export { getRefiner, getRelatedRefiner, };
/**
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: unknown"
 * @returns a Typeguard function that amalgamates "refiners"
 * see also {@link getRelatedRefiner}, which takes a type for "V", and only accepts ValIdens/Typeguards that narrow that type
 * @example 'getRefiner("str")' returns '(v: unknown) => v is string'
 * @example 'getRefiner((o): o is Date => o instance of Date))' returns '(o: unknown) => o is Date'
 * @example 'getRefiner("str", (o): o is Date => o instance of Date))' returns '(o: unknown) => o is string | Date'
 * note the "Date" example above has the function annotated; TS by design does not infer typeguards, so providing that function without a return type will have it as "(o) => boolean" (and you will get an intellisense error from me)
*/
function getRefiner(...refiners) {
    const validatorArr = refiners.map((idenOrFn) => INTERNAL_getValidator(idenOrFn));
    // const validatorArr = fnsOrTypes.map((idenOrFn) => getRefiner(idenOrFn as any)); // weirdly, this changed the order of the ReturnType (but nothing else...)
    return function validator(v) {
        return validatorArr.some((validator) => validator(v));
    };
}
/**
 * @template T
 * @param refiners spread array of (a) {@link ValIden} and/or (b) TypeGuard functions that take "v: T"
 * @returns a Typeguard function that amalgamates "refiners"
 * see also {@link getRefiner}, which does not take a type for V (returns "v: unknown: v is...")
 * @example 'getRefiner<string>()("dateStr", "digitStr")' returns '(v: string) => v is DateStr | DigitStr'
*/
function getRelatedRefiner(v) {
    return function provideRefiners(...refiners
    // TODO: it is technically correct in that, e.g., "string does not extend Pokemon"; but in runtime, the value IS a Pokemon, and it's just loosely-typed as a "string", hence we are narrowing... so I'm not sure what the best practice is here
    // @ts-expect-error
    ) {
        return getRefiner(...refiners);
    };
}
