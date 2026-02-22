import type { ValIden, ValidatorFn, GetValidatorReturn } from "felixtypes";
import { getRefiner } from "$lib/refine/index.js";

export {
    sneakyAsserter as WIP_DO_NOT_EXPORT_sneakyAsserter,
}

/**
 * @template T
 * utility to create a dynamic asserter
 * it is a known TS limitation (IMO) that you cannot create an asserter 
 * "sneaky" is due to telethe fact that TS does not allow a ReturnType of "asserts val is SomeGeneric"
 * @throws if "V" does not match 
*/
function sneakyAsserter<const T, const VType extends ReadonlyArray<ValIden | ValidatorFn<any, T>>>(
    ...refiners: VType
): (v: unknown) => GetValidatorReturn<VType[number]> {
    const refiner = getRefiner(...refiners as any)
    
    const asserter = (v: unknown) => {
        if (!refiner(v)) throw new Error("i am not the thing");
    }

    const ret = (v: unknown) => {
        asserter(v);
        return v;
    }

    return ret as any;
}