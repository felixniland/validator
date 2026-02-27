export declare const assertStr: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is string;
    <const TErrMsg = "expected string">(v: unknown): asserts v is string;
};
export declare const assertNum: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is number;
    <const TErrMsg = "expected number">(v: unknown): asserts v is number;
};
export declare const assertDigitStr: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is import("felixtypes").DigitStr;
    <const TErrMsg = "expected string composed only of digits">(v: unknown): asserts v is import("felixtypes").DigitStr;
};
export declare const assertCompNum: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is number;
    <const TErrMsg = "expected comparable number">(v: unknown): asserts v is number;
};
export declare const assertBool: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is boolean;
    <const TErrMsg = "expected boolean">(v: unknown): asserts v is boolean;
};
export declare const assertTrue: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is true;
    <const TErrMsg = "expected true">(v: unknown): asserts v is true;
};
export declare const assertFalse: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is false;
    <const TErrMsg = "expected false">(v: unknown): asserts v is false;
};
export declare const assertObj: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is object;
    <const TErrMsg = "expected object">(v: unknown): asserts v is object;
};
export declare const assertArr: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is unknown[];
    <const TErrMsg = "expected Array<unknown>">(v: unknown): asserts v is unknown[];
};
export declare const assertFn: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Function;
    <const TErrMsg = "expected Function">(v: unknown): asserts v is Function;
};
export declare const assertAsyncFn: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is (v: unknown) => Promise<unknown>;
    <const TErrMsg = "expected Async Function">(v: unknown): asserts v is (v: unknown) => Promise<unknown>;
};
export declare const assertNull: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is null;
    <const TErrMsg = "expected null">(v: unknown): asserts v is null;
};
export declare const assertUndef: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is undefined;
    <const TErrMsg = "expected undefined">(v: unknown): asserts v is undefined;
};
export declare const assertBoolNum: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is 0 | 1;
    <const TErrMsg = "expected BoolNum(0 | 1)">(v: unknown): asserts v is 0 | 1;
};
export declare const assertDateStr: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is import("felixtypes").DateStr;
    <const TErrMsg = "expected a parsable date string">(v: unknown): asserts v is import("felixtypes").DateStr;
};
export declare const assertArrStr: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is string[];
    <const TErrMsg = "expected Array<string>">(v: unknown): asserts v is string[];
};
export declare const assertArrNum: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is number[];
    <const TErrMsg = "expected Array<number>">(v: unknown): asserts v is number[];
};
export declare const assertArrBool: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is boolean[];
    <const TErrMsg = "expected Array<boolean>">(v: unknown): asserts v is boolean[];
};
export declare const assertArrObj: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is object[];
    <const TErrMsg = "expected Array<object>">(v: unknown): asserts v is object[];
};
export declare const assertArrArr: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is unknown[][];
    <const TErrMsg = "expected Array<Array<unknown>>">(v: unknown): asserts v is unknown[][];
};
export declare const assertArrFn: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Function[];
    <const TErrMsg = "expected Array<Function>">(v: unknown): asserts v is Function[];
};
export declare const assertArrNull: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is null[];
    <const TErrMsg = "expected Array<null>">(v: unknown): asserts v is null[];
};
export declare const assertArrUndef: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is undefined[];
    <const TErrMsg = "expected Array<undefined>">(v: unknown): asserts v is undefined[];
};
export declare const assertDate: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Date;
    <const TErrMsg = "expected Date">(v: unknown): asserts v is Date;
};
export declare const assertElement: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Element;
    <const TErrMsg = "expected Element">(v: unknown): asserts v is Element;
};
export declare const assertHTMLElement: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLElement;
    <const TErrMsg = "expected HTML Element">(v: unknown): asserts v is HTMLElement;
};
export declare const assertFormEl: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLFormElement;
    <const TErrMsg = "expected HTML Form Element">(v: unknown): asserts v is HTMLFormElement;
};
export declare const assertInputEl: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLInputElement;
    <const TErrMsg = "expected HTML Input Element">(v: unknown): asserts v is HTMLInputElement;
};
export declare const assertContentEditable: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is import("felixtypes").ContentEditableElement;
    <const TErrMsg = "expected Content Editable Element">(v: unknown): asserts v is import("felixtypes").ContentEditableElement;
};
export declare const assertNode: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Node;
    <const TErrMsg = "expected Node">(v: unknown): asserts v is Node;
};
export declare const assertUL: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLUListElement;
    <const TErrMsg = "expected Unordered List Element">(v: unknown): asserts v is HTMLUListElement;
};
export declare const assertOL: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLOListElement;
    <const TErrMsg = "expected Ordered List Element">(v: unknown): asserts v is HTMLOListElement;
};
export declare const assertListEl: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLUListElement | HTMLOListElement;
    <const TErrMsg = "expected (UL/OL) List Element">(v: unknown): asserts v is HTMLUListElement | HTMLOListElement;
};
export declare const assertBlockEl: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLElement;
    <const TErrMsg = "expected Block Element">(v: unknown): asserts v is HTMLElement;
};
export declare const assertHeadingEl: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLHeadingElement;
    <const TErrMsg = "expected Heading Element">(v: unknown): asserts v is HTMLHeadingElement;
};
export declare const assertListItem: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is HTMLLIElement;
    <const TErrMsg = "expected HTML LI Element">(v: unknown): asserts v is HTMLLIElement;
};
export declare const assertError: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Error;
    <const TErrMsg = "expected Error">(v: unknown): asserts v is Error;
};
export declare const assertRegExp: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is RegExp;
    <const TErrMsg = "expected RegExp">(v: unknown): asserts v is RegExp;
};
export declare const assertMap: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Map<unknown, unknown>;
    <const TErrMsg = "expected Map<unknown, unknown>">(v: unknown): asserts v is Map<unknown, unknown>;
};
export declare const assertSet: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Set<unknown>;
    <const TErrMsg = "expected Set<unknown>">(v: unknown): asserts v is Set<unknown>;
};
export declare const assertWeakMap: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is WeakMap<WeakKey, unknown>;
    <const TErrMsg = "expected WeakMap<WeakKey, unknown>">(v: unknown): asserts v is WeakMap<WeakKey, unknown>;
};
export declare const assertWeakSet: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is WeakSet<WeakKey>;
    <const TErrMsg = "expected WeakSet<WeakKey>">(v: unknown): asserts v is WeakSet<WeakKey>;
};
export declare const assertPromise: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Promise<unknown>;
    <const TErrMsg = "expected Promise<unknown>">(v: unknown): asserts v is Promise<unknown>;
};
export declare const assertSvelteSet: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is import("svelte/reactivity").SvelteSet<unknown>;
    <const TErrMsg = "expected SvelteSet<unknown>">(v: unknown): asserts v is import("svelte/reactivity").SvelteSet<unknown>;
};
export declare const assertSvelteMap: {
    <const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is import("svelte/reactivity").SvelteMap<unknown, unknown>;
    <const TErrMsg = "expected SvelteMap<unknown, unknown>">(v: unknown): asserts v is import("svelte/reactivity").SvelteMap<unknown, unknown>;
};
export declare function assertNonNullable<T>(v: T): asserts v is NonNullable<T>;
