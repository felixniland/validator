import { SvelteMap, SvelteSet } from "svelte/reactivity";
import { isComparableNumber } from "../../internal/index.js";
import * as IsIndividual from "./index.js";
import type { ValIden } from "$lib/index.js";
import type { FiniteNumber, FnInOut, DigitStr, BoolNum, DateStr, ContentEditableElement } from "$lib/internal/types.js";

export const getIsValidator = <I extends ValIden>(val: I) => IsIndividual[GET_IS_IDEN[val]];

export const isStr = (val: unknown): val is string => typeof val === "string";
export const isNum = (val: unknown): val is number => typeof val === "number";
export const isCompNum = (val: unknown): val is FiniteNumber => isComparableNumber(val); // Assumes NumValidator exists
export const isBool = (val: unknown): val is boolean => typeof val === "boolean";
export const isTrue = (val: unknown): val is true => typeof val === "boolean" && val === true;
export const isFalse = (val: unknown): val is false => typeof val === "boolean" && val === false;
export const isObj = (val: unknown): val is object => typeof val === "object" && val !== null;
export const isArr = (val: unknown): val is Array<unknown> => Array.isArray(val);
export const isFn = (val: unknown): val is Function => typeof val === "function";
export const isAsyncFn = (val: unknown): val is FnInOut<any, any, "async"> => typeof val === "function" && val instanceof Object.getPrototypeOf(async function(){}).constructor;
export const isNull = (val: unknown): val is null => val === null;
export const isUndef = (val: unknown): val is undefined => typeof val === "undefined";

export const isDigitStr = (val: unknown): val is DigitStr => {
	if (!isStr(val)) return false;
	for (const char of val) {
		const num = Number(char);
		const isComparable = isCompNum(num);
		if (!isComparable) return false;
	}
	return true;
};
export const isBoolNum = (val: unknown): val is BoolNum => isNum(val) && (val === 0 || val === 1);
export const isDateStr = (val: unknown): val is DateStr => isStr(val) && !Number.isNaN(Date.parse(val));

export const isArrStr = (val: unknown): val is Array<string> => Array.isArray(val) && val.every(isStr);
export const isArrNum = (val: unknown): val is Array<number> => Array.isArray(val) && val.every(isNum);
export const isArrBool = (val: unknown): val is Array<boolean> => Array.isArray(val) && val.every(isBool);
export const isArrObj = (val: unknown): val is Array<object> => Array.isArray(val) && val.every(isObj);
export const isArrArr = (val: unknown): val is Array<Array<unknown>> => Array.isArray(val) && val.every(isArr);
export const isArrFn = (val: unknown): val is Array<Function> => Array.isArray(val) && val.every(isFn);
export const isArrNull = (val: unknown): val is Array<null> => Array.isArray(val) && val.every(isNull);
export const isArrUndef = (val: unknown): val is Array<undefined> => Array.isArray(val) && val.every(isUndef);

export const isDate = (val: unknown): val is Date => val instanceof Date && !Number.isNaN(val.getTime());
export const isElement = (val: unknown): val is Element => val instanceof Element;
export const isHtmlEl = (val: unknown): val is HTMLElement => val instanceof HTMLElement;
export const isFormEl = (val: unknown): val is HTMLFormElement => val instanceof HTMLFormElement;
export const isInputEl = (val: unknown): val is HTMLInputElement => val instanceof HTMLInputElement;
export const isContentEditable = (val: unknown): val is ContentEditableElement => val instanceof HTMLElement && val.isContentEditable;
export const isNode = (val: unknown): val is Node => val instanceof Node;

export const isError = (val: unknown): val is Error => val instanceof Error;
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp;
export const isMap = (val: unknown): val is Map<unknown, unknown> => val instanceof Map;
export const isSet = (val: unknown): val is Set<unknown> => val instanceof Set;
export const isWeakMap = (val: unknown): val is WeakMap<object, unknown> => val instanceof WeakMap;
export const isWeakSet = (val: unknown): val is WeakSet<object> => val instanceof WeakSet;
export const isPromise = (val: unknown): val is Promise<unknown> => val instanceof Promise;

export const isSvelteSet = (val: unknown): val is SvelteSet<any> => val instanceof SvelteSet;
export const isSvelteMap = (val: unknown): val is SvelteMap<any, any> => val instanceof SvelteMap;

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
} as const satisfies Record<ValIden, IsKey>;

export type GET_IS_IDEN = typeof GET_IS_IDEN;

// NOT EXPORTED
type IsKey = keyof Omit<typeof IsIndividual, "createIsIden" | "getIsValidator" | "ALL_IS">;