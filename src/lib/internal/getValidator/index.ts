import type { ValIden, ValidatorFn } from "felixtypes";
import * as IsIndividual from "../../is/individual/index.js";
import { getIsValidator } from "$lib/is/index.js";
import { isValIden } from "$lib/labels/index.js";

export {
    INTERNAL_getValidator
}

function INTERNAL_getValidator(validator: ValIden | ValidatorFn<any, any>): ValidatorFn<any, any> {
    if (isValIden(validator)) return getIsValidator(validator);
    if (IsIndividual.isFn(validator)) { // just assertFn here
        // testing... TODO: need to put under devFlag, once I import that utility into here
            // if (validator.length !== 1) throw new Error("expected validator to have args.length of 1");
            // const res = validator({});
            // if (typeof res !== "boolean") throw new Error("validator functions must return boolean");
        return validator as ValidatorFn<any>;
    }
    throw new Error("expected valIden or function");
}