import type { ValIden, InferValidatedType, AutoCompleteStr as DefaultMsg } from "felixtypes";
import * as IsIndividual from "../../is/individual/index.js";
import { VAL_IDEN_TO_PRETTY_MAP } from "$lib/labels/index.js";

type GetExpectedMsg<TIden extends ValIden> = ReturnType<typeof getExpectedMsg<TIden>>;

export function getExpectedMsg<const TIden extends ValIden>(iden: TIden) {
    return `expected ${VAL_IDEN_TO_PRETTY_MAP[iden]}` as const;
}

export function getStdAsserter<const K extends ValIden>(type: K) {
    type Asserted = InferValidatedType<K>;

    const refiner = IsIndividual.getIsValidator(type);
    const defaultErrMsg = getExpectedMsg(type);

    function asserter<const TErrMsg extends string>(v: unknown, errMsg: TErrMsg): asserts v is Asserted;
    function asserter<const TErrMsg = GetExpectedMsg<K>>(v: unknown): asserts v is Asserted;
    function asserter(v: unknown, errMsg?: string | undefined): asserts v is Asserted;
    function asserter<const TErrMsg extends DefaultMsg<GetExpectedMsg<K>>>(v: unknown, errMsg?: TErrMsg): asserts v is Asserted {
        if (!refiner(v)) throw new Error(errMsg || defaultErrMsg);
    }

    const ret = asserter;
    return ret;
}
