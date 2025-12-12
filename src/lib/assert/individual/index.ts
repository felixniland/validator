import * as IsIndividual from "../../is/individual/index.js";
import { getPrettyValIden } from "../../labels/index.js";
import type { InferValidatedType, ValIden } from "../../index.js";

export type Asserter<R extends ValIden> = (v: unknown) => asserts v is InferValidatedType<R>;

export const assertStr: Asserter<"str"> = getStdAsserter("str");
export const assertNum: Asserter<"num"> = getStdAsserter("num");
export const assertDigitStr: Asserter<"digitStr"> = getStdAsserter("digitStr");
export const assertCompNum: Asserter<"compNum"> = getStdAsserter("compNum");
export const assertBool: Asserter<"bool"> = getStdAsserter("bool");
export const assertTrue: Asserter<"true"> = getStdAsserter("true");
export const assertFalse: Asserter<"false"> = getStdAsserter("false");
export const assertObj: Asserter<"obj"> = getStdAsserter("obj");
export const assertArr: Asserter<"arr"> = getStdAsserter("arr");
export const assertFn: Asserter<"fn"> = getStdAsserter("fn");
export const assertAsyncFn: Asserter<"asyncFn"> = getStdAsserter("asyncFn");
export const assertNull: Asserter<"null"> = getStdAsserter("null");
export const assertUndef: Asserter<"undef"> = getStdAsserter("undef");

export const assertBoolNum: Asserter<"boolNum"> = getStdAsserter("boolNum");
export const assertDateStr: Asserter<"dateStr"> = getStdAsserter("dateStr");

export const assertArrStr: Asserter<"arrStr"> = getStdAsserter("arrStr");
export const assertArrNum: Asserter<"arrNum"> = getStdAsserter("arrNum");
export const assertArrBool: Asserter<"arrBool"> = getStdAsserter("arrBool");
export const assertArrObj: Asserter<"arrObj"> = getStdAsserter("arrObj");
export const assertArrArr: Asserter<"arrArr"> = getStdAsserter("arrArr");
export const assertArrFn: Asserter<"arrFn"> = getStdAsserter("arrFn");
export const assertArrNull: Asserter<"arrNull"> = getStdAsserter("arrNull");
export const assertArrUndef: Asserter<"arrUndef"> = getStdAsserter("arrUndef");

export const assertDate: Asserter<"date"> = getStdAsserter("date");
export const assertElement: Asserter<"el"> = getStdAsserter("el");
export const assertHTMLElement: Asserter<"htmlEl"> = getStdAsserter("htmlEl");
export const assertFormEl: Asserter<"formEl"> = getStdAsserter("formEl");
export const assertInputEl: Asserter<"inputEl"> = getStdAsserter("inputEl");
export const assertContentEditable: Asserter<"contentEditable"> = getStdAsserter("contentEditable");
export const assertNode: Asserter<"node"> = getStdAsserter("node");
export const assertUL: Asserter<"ul"> = getStdAsserter("ul");
export const assertOL: Asserter<"ul"> = getStdAsserter("ol");
export const assertListEl: Asserter<"listEl"> = getStdAsserter("listEl");
export const assertBlockEl: Asserter<"blockEl"> = getStdAsserter("blockEl");
export const assertHeadingEl: Asserter<"headingEl"> = getStdAsserter("headingEl");
export const assertListItem: Asserter<"listItem"> = getStdAsserter("listItem");

export const assertError: Asserter<"err"> = getStdAsserter("err");
export const assertRegExp: Asserter<"regExp"> = getStdAsserter("regExp");
export const assertMap: Asserter<"map"> = getStdAsserter("map");
export const assertSet: Asserter<"set"> = getStdAsserter("set");
export const assertWeakMap: Asserter<"weakMap"> = getStdAsserter("weakMap");
export const assertWeakSet: Asserter<"weakSet"> = getStdAsserter("weakSet");
export const assertPromise: Asserter<"promise"> = getStdAsserter("promise");

export const assertSvelteSet: Asserter<"svelteSet"> = getStdAsserter("svelteSet");
export const assertSvelteMap: Asserter<"svelteMap"> = getStdAsserter("svelteMap");

/** NOT EXPORTED */

// type AssertKey = keyof Omit<typeof AssertSingle, "getAsserter">;
// type MakeAssertIden<V extends ValIden> = `assert${Capitalize<V>}` extends AssertKey ? `assert${Capitalize<V>}` : never;
// const createAssertIden = <V extends ValIden>(l: V): MakeAssertIden<V> => `assert${capitalise(l)}` as any;
// const getAsserter = <I extends ValIden>(val: I): typeof AssertSingle[MakeAssertIden<I>] => AssertSingle[createAssertIden(val)];

function getStdAsserter<const K extends ValIden>(type: K) {
    const refiner = IsIndividual.getIsValidator(type);
    const err = getPrettyValIden(type);

    return (v: unknown) => {
        if (!refiner(v)) throw new Error(err);
    }
}