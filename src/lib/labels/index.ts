import type { AssertsValIden, IsValIden, PrettyValIden, ValIden } from "../index.js";
import { toCamelCase } from "../internal/index.js";

export {
    PRETTY_STR_MAP,
    isValIden,
	getPrettyValIden,
	getPrettyIsValIden,
	getPrettyAssertsValIden,
	findPrettyValIden
}

const isValIden = (v: unknown): v is ValIden => typeof v === "string" && v in PRETTY_STR_MAP;
const getPrettyValIden = (l: ValIden): PrettyValIden => PRETTY_STR_MAP[l];
const getPrettyAssertsValIden = (l: AssertsValIden): PrettyValIden => PRETTY_STR_MAP[toCamelCase(l.slice(7)) as ValIden];
const getPrettyIsValIden = (l: IsValIden): PrettyValIden => PRETTY_STR_MAP[toCamelCase(l.slice(2)) as ValIden];

const findPrettyValIden = (label: ValIden | IsValIden | AssertsValIden): PrettyValIden => {
	if (label.startsWith("is")) return getPrettyValIden(label as any);
	if (label.startsWith("asserts")) return getPrettyAssertsValIden(label as any);
	return getPrettyValIden(label as any);
}

const PRETTY_STR_MAP = {
	str: 'string',
	num: 'number',
	compNum: 'comparable number',
	digitStr: 'string composed only of digits',
	bool: 'boolean',
	arr: 'Array<any>',
	obj: 'object',
	arrStr: 'Array<string>',
	arrNum: 'Array<number>',
	arrArr: 'Array<Array<unknown>>',
	arrBool: "Array<boolean>",
	arrFn: "Array<Function>",
	arrNull: "Array<null>",
	arrObj: "Array<object>",
	arrUndef: "Array<undefined>",
	boolNum: "BoolNum(0 | 1)",
	date: "Date",
	dateStr: "a parsable date string",
	err: "Error",
	fn: "Function",
	asyncFn: "Async Function",
	map: "Set<unknown>",
	null: "null",
	promise: "Promise<unknown>",
	regExp: "RegExp",
	set: "Set<unknown>",
	true: "true",
	false: "false",
	undef: "undefined",
	weakMap: "WeakMap",
	weakSet: "WeakSet",
	el: "Element",
	htmlEl: "HTML Element",
	inputEl: "HTML Input Element",
	formEl: "HTML Form Element",
	contentEditable: "Content Editable Element",
	node: "Node",
	svelteMap: "SvelteMap",
	svelteSet: "SvelteSet",
    ul: "Unordered List Element",
    ol: "Ordered List Element",
    listEl: "(UL/OL) List Element",
    listItem: "HTML LI Element",
    blockEl: "Block Element",
    headingEl: "Heading Element",
} as const;