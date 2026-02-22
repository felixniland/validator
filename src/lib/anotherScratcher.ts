import type { ValIden, GetterOr, GetValidatorReturn, NonFunction, ValidatorFn } from "felixtypes";
import { isValIden } from "./labels/index.js";
import { isBool, isFn, isNull, isTrue } from "./is/index.js";
import { getRefiner } from "./refine/index.js";
import { DEFAULT_ERR_MSG, getExpectedMsg } from "./assert/get/utils.js";

/**
 * TODO: (is/assert)non-nullable: move them to the appropriate folders... but I don't think they should be part of the "ValIden", given that they require a generic... so I need to create handling for that
 */

export {
    finalAsserter
}

function withErrMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...refiners: VType): asserts v is GetValidatorReturn<Extract<VType[number], ValIden>>;
function withErrMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, errMsg: string, ...refiners: VType): asserts v is GetValidatorReturn<Extract<VType[number], ValIden>>;
function withErrMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...errMsgOrRefiners: Array<string>): asserts v is GetValidatorReturn<Extract<VType[number], ValIden>> {
    console.warn("TODO: ensure refinerArr has length");
    errMsgOrRefiners = Array.isArray(errMsgOrRefiners) ? errMsgOrRefiners : [errMsgOrRefiners];

    const valIdenArr = errMsgOrRefiners.filter(isValIden);
    
    const refinerArr: Array<ValidatorFn<any, any>> = (errMsgOrRefiners
        .map((v) => {
            if (isFn(v)) return v;
            if (isValIden(v)) return getRefiner(v);
        })
        .filter(Boolean) as any);

    const refiner = (v: unknown) => refinerArr.some((refiner) => refiner(v));
    
    const errMsg = 
        errMsgOrRefiners.filter((v) => !isValIden(v))[0]
        || getExpectedMsg(...valIdenArr)
        || DEFAULT_ERR_MSG;
    
    if (!refiner(v)) throw new Error(errMsg);
}

function assertAsserter<const TRefined extends ValidatorFn<any, any>>(v: unknown, refiner: TRefined, errMsg?: string): asserts v is GetValidatorReturn<TRefined>;
function assertAsserter<T>(v: unknown, condition: (v: unknown) => v is T, errMsg?: string): asserts v is T;
function assertAsserter<T>(v: unknown, condition: GetterOr<boolean, unknown>, errMsg?: string): asserts v is T;
function assertAsserter<T>(v: unknown, refinerOrCondition: GetterOr<boolean, unknown>, errMsg?: string): asserts v is T {
    const pass = maybeGetter(refinerOrCondition, v);
    if (!pass) throw new Error(errMsg);
}







// /** to make sure it doesn't infer "string" from the errMsg; not seeming required tho... */
// type AlteredGetValidatorReturn<T> = T extends (ValIden | ValidatorFn<any>) ? GetValidatorReturn<T> : never;

function finalAsserter<T>(v: unknown, ...refiners: Array<ValidatorFn<T, any>>): asserts v is T;
function finalAsserter<T>(v: unknown, errMsg: string, refiners: ValidatorFn<T, any>): asserts v is T;
function finalAsserter<T>(v: unknown, condition: GetterOr<boolean, unknown>, errMsg?: string): asserts v is T;
function finalAsserter<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...refiners: VType): asserts v is GetValidatorReturn<VType[number]>;
function finalAsserter<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, errMsg: string, ...refiners: VType): asserts v is GetValidatorReturn<VType[number]>;
function finalAsserter<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...errMsgAndOrRefiners: VType): asserts v is GetValidatorReturn<VType[number]>;
function finalAsserter<T>(
    v: unknown,
    errMsgOrRefiner?: string | GetterOr<boolean, unknown> | ValidatorFn<any, unknown>,
    errMsg?: string | ValidatorFn<any, unknown>,
    ...extraRefiners: Array<ValIden | ValidatorFn<any, unknown>>
): asserts v is T {
    const combined: Array<string | GetterOr<boolean> | ValidatorFn<any, any> | undefined> = [errMsgOrRefiner, errMsg, extraRefiners].flat();
    const valIdenArr: Array<ValIden> = combined.filter(isValIden);

    /** map over any functions, val idens, and bools; for functions, run them; thus ending up with Array<bool> */
    const validated: Array<boolean> = combined.map((item) => {
        if (isFn(item)) return item(v);
        if (isValIden(item)) return getRefiner(item)(v);
        if (isBool(item)) return item;
    })
    .filter(isBool); // remove non-valIden string && undefined

    if (!validated.length) throw new Error("No valid refiner provided");
    const pass = validated.some(isTrue);
    if (pass) return;

    /** ok, now we need to throw... */
    const errMsgFromCaller = combined.filter((item) => !isValIden(item))[0] as string | undefined;
    const finalErrMsg =
        errMsgFromCaller
        || getExpectedMsg(...valIdenArr)
        || DEFAULT_ERR_MSG;
    
    throw new Error(finalErrMsg);
}















/** a copy of this function from 'utils', to avoid circular dependencies */
function maybeGetter<T extends NonFunction, Args = void>(x: GetterOr<T, Args>, args?: Args): T {
	if (typeof x !== "function") return x;
	const ret = (x as any)(args);
	return ret;
}

/** TODO... as above */
    function isNonNullable<T>(v: T): v is NonNullable<T> {
        if (isNull(v)) return false;
        if (v === undefined) return false;
        return true;
    }
    function assertNonNullable<T>(obj: T): asserts obj is NonNullable<T> {
        if (!isNonNullable(obj)) throw new Error("poo");
    }