import * as IsIndividual from "./is/index.js";
import type { ValIden } from "felixtypes";
import { VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
import { _INTERNAL_GET_IS_IDEN } from "./is/getIsValidator.js";

export {
    getAllMatchingTypes,
}

const VAL_IDENS = Object.keys(VAL_IDEN_TO_PRETTY_MAP) as Array<keyof typeof VAL_IDEN_TO_PRETTY_MAP>;

/**
 * @returns an Array<ValIden> for all idens that v matches
 * this is a run-time check: i.e., it has no generics on it, and does not narrow
*/
function getAllMatchingTypes(v: unknown): Array<ValIden> {
    const ret: Array<ValIden> = [];

    for (const iden of VAL_IDENS) {
        if (IsIndividual[_INTERNAL_GET_IS_IDEN[iden]]) ret.push(iden);
    }

    return ret;
}