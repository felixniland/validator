import { isFn, isNull } from "./is/index.js";
import type { GetValidatorReturn, ValidatorFn, GetterOr, NonFunction, ValIden } from "felixtypes";
import { getRefiner } from "./refine/index.js";
import { isValIden } from "./labels/index.js";
import { DEFAULT_ERR_MSG, getExpectedMsg } from "./assert/get/utils.js";
import { INTERNAL_getValidator } from "./internal/index.js";

/**
 * NOTES:
    * interseting to note... "Compute" and whatnot do NOTHING... there is ZERO inference or 'evaluation' once it runs into 'asserts'... coo;
        * e.g., function assertT<T>(obj: unknown): asserts obj is Compute<T> {}
 */

/** asserter with non-generic (v. similar to the inbuilt Node one IIRC - better take a look) */
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

function WORKING() {

    function assertWithCondition<T>(
        v: unknown,
        condition: (v: unknown) => boolean,
        errMsg?: string
    ): asserts v is T {
        const pass = condition(v);
        if (!pass) throw new Error(errMsg);
    }

    // function TESTS() {
    //     const someObj = {};
    //     const refiner = getRefiner("arrNum");
    //     assertWithCondition<GetValidatorReturn<typeof refiner>>(someObj, getRefiner("arrNum")); // these both work identically
    //     assertWithCondition<Array<number>>(someObj, getRefiner("arrNum")); // yay!
    //     someObj;

    //     function TEST_isNonNullable(x: string | undefined) {
    //         if (isNonNullable(x)) {
    //             return x.length;  // x has type string here
    //         } else {
    //             x;
    //         }
    //     }

    //     function TEST_assertNonNullable(x: string | undefined) {
    //         assertNonNullable(x);
    //         return x.length;  // x has type string here
    //     }
    // }
}









// WORKING - NOW TO COMBINE THE SIGNATURES IN AN OVERLOAD... :)
function assertRefined<const TRefined extends ValidatorFn<any, any>>(
    v: unknown,
    refiner: TRefined,
    errMsg?: string
): asserts v is GetValidatorReturn<TRefined> {
    assert(refiner(v), errMsg);
}

function assertWithCondition<T>(
    v: unknown,
    condition: (v: unknown) => boolean,
    errMsg?: string
): asserts v is T {
    const pass = condition(v);
    if (!pass) throw new Error(errMsg);
}

// const something = {} as unknown;
// assertRefined(something, getRefiner("arrNum"));
// something;

function withErrMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...refiners: VType): asserts v is GetValidatorReturn<Extract<VType[number], ValIden>>;
function withErrMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, errMsg: string, ...refiners: VType): asserts v is GetValidatorReturn<Extract<VType[number], ValIden>>;
function withErrMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any, unknown>>>(v: unknown, ...errMsgOrRefiners: Array<string>): asserts v is GetValidatorReturn<Extract<VType[number], ValIden>> {
    console.warn("TODO: ensure refinerArr has length");
    errMsgOrRefiners = Array.isArray(errMsgOrRefiners) ? errMsgOrRefiners : [errMsgOrRefiners];

    const valIdenArr = errMsgOrRefiners.filter(isValIden);
    
    const refinerArr: Array<ValidatorFn<any, any>> = (errMsgOrRefiners
        .map((v) => {
            if (isFn(v)) return v;
            if (isValIden(v)) return getRefiner(v);
        })
        .filter(Boolean) as any);

    const refiner = (v: unknown) => refinerArr.some((refiner) => refiner(v));
    
    const errMsg = 
        errMsgOrRefiners.filter((v) => !isValIden(v))[0]
        || getExpectedMsg(...valIdenArr)
        || DEFAULT_ERR_MSG;
    
    if (!refiner(v)) throw new Error(errMsg);
}

function assertAsserter<const TRefined extends ValidatorFn<any, any>>(v: unknown, refiner: TRefined, errMsg?: string): asserts v is GetValidatorReturn<TRefined>;
function assertAsserter<T>(v: unknown, condition: (v: unknown) => v is T, errMsg?: string): asserts v is T;
function assertAsserter<T>(v: unknown, condition: GetterOr<boolean, unknown>, errMsg?: string): asserts v is T;
function assertAsserter<T>(v: unknown, refinerOrCondition: GetterOr<boolean, unknown>, errMsg?: string): asserts v is T {
    const pass = maybeGetter(refinerOrCondition, v);
    if (!pass) throw new Error(errMsg);
}

// const val = {} as unknown;
// const refiner = getRefiner("str", "num");

// // assertAsserter(val, refiner);
// // val; // string | number
// // assertAsserter(val, getRefiner("str", "num"));
// // val; // string | number
// // assertAsserter<string | number>(val, true);
// // val; // string | number
// assertAsserter<string | number>(val, () => true);
// val; // string | number








/** a copy of this function from 'utils', to avoid circular dependencies */
function maybeGetter<T extends NonFunction, Args = void>(x: GetterOr<T, Args>, args?: Args): T {
	if (typeof x !== "function") {
		return x;
	}
	const ret = (x as any)(args);
	return ret;
}