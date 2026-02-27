import { getRefiner } from "../../refine/index.js";
export { sneakyAsserter as WIP_DO_NOT_EXPORT_sneakyAsserter, };
/**
 * @template T
 * utility to create a dynamic asserter
 * it is a known TS limitation (IMO) that you cannot create an asserter
 * "sneaky" is due to telethe fact that TS does not allow a ReturnType of "asserts val is SomeGeneric"
 * @throws if "V" does not match
*/
function sneakyAsserter(...refiners) {
    const refiner = getRefiner(...refiners);
    const asserter = (v) => {
        if (!refiner(v))
            throw new Error("i am not the thing");
    };
    const ret = (v) => {
        asserter(v);
        return v;
    };
    return ret;
}
