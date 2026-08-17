import type { ValIden, InferValidatedType, AutoCompleteStr as DefaultMsg } from "felixtypes";
import { VAL_IDEN_TO_PRETTY_MAP } from "../labels/index.js";
import * as IsIndividual from "../is/index.js";
import { _INTERNAL_GET_IS_IDEN } from "$lib/is/getIsValidator.js";

export {
    getStdAsserter
}

type GetExpectedMsg<TIden extends ValIden> = ReturnType<typeof getExpectedMsg<TIden>>;

function getExpectedMsg<const TIden extends ValIden>(iden: TIden) {
    return `expected ${VAL_IDEN_TO_PRETTY_MAP[iden]}` as const;
}

function getStdAsserter<const K extends ValIden>(type: K) {
    type Asserted = InferValidatedType<K>;

    const refiner = IsIndividual[_INTERNAL_GET_IS_IDEN[type]];
    const defaultErrMsg = getExpectedMsg(type);

    function asserter<const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Asserted;
    function asserter<const TErrMsg = GetExpectedMsg<K>>(v: unknown): asserts v is Asserted;
    function asserter(v: unknown, errMsg?: string | undefined): asserts v is Asserted;
    function asserter<const TErrMsg extends DefaultMsg<GetExpectedMsg<K>>>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted {
        if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
    }

    return asserter;
}
