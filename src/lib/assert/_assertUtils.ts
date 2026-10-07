import { _V } from "../mgr/index.js";
import type { AutoCompleteStr as DefaultMsg } from "felixtypes";
import { _INTERNAL_getIsValidator } from "../is/getIsValidator.js";
import type { CoreValIden, InferValidatedType, ValIden } from "../types.js";

export {
    getStdAsserter as _getStdAsserter,
    getExpectedMsg as _getExpectedMsg
};

export type {
    GetExpectedMsg as _INTERNAL_GetExpectedMsg
}

type GetExpectedMsg<TIden extends ValIden> = ReturnType<typeof getExpectedMsg<TIden>>;

function getExpectedMsg<const TIden extends ValIden>(iden: TIden) {
    // if (isCoreValIden(iden)) return `expected ${CORE_VAL_IDEN_TO_PRETTY_MAP[iden]}` as const;
    return `expected ${_V.REG.VAL_IDEN_TO_PRETTY_MAP[iden]} as const`;
}

function getStdAsserter<const K extends CoreValIden>(type: K) {
    type Asserted = InferValidatedType<K>;

    const refiner = _INTERNAL_getIsValidator(type);
    const defaultErrMsg = getExpectedMsg(type);

    function asserter<const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Asserted;
    function asserter<const _TErrMsg = GetExpectedMsg<K>>(v: unknown): asserts v is Asserted;
    function asserter(v: unknown, errMsg?: string | undefined): asserts v is Asserted;
    function asserter<const TErrMsg extends DefaultMsg<GetExpectedMsg<K>>>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted {
        if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
    }

    return asserter;
}