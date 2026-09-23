import { type GetValidatorReturn, type ReadonlyNonEmptyArr, type ValidatorFn, type ValIden } from "felixtypes";
import { assertNonEmpty } from "../assert/assertNonEmpty.js";
import { isValIden, VAL_IDEN_TO_PRETTY_MAP } from "../labels/index.js";
import { getRefiner } from "../refine/index.js";

export {
    assertObjHasKey,
    assertObjHasKeyOfType,
    objHasKey,
    objHasKeyOfType
};

// * []: the "objHasKey" return type is... totally fucked lol. Somehow, it DOES narrow, but it is inconsistently killing the return type of obj[key]? I have no idea why... anyway, move it to 'validator' once it's fixed
    // this is why, I think... https://github.com/microsoft/TypeScript/issues/10530

/**
 * @guards record is { K: any }
 * @usage despite the type signature, it does not reliably infer the type of R[K]...
*/
function objHasKey<const K extends PropertyKey, const R extends Record<any, any>>(record: R, key: K): record is R & {[I in K]: K extends keyof R ? R[K] : any } {
	return (key in record);
}

/**
 * @asserts record is { K: any }
 * @usage despite the type signature, it does not reliably infer the type of R[K]...
*/
function assertObjHasKey<K extends PropertyKey, const R extends Record<any, any>>(record: R, key: K): asserts record is R & {[I in K]: K extends keyof R ? R[K] : any } {
	if (key in record) return;
	throw new Error(`expected key ${String(key)} to be present in this obj`);
}

function objHasKeyOfType<
    const TKey extends PropertyKey,
    const TRec extends Record<any, any>,
    const VType extends ReadonlyNonEmptyArr<ValIden | ValidatorFn<unknown>>,
>(record: TRec, key: TKey, ...types: VType): record is TRec & {[I in TKey]: GetValidatorReturn<VType[number]> } {
    assertNonEmpty(types);
    return (key in record) && getRefiner(...types)(record[key]);
}

function assertObjHasKeyOfType<
    const TKey extends PropertyKey,
    const TRec extends Record<any, any>,
    const VType extends ReadonlyNonEmptyArr<ValIden | ValidatorFn<unknown>>,
>(record: TRec, key: TKey, ...types: VType): asserts record is TRec & {[I in TKey]: GetValidatorReturn<VType[number]> } {
    if (objHasKeyOfType(record, key, ...types)) return;
    const prettyIdens = (types.filter(isValIden) satisfies Array<ValIden>).map((iden) => VAL_IDEN_TO_PRETTY_MAP[iden]).join(", or ");
    const ofTypeStr = prettyIdens ? `of type ${prettyIdens}` : 'of a specific type';
	throw new Error(`expected key ${String(key)} ${ofTypeStr} to be present in this obj`);
}