import * as IsIndividual from "./index.js";
import type { ValIden } from "felixtypes";

/**
 * Gets the validator function for a given ValIden.
 * @param val - The ValIden to get the validator for
 * @returns The validator function
 */
const getIsValidator = <I extends ValIden>(val: I) => IsIndividual[GET_IS_IDEN[val]];

export {
    GET_IS_IDEN as _INTERNAL_GET_IS_IDEN,
    getIsValidator
}

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
    bigint: "isBigInt",
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
    symbol: "isSymbol",
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
    BR: "isBR",
    textNode: "isTextNode",
    emptyTextNode: "isEmptyTextNode",
    span: "isSpan",
    // nonNullable: "isNonNullable",
    // nonEmpty: "isNonEmpty",
} as const satisfies Record<
    ValIden,
    keyof Omit<typeof IsIndividual, "createIsIden" | "getIsValidator" | "ALL_IS">
>;