import * as IsIndividual from "../is/index.js";

/** Asserts v is NonNullable */
export function assertNonNullable<T>(v: T, errMsg?: string): asserts v is NonNullable<T> {
    if (!IsIndividual.isNonNullable(v)) throw new Error(errMsg ?? `v is nullable: ${v}`);
}

// this is a copy of the 'getStdAsserter' internal signature, modified for this fn, but I CBF trying to figure out the overloads so I bailed hehehehehee...

    // const EXPECTED_MSG = "expected Non-nullable" as const;
    // type ExpectedMsg = typeof EXPECTED_MSG;

    // function asserter<const TVal, const TErrMsg extends string>(v: TVal, errMsg: TErrMsg): asserts v is NonNullable<TVal>;
    // function asserter<const TVal, const TErrMsg = ExpectedMsg>(v: TVal): asserts v is NonNullable<TVal>;
    // function asserter<const TVal>(v: TVal, errMsg?: string | undefined): asserts v is NonNullable<TVal>;
    // function asserter<const TVal, const TErrMsg extends ExpectedMsg>(v: TVal, errMsg?: TErrMsg): asserts v is NonNullable<TVal> {
    //     if (IsIndividual.isNonNullable(v)) return;
    //     throw new Error(errMsg || EXPECTED_MSG);
    // }