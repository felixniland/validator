import { isValIden, VAL_IDEN_TO_PRETTY_MAP } from "$lib/labels/index.js";
import type { ValIden, NullOr, ValidatorFn } from "felixtypes";

export {
    DEFAULT_ERR_MSG,
    getExpectedMsg,
}

const DEFAULT_ERR_MSG = "asserter received incorrect type" as const;

/**
 * @usage DO NOT USE! TESTING ONLY!
 * @todo add the errMsg validators etc, same as the internal asserter generator
 */

function getExpectedMsg<const VType extends ReadonlyArray<ValIden | ValidatorFn<any>>>(...arr: VType): NullOr<string> {
    const expectedTypes = arr
        .map((entry) => isValIden(entry) ? VAL_IDEN_TO_PRETTY_MAP[entry] : null)
        .filter(Boolean)
        .join(", or ");

    if (!expectedTypes.length) return null;
    return `expected ${expectedTypes}`;
}