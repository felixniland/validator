import { isValIden, VAL_IDEN_TO_PRETTY_MAP } from "../../labels/index.js";
import type { ValIden, ValidatorFn } from "felixtypes";

export {
    setDefaultErrMsg,
    getErrMsg,
}

let DEFAULT_ERR_MSG = "asserter received incorrect type";

/**
 * changes the defaultErrMsg from "asserter received incorrect type" to the given string
 * this function is called at the time the asserter is created, NOT each time the asserter is used; i.e., call this before creating your asserters to ensure they all have your error message
*/
function setDefaultErrMsg(s: string): void {
    DEFAULT_ERR_MSG = s;
}

/**
 * @param arr Array<ValIden | ValidatorFn<any>>
 * @returns if arr contains any ValIden, returns `expected {valIdens.join(", or ")}}`
 * @returns "asserter received incorrect type"
 * @throws if provide an empty array
*/
function getErrMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any>>>(...arr: VType): string {
    if (!arr.length) throw new Error("Validator.getErrMsg requires non-empty array");

    const expectedTypes = arr
        .map((entry) => isValIden(entry) ? VAL_IDEN_TO_PRETTY_MAP[entry] : null)
        .filter(Boolean)
        .join(", or ");

    if (!expectedTypes.length) return DEFAULT_ERR_MSG;
    return `expected ${expectedTypes}`;
}