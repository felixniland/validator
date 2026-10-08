/** TODO: finish this */

    // import * as IsIndividual from "./is/index.js";
    // import type { T ODO } from "felixtypes";
    // import { CORE_VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
    // import { _INTERNAL_GET_IS_IDEN } from "./is/getIsValidator.js";
    // import type { CoreValIden } from "./types.js";

    // /**
    //  * T ODO:
    //     * []: finish runtime logic
    //     * []: convert to 'ValIden' (from the old 'CoreValIden')
    //     * []: export!
    // */

    // // export {
    // //     getAllMatchingTypes,
    // // }

    // const VAL_IDENS = Object.keys(CORE_VAL_IDEN_TO_PRETTY_MAP) as Array<keyof typeof CORE_VAL_IDEN_TO_PRETTY_MAP>;

    // /**
    //  * @returns an Array<ValIden> for all idens that v matches
    //  * this is a run-time check: i.e., it has no generics on it, and does not narrow
    // */
    // // @ts-expect-error("WIP - no unused locals")
    // function getAllMatchingTypes(__v: T ODO<any, "the logic for checking if the validator is actually related lmao">): Array<CoreValIden> {
    //     const ret: Array<CoreValIden> = [];

    //     for (const iden of VAL_IDENS) {
    //         if (IsIndividual[_INTERNAL_GET_IS_IDEN[iden]]) ret.push(iden);
    //     }

    //     return ret;
    // }