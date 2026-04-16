// // this is a copy from Utils

// import { getRefiner } from "$lib/refine/index.js";
// import type { Compute, GetValidatorReturn, PlainObject, ValidatorFn, ValIden } from "felixtypes";
// import { isObj } from "./isObj.js";

// // * []: the "objHasKey" return type is... totally fucked lol. Somehow, it DOES narrow, but it is inconsistently killing the return type of obj[key]? I have no idea why... anyway, move it to 'validator' once it's fixed
//     // this is why, I think... https://github.com/microsoft/TypeScript/issues/10530

// function COPIED_FROM_UTILS_objHasKey<K extends PropertyKey, const R extends Record<any, any>>(record: R, key: K): record is R & {[I in K]: K extends keyof R ? R[K] : any } {
// 	return (key in record);
// }

// // function objHasKeyOfType<
// //     TObj, // extends PlainObject,
// //     const TKey extends PropertyKey,
// //     const TVal extends ValIden
// // >(v: TObj, key: TKey, expectedType: ValIden): v is TObj & {[Iden in TKey]: TKey extends keyof TObj ? TObj[TKey] : GetValidatorReturn<TVal> } {
// //     if (!isObj(v)) return false;
// //     if (!(key in v)) return false;
// //     return (getRefiner(expectedType)(v[key]));
// // }

// function objHasKeyOfType<const TVal extends ValIden>(expectedType: ValIden) {
//     type Validated = GetValidatorReturn<TVal>;
//     const validator = getRefiner(expectedType) as ValidatorFn<Validated>;

//     // function validateObjKey<const TObj extends PlainObject, const TKey extends PropertyKey>(v: TObj, key: TKey): v is TObj & {[Iden in TKey]: TKey extends keyof TObj ? TObj[TKey] : GetValidatorReturn<TVal> } {
//     function validateObjKey<const TObj extends PlainObject, const TKey extends PropertyKey>(v: TObj, key: TKey): v is Compute<TObj & {[Iden in TKey]: Validated }> {
//         if (!(key in v)) return false;x
//         return (validator)(v[key]);
//     }

//     return validateObjKey;
// }
// // : v is TObj & {[Iden in TKey]: TKey extends keyof TObj ? TObj[TKey] : GetValidatorReturn<TVal> } {
// //     if (!isObj(v)) return false;
// //     if (!(key in v)) return false;
// //     return (getRefiner(expectedType)(v[key]));
// // }

// type WhatIsThis = {
//     id: number;
//     data: string;
// }

// const what = {} as WhatIsThis;

// const keyIsNum = objHasKeyOfType("num");
// const checkObj = (v: PlainObject, key: PropertyKey) => keyIsNum(v, key);

// if (objHasKeyOfType("num")(what, "someKey")) {
//     what;
// }

// if (COPIED_FROM_UTILS_objHasKey(what, "someKey")) {
//     what; // const what: WhatIsThis & { someKey: any; }
// }