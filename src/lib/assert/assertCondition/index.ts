import type { ValIden, GetterOr, GetValidatorReturn, ValidatorFn } from "felixtypes";
import { isValIden } from "$lib/labels/index.js";
import { isBool, isFn, isNull, isStr, isTrue} from "$lib/is/index.js";
import { getRefiner } from "$lib/refine/index.js";
import { DEFAULT_ERR_MSG, getExpectedMsg } from "../get/utils.js";

/**
 * TODO: (is/assert)non-nullable: move them to the appropriate folders... but I don't think they should be part of the "ValIden", given that they require a generic... so I need to create handling for that
 */

export {
    ASSERT,
}

// /** to make sure it doesn't infer "string" from the errMsg; not seeming required tho... */
// type AlteredGetValidatorReturn<T> = T extends (ValIden | ValidatorFn<any>) ? GetValidatorReturn<T> : never;

function ASSERT<T>(v: unknown, ...refiners: Array<ValidatorFn<T, any>>): asserts v is T;
function ASSERT<T>(v: unknown, errMsg: string, refiners: ValidatorFn<T, any>): asserts v is T;
function ASSERT<T>(v: unknown, condition: GetterOr<boolean, unknown>, errMsg?: string): asserts v is T;
function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...refiners: VType): asserts v is GetValidatorReturn<VType[number]>;
function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, errMsg: string, ...refiners: VType): asserts v is GetValidatorReturn<VType[number]>;
function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...errMsgAndOrRefiners: VType): asserts v is GetValidatorReturn<VType[number]>;
function ASSERT<T>(
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
    const errMsgFromCaller = combined.filter((item) => isStr(item) && !isValIden(item))[0] as string | undefined;

    const finalErrMsg =
        errMsgFromCaller
        || getExpectedMsg(...valIdenArr)
        || DEFAULT_ERR_MSG;
    
    throw new Error(finalErrMsg);
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