/** works, but sort of an old/ugly version of 'ensure' */

// import type { ValIden, ValidatorFn, GetValidatorReturn } from "felixtypes";
// import { getRefiner } from "../../refine/index.js";

// /**
//  * @template T
//  * utility to create a dynamic asserter
//  * it is a known TS limitation (IMO) that you cannot create an asserter 
//  * "sneaky" is due to telethe fact that TS does not allow a ReturnType of "asserts val is SomeGeneric"
//  * @throws if "V" does not match 
// */
// function sneakyAsserter<const T, const VType extends ReadonlyArray<ValIden | ValidatorFn<any, T>>>(
//     ...refiners: VType
// ): (v: unknown) => GetValidatorReturn<VType[number]> {
//     const refiner = getRefiner(...refiners as a ny)
    
//     const asserter = (v: unknown) => {
//         if (!refiner(v)) throw new Error("i am not the thing");
//     }

//     const ret = (v: unknown) => {
//         asserter(v);
//         return v;
//     }

//     return ret as a ny;
// }