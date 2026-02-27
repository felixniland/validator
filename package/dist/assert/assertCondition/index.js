import { isValIden } from "../../labels/index.js";
import { isBool, isFn, isStr, isTrue } from "../../is/index.js";
import { getRefiner } from "../../refine/index.js";
import { getErrMsg } from "../get/getErrMsg.js";
/**
 * TODO:
    * []: (is/assert)non-nullable: move them to the appropriate folders... but I don't think they should be part of the "ValIden", given that they require a generic... so I need to create handling for that
    * []: update "ASSER"'s overloads to error if not given a condition. Right now, neither of these generate intellisense errors:
        * ASSERT(someVal)
        * ASSERT(someVal, "custom error msg")
    * []: the runtime handling does not care if the errMsg is the second call to "ASSERT", it would be cool to make the function work that way too
    *
 */
export { ASSERT, };
/**
 * Asserts that a value meets at least one of the provided conditions.
 *
 * @param v - The value to validate
 * @param errMsg - to include a custom error message string, it must be the SECOND argument
 * @param errMsg - if no custom message is provided, and 1+ ValIden are provided, they generate the default errorMessage: `expected {valIdens.join(", or")}}`
 * @param errMsg - if no ValIdens are provided, default is: "asserter received incorrect type"
 * @param conditions boolean | (v?: typeof v) => boolean | {@link ValIden} | Typeguard
 * @throws error when no condition is met
 * @throws error when no conditions are received
 *
 * @example
 * ASSERT(user, isObj); // throws "expected object"
 * ASSERT(user, "obj"); // throws "expected object"
 * ASSERT(value, (v) => v > 0, "Value must be positive"); // INCORRECT: custom errMsg must be the second argument
 * ASSERT(value, "Value must be positive", (v) => v > 0); // CORRECT: custom errMsg is second argument
 * ASSERT(data, "Invalid data", "str", "num"); // if condition is not met, will throw "Invalid data"
 * ASSERT(data, "str", "num"); // if condition is not met, will throw "expected string, or number"
 */
function ASSERT(v, errMsgOrRefiner, errMsg, ...extraRefiners) {
    const combined = [errMsgOrRefiner, errMsg, extraRefiners].flat();
    const valIdenArr = combined.filter(isValIden);
    /** map over any functions, val idens, and bools; for functions, run them; thus ending up with Array<bool> */
    const validated = combined.map((item) => {
        if (isFn(item))
            return item(v);
        if (isValIden(item))
            return getRefiner(item)(v);
        if (isBool(item))
            return item;
    })
        .filter(isBool); // remove non-valIden string && undefined
    if (!validated.length)
        throw new Error("No valid refiner provided");
    const pass = validated.some(isTrue);
    if (pass)
        return;
    /** ok, now we need to throw... */
    const errMsgFromCaller = combined.filter((item) => isStr(item) && !isValIden(item))[0];
    const finalErrMsg = errMsgFromCaller
        || getErrMsg(...valIdenArr);
    throw new Error(finalErrMsg);
}
