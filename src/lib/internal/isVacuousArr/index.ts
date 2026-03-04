import { getConfig } from "$lib/cfg/index.js";
import { isArr } from "$lib/is/index.js";

/**
 * internal utlity to return if an array is vacuous, only if it's relevant to the lib's functions; i.e., returns false if vacuous arrays are allowed, since we don't care in that instance
 * @returns FALSE if getConfig().allowVacuous is true
 * @returns otherwise, returns Boolean representing 'v.length === 0'
*/
export function isVacuousArray(v: unknown): boolean {
    if (!isArr(v)) return false;
    
    return getConfig().allowVacuous
        ? false
        : v.length === 0;
}