import { newPrimValidator } from "../prim/index.js";
import type { NonEmptyArr } from "felixtypes";
import type { CorePrettyValIden, CoreValIden } from "../types.js";

export {
    CORE_VAL_IDEN_TO_PRETTY_MAP,
    isCoreValIden,
    isCorePrettyValIden
}

const isCoreValIden = (v: unknown): v is CoreValIden => typeof v === "string" && v in CORE_VAL_IDEN_TO_PRETTY_MAP;

const CORE_VAL_IDEN_TO_PRETTY_MAP = {
	str: 'string',
	num: 'number',
	compNum: 'comparable number',
	digitStr: 'string composed only of digits',
    bigint:"bigint",
	bool: 'boolean',
	arr: 'Array<unknown>',
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
	map: "Map<unknown, unknown>",
	null: "null",
	promise: "Promise<unknown>",
	regExp: "RegExp",
	set: "Set<unknown>",
	true: "true",
	false: "false",
	undef: "undefined",
	weakMap: "WeakMap<WeakKey, unknown>",
	weakSet: "WeakSet<WeakKey>",
	el: "Element",
	htmlEl: "HTML Element",
	inputEl: "HTML Input Element",
	formEl: "HTML Form Element",
	contentEditable: "Content Editable Element",
	node: "Node",
	svelteMap: "SvelteMap<unknown, unknown>",
	svelteSet: "SvelteSet<unknown>",
    symbol: "symbol",
    ul: "Unordered List Element",
    ol: "Ordered List Element",
    listEl: "(UL/OL) List Element",
    listItem: "HTML LI Element",
    blockEl: "Block Element",
    headingEl: "Heading Element",
    BR: "HTML BR Element",
    emptyTextNode: "empty Text Node",
    textNode: "Text Node",
    span: "HTML Span Element",
    v4UUID: "v4 UUID",
    voidEl: "HTML Void Element",
    nonEmpty: "Non-Empty Array",
    nonNullable: "Non-nullable",
    stringable: "Stringable",
} as const satisfies Record<CoreValIden, string>;

const isCorePrettyValIden = newPrimValidator((Object.values(CORE_VAL_IDEN_TO_PRETTY_MAP) as NonEmptyArr<CorePrettyValIden>));