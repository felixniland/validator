import type { GetterOr, GetValidatorReturn, NullOr, ValidatorFn, ValIden } from "felixtypes";
import { isValIden } from "../../labels/index.js";
import { getRefiner } from "../../refine/index.js";
import { getErrMsg } from "../get/getErrMsg.js";

/**
 * TODO:
    * []: it's awkward that you can't just give it a bool... so I'd like to improve that... hmmmm...
        * e.g., from "utils/merge": ASSERT(obj, (o) => !isArr(o), "merge received an array. Incompatible. Can only merge POJOs");
        * I can't just give it "!isArr(obj)" (i.e., false)
    * []: I don't like how when you give it a condition, you call 'ASSERT(val, condition, errMsg)', whereas the others are 'ASSERT(val, errMsg, ...validators)'
    * []: (is/assert)non-nullable: move them to the appropriate folders... but I don't think they should be part of the "ValIden", given that they require a generic... so I need to create handling for that
    * []: update "ASSER"'s overloads to error if not given a condition. Right now, neither of these generate intellisense errors:
        * ASSERT(someVal)
        * ASSERT(someVal, "custom error msg")
    * []: the runtime handling does not care if the errMsg is the second call to "ASSERT", it would be cool to make the function work that way too
    * 
 */

export {
    ASSERT
};

// /** to make sure it doesn't infer "string" from the errMsg; not seeming required tho... */
// type AlteredGetValidatorReturn<T> = T extends (ValIden | ValidatorFn<any>) ? GetValidatorReturn<T> : never;

function ASSERT<T>(v: unknown, ...refiners: Array<ValidatorFn<T, any>>): asserts v is T;
function ASSERT<T>(v: unknown, errMsg: string, refiners: ValidatorFn<T, any>): asserts v is T;
function ASSERT<T>(v: unknown, condition: GetterOr<boolean, unknown>, errMsg?: string): asserts v is T;
function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...refiners: VType): asserts v is GetValidatorReturn<VType[number]>;
function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, errMsg: string, ...refiners: VType): asserts v is GetValidatorReturn<VType[number]>;
function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...errMsgAndOrRefiners: VType): asserts v is GetValidatorReturn<VType[number]>;
/**
 * Asserts that a value meets at least one of the provided conditions.
 *
 * @param v - The value to validate
 * @param errMsg - to include a custom error message string, it must be the SECOND argument
 * @param errMsg - if no custom message is provided, and 1+ ValIden are provided, they generate the default errorMessage: `expected {valIdens.join(", or")}}`
 * @param errMsg - if no ValIdens are provided, default is: "asserter received incorrect type"
 * @param conditions boolean | (v?: typeof v) => boolean | {@link ValIden} | Typeguard
 * @throws error when no condition is met
 * @throws error when no conditions are received
 *
 * @example
 * ASSERT(user, isObj); // throws "expected object"
 * ASSERT(user, "obj"); // throws "expected object"
 * ASSERT(value, (v) => v > 0, "Value must be positive"); // INCORRECT: custom errMsg must be the second argument
 * ASSERT(value, "Value must be positive", (v) => v > 0); // CORRECT: custom errMsg is second argument
 * ASSERT(data, "Invalid data", "str", "num"); // if condition is not met, will throw "Invalid data"
 * ASSERT(data, "str", "num"); // if condition is not met, will throw "expected string, or number"
 */
function ASSERT<T>(
    v: unknown,
    errMsgOrRefiner?: string | GetterOr<boolean, unknown> | ValidatorFn<any, unknown>,
    errMsg?: string | ValidatorFn<any, unknown>,
    ...extraRefiners: Array<ValIden | ValidatorFn<any, unknown>>
): asserts v is T {
    /** was a validator of some sort provided? */
    let sawValidator: boolean = false;

    /** has 'v' passed someCondition? */
    let pass: boolean = false;

    /** a custom errMsg from the user */
    let customErrMsg: NullOr<string> = null;

    const updateCustomErrMsg = (s: string): void => {
        if (customErrMsg) throw new Error("customErrMsg has already been set! You can only provide one custom err msg. You silly poo!");
        customErrMsg = s;
    }

    const combined = [
        errMsgOrRefiner,
        errMsg,
        extraRefiners
    ]
        .flat() satisfies Array<string | GetterOr<boolean> | ValidatorFn<any, any> | undefined>;

    loopDeLoop: for (let i = 0; i < combined.length; i++) {
        const entry = combined[i];
        
        switch(true) {
            case (typeof entry === "string"):
                /** isValIden ? push the resolved refiner to the end of the array : set it as the customErrMsg */
                if (isValIden(entry)) combined.push(getRefiner(entry));
                else updateCustomErrMsg(entry);
                continue loopDeLoop;
            
            case (typeof entry === "boolean"):
                sawValidator = true;
                if (!entry) continue loopDeLoop;
                pass = true;
                break loopDeLoop;

            case (typeof entry === "function"):
                sawValidator = true;
                if (!entry(v)) continue loopDeLoop;
                pass = true;
                break loopDeLoop;

            case (typeof entry === "undefined"):
                continue loopDeLoop;

            default:
                entry satisfies never;
                throw new Error("ASSERT - unhandled entry in Array<refiners>");
        }
    }

    if (pass) return;

    if (!sawValidator) throw new Error("ASSERT received no validators");
    
    throw new Error(customErrMsg || getErrMsg(...combined.filter(isValIden)));
}