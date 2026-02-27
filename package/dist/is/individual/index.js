import { SvelteMap, SvelteSet } from "svelte/reactivity";
import * as IsIndividual from "./index.js";
export const getIsValidator = (val) => IsIndividual[GET_IS_IDEN[val]];
export const isStr = (val) => typeof val === "string";
export const isNum = (val) => typeof val === "number";
/** returns if the given value is a comparable (i.e., finite) number */
export const isCompNum = (val) => (typeof val === "number") && Number.isFinite(val);
export const isBool = (val) => typeof val === "boolean";
export const isTrue = (val) => typeof val === "boolean" && val === true;
export const isFalse = (val) => typeof val === "boolean" && val === false;
export const isObj = (val) => typeof val === "object" && val !== null;
export const isFn = (val) => typeof val === "function";
// export const isAsyncFn = (val: unknown): val is FnInOut<unknown | undefined, unknown, "async"> => typeof val === "function" && val instanceof Object.getPrototypeOf(async function(){}).constructor;
export const isAsyncFn = (val) => typeof val === "function" && val instanceof Object.getPrototypeOf(async function () { }).constructor;
export const isNull = (val) => val === null;
export function isNonNullable(v) {
    if (isNull(v))
        return false;
    if (v === undefined)
        return false;
    return true;
}
export const isUndef = (val) => typeof val === "undefined";
export const isDigitStr = (val) => {
    if (!isStr(val))
        return false;
    for (const char of val) {
        // regex // /^[0-9]$/.test(str);
        if (false === (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)))
            return false;
        // the below would error on " " (space), Number(space) === 0. d'oh!
        // const num = Number(char);
        // const isComparable = isCompNum(num);
        // if (!isComparable) return false;
    }
    return true;
};
export const isBoolNum = (val) => isNum(val) && (val === 0 || val === 1);
export const isDateStr = (val) => isStr(val) && !Number.isNaN(Date.parse(val));
export const isArr = (val) => Array.isArray(val);
export const isArrStr = (val) => Array.isArray(val) && val.every(isStr);
export const isArrNum = (val) => Array.isArray(val) && val.every(isNum);
export const isArrBool = (val) => Array.isArray(val) && val.every(isBool);
export const isArrObj = (val) => Array.isArray(val) && val.every(isObj);
export const isArrArr = (val) => Array.isArray(val) && val.every(isArr);
export const isArrFn = (val) => Array.isArray(val) && val.every(isFn);
export const isArrNull = (val) => Array.isArray(val) && val.every(isNull);
export const isArrUndef = (val) => Array.isArray(val) && val.every(isUndef);
export const isDate = (val) => val instanceof Date && !Number.isNaN(val.getTime());
export const isElement = (val) => val instanceof Element;
export const isHtmlEl = (val) => val instanceof HTMLElement;
export const isFormEl = (val) => val instanceof HTMLFormElement;
export const isInputEl = (val) => val instanceof HTMLInputElement;
export const isContentEditable = (val) => val instanceof HTMLElement && val.isContentEditable;
export const isNode = (val) => val instanceof Node;
export const isUL = (val) => isElement(val) && val.tagName === "UL";
export const isOL = (val) => isElement(val) && val.tagName === "OL";
export const isListEl = (val) => isUL(val) || isOL(val);
export const isBlockEl = (val) => {
    if (!isHtmlEl(val))
        return false;
    // TODO: this list is not exhaustive, and also does not take into account "display: block", and so on
    return (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DIV', 'BLOCKQUOTE', 'LI']).includes(val.tagName);
};
export const isHeadingEl = (val) => {
    if (!isHtmlEl(val))
        return false;
    // TODO: this list is not exhaustive, and also does not take into account "display: block", and so on
    return (['H1', 'H2', 'H3', 'H4', 'H5', 'H6']).includes(val.tagName);
};
export const isListItem = (val) => isElement(val) && val.tagName === "LI";
export const isError = (val) => val instanceof Error;
export const isRegExp = (val) => val instanceof RegExp;
export const isMap = (val) => val instanceof Map;
export const isSet = (val) => val instanceof Set;
export const isWeakMap = (val) => val instanceof WeakMap;
export const isWeakSet = (val) => val instanceof WeakSet;
export const isPromise = (val) => val instanceof Promise;
export const isSvelteSet = (val) => val instanceof SvelteSet;
export const isSvelteMap = (val) => val instanceof SvelteMap;
const GET_IS_IDEN = {
    arr: "isArr",
    arrArr: "isArrArr",
    arrBool: "isArrBool",
    arrFn: "isArrFn",
    arrNull: "isArrNull",
    arrNum: "isArrNum",
    arrObj: "isArrObj",
    arrStr: "isArrStr",
    arrUndef: "isArrUndef",
    asyncFn: "isAsyncFn",
    bool: "isBool",
    boolNum: "isBoolNum",
    compNum: "isCompNum",
    contentEditable: "isContentEditable",
    date: "isDate",
    dateStr: "isDateStr",
    digitStr: "isDigitStr",
    el: "isElement",
    err: "isError",
    false: "isFalse",
    fn: "isFn",
    formEl: "isFormEl",
    htmlEl: "isHtmlEl",
    inputEl: "isInputEl",
    map: "isMap",
    node: "isNode",
    null: "isNull",
    num: "isNum",
    obj: "isObj",
    promise: "isPromise",
    regExp: "isRegExp",
    set: "isSet",
    str: "isStr",
    svelteMap: "isSvelteMap",
    svelteSet: "isSvelteSet",
    true: "isTrue",
    undef: "isUndef",
    weakMap: "isWeakMap",
    weakSet: "isWeakSet",
    ul: "isUL",
    ol: "isOL",
    listEl: "isListEl",
    blockEl: "isBlockEl",
    listItem: "isListItem",
    headingEl: "isHeadingEl",
};
