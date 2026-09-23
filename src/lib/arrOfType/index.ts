import { getRefiner } from "../refine/index.js";
import type { GetValidatorReturn, ReadonlyNonEmptyArr, ValidatorFn, ValIden } from "felixtypes";
import { ValidatorConfig } from "../cfg/index.js";

/**
 * TODO:
    * []: asserter
    * []: documentation
    * []: 'allowVacuous' prop to override the default
*/

function isArrOfType<
    const VType extends ReadonlyNonEmptyArr<ValIden | ValidatorFn<any>>
>(
    v: unknown,
    ...refiners: VType
    // opts?: { allowVacuous: boolean }
): v is Array<GetValidatorReturn<VType[number]>> {
    // const allowVacuous = opts?.allowVacuous ?? ValidatorConfig.allowVacuous;
    // const isVacuous: ((v: unknown) => boolean) = allowVacuous ? () => false : ValidatorConfig.isVacuousArray;
    
    const refiner = getRefiner(...refiners);
    return Array.isArray(v) && !ValidatorConfig.isVacuousArray(v) && v.every(refiner);
}