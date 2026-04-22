import { isVacuousArray } from "$lib/internal/index.js";
import type { Alpha } from "felixtypes";

// this old version of "isAlpha" only works with English // const isAlpha = (str: string): str is Alpha => str.length === 1 && /^[a-zA-Z]$/.test(str);
/**
 * @param str a string of any length
 * @returns boolean representing if the string is an alpha
 * NOTE:
 * - the "Alpha" type used is only the English alphabet in both upper & lowercase;
 * - however, this will actually return for all alphabet characters (i.e., Greek, Russian...)
 * - internally, it compares (for each char of the string) "does uppercase === lowercase", thus returning FALSE for numbers, emojis, etc
 */
export const isAlpha = (str: string): str is Alpha => {
    const arr = [...str];
    return !isVacuousArray(arr) && arr.every((s) => s.toUpperCase() !== s.toLowerCase());
};