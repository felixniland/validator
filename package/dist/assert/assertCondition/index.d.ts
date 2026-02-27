import type { ValIden, GetterOr, GetValidatorReturn, ValidatorFn } from "felixtypes";
/**
 * TODO:
    * []: (is/assert)non-nullable: move them to the appropriate folders... but I don't think they should be part of the "ValIden", given that they require a generic... so I need to create handling for that
    * []: update "ASSER"'s overloads to error if not given a condition. Right now, neither of these generate intellisense errors:
        * ASSERT(someVal)
        * ASSERT(someVal, "custom error msg")
    * []: the runtime handling does not care if the errMsg is the second call to "ASSERT", it would be cool to make the function work that way too
    *
 */
export { ASSERT, };
declare function ASSERT<T>(v: unknown, ...refiners: Array<ValidatorFn<T, any>>): asserts v is T;
declare function ASSERT<T>(v: unknown, errMsg: string, refiners: ValidatorFn<T, any>): asserts v is T;
declare function ASSERT<T>(v: unknown, condition: GetterOr<boolean, unknown>, errMsg?: string): asserts v is T;
declare function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...refiners: VType): asserts v is GetValidatorReturn<VType[number]>;
declare function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, errMsg: string, ...refiners: VType): asserts v is GetValidatorReturn<VType[number]>;
declare function ASSERT<VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...errMsgAndOrRefiners: VType): asserts v is GetValidatorReturn<VType[number]>;
