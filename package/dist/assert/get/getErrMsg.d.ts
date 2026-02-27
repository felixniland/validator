import type { ValIden, ValidatorFn } from "felixtypes";
export { setDefaultErrMsg, getErrMsg, };
/**
 * changes the defaultErrMsg from "asserter received incorrect type" to the given string
 *
 * this function is called at the time the asserter is created, NOT each time the asserter is used; i.e., call this before creating your asserters to ensure they all have your error message
*/
declare function setDefaultErrMsg(s: string): void;
/**
 * @param arr Array<ValIden | ValidatorFn<any>>
 * @returns if arr contains any ValIden, returns `expected {valIdens.join(", or ")}}`
 * @returns "asserter received incorrect type"
*/
declare function getErrMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any>>>(...arr: VType): string;
