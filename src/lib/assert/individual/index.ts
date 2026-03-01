import type { ValIden, InferValidatedType, AutoCompleteStr as DefaultMsg } from "felixtypes";
import * as IsIndividual from "../../is/individual/index.js";
import { VAL_IDEN_TO_PRETTY_MAP } from "$lib/labels/index.js";

export const assertStr = getStdAsserter("str");
export const assertNum = getStdAsserter("num");
export const assertDigitStr = getStdAsserter("digitStr");
export const assertCompNum = getStdAsserter("compNum");
export const assertBool = getStdAsserter("bool");
export const assertTrue = getStdAsserter("true");
export const assertFalse = getStdAsserter("false");
export const assertObj = getStdAsserter("obj");
export const assertArr = getStdAsserter("arr");
export const assertFn = getStdAsserter("fn");
export const assertAsyncFn = getStdAsserter("asyncFn");
export const assertNull = getStdAsserter("null");
export const assertUndef = getStdAsserter("undef");

export const assertBoolNum = getStdAsserter("boolNum");
export const assertDateStr = getStdAsserter("dateStr");

export const assertArrStr = getStdAsserter("arrStr");
export const assertArrNum = getStdAsserter("arrNum");
export const assertArrBool = getStdAsserter("arrBool");
export const assertArrObj = getStdAsserter("arrObj");
export const assertArrArr = getStdAsserter("arrArr");
export const assertArrFn = getStdAsserter("arrFn");
export const assertArrNull = getStdAsserter("arrNull");
export const assertArrUndef = getStdAsserter("arrUndef");

export const assertDate = getStdAsserter("date");
export const assertElement = getStdAsserter("el");
export const assertHTMLElement = getStdAsserter("htmlEl");
export const assertFormEl = getStdAsserter("formEl");
export const assertInputEl = getStdAsserter("inputEl");
export const assertContentEditable = getStdAsserter("contentEditable");
export const assertNode = getStdAsserter("node");
export const assertUL = getStdAsserter("ul");
export const assertOL = getStdAsserter("ol");
export const assertListEl = getStdAsserter("listEl");
export const assertBlockEl = getStdAsserter("blockEl");
export const assertHeadingEl = getStdAsserter("headingEl");
export const assertListItem = getStdAsserter("listItem");

export const assertError = getStdAsserter("err");
export const assertRegExp = getStdAsserter("regExp");
export const assertMap = getStdAsserter("map");
export const assertSet = getStdAsserter("set");
export const assertWeakMap = getStdAsserter("weakMap");
export const assertWeakSet = getStdAsserter("weakSet");
export const assertPromise = getStdAsserter("promise");

export const assertSvelteSet = getStdAsserter("svelteSet");
export const assertSvelteMap = getStdAsserter("svelteMap");

export function assertNonNullable<T>(v: T): asserts v is NonNullable<T> {
    if (!IsIndividual.isNonNullable(v)) throw new Error(`v is nullable: ${v}`);
}















/************** MAKING THE ASSERTERS **************/

type GetExpectedMsg<TIden extends ValIden> = ReturnType<typeof getExpectedMsg<TIden>>;

function getExpectedMsg<const TIden extends ValIden>(iden: TIden) {
    return `expected ${VAL_IDEN_TO_PRETTY_MAP[iden]}` as const;
}

function getStdAsserter<const K extends ValIden>(type: K) {
    type Asserted = InferValidatedType<K>;

    const refiner = IsIndividual.getIsValidator(type);
    const defaultErrMsg = getExpectedMsg(type);

    function asserter<const TErrMsg extends string>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted;
    function asserter<const TErrMsg = GetExpectedMsg<K>>(v: unknown): asserts v is Asserted;
    function asserter<const TErrMsg extends DefaultMsg<GetExpectedMsg<K>>>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted {
        if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
    }

    /** 
     * a comment on every return
    */
    const ret = asserter;

    // return asserter;
    return ret;
}

// old "Asserter" type, that I no longer need due to using the overloads // type Asserter<K extends ValIden, TErrMsg extends string = DefaultMsg<GetExpectedMsg<K>>> = (v: unknown, errMsg?: TErrMsg) => asserts v is InferValidatedType<K>

// /** this is the old version of the StdAsserter, which did not allow custom errMsgs... then when I added it, the intellisense was ugly, so I rewrote it as overloaded to keep it handsome */
// // NOTE: I've copied the Asserter type in manually, as when I used it for the return type, the intellisense on the getStdAsserter's above was "const assertStr: Asserter<"str">"; doing it this way shows the proper function signature
// function getStdAsserter<const K extends ValIden>(type: K) {
//     const refiner = IsIndividual.getIsValidator(type);
//     const defaultErrMsg = getExpectedMsg(type);

//     const ret = (v: unknown, errMsg: string = defaultErrMsg) => {
//         if (!refiner(v)) throw new Error(errMsg);
//     }
    
//     // ret satisfies Asserter<K, AutoCompleteStr<GetExpectedMsg<K>>>;
//     return ret as <const TErrMsg extends string = DefaultMsg<GetExpectedMsg<K>>>(v: unknown, errMsg?: TErrMsg) => asserts v is InferValidatedType<K>;
// }s