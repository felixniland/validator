import type { ValIden, ValidatorFn, GetValidatorReturn } from "felixtypes";
export { sneakyAsserter as WIP_DO_NOT_EXPORT_sneakyAsserter, };
/**
 * @template T
 * utility to create a dynamic asserter
 * it is a known TS limitation (IMO) that you cannot create an asserter
 * "sneaky" is due to telethe fact that TS does not allow a ReturnType of "asserts val is SomeGeneric"
 * @throws if "V" does not match
*/
declare function sneakyAsserter<const T, const VType extends ReadonlyArray<ValIden | ValidatorFn<any, T>>>(...refiners: VType): (v: unknown) => GetValidatorReturn<VType[number]>;
