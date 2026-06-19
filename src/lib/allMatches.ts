import type { ValIden } from "felixtypes";
import { VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
import { getIsValidator } from "./is/getIsValidator.js";

export {
    getAllMatchingTypes,
}

const VAL_IDENS = Object.keys(VAL_IDEN_TO_PRETTY_MAP) as Array<keyof typeof VAL_IDEN_TO_PRETTY_MAP>;

/** returns an Array<ValIden> for all idens that v matches */
function getAllMatchingTypes(v: unknown): Array<ValIden> {
    return VAL_IDENS.filter((iden) => getIsValidator(iden)(v));
}