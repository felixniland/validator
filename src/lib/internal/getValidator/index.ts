import type { ValIden, ValidatorFn } from "felixtypes";
import * as IsIndividual from "../../is/individual/index.js";
import { getIsValidator } from "$lib/is/index.js";
import { isValIden } from "$lib/labels/index.js";

export {
    INTERNAL_getValidator
}

function INTERNAL_getValidator(validator: ValIden | ValidatorFn<any, any>): ValidatorFn<any, any> {
    if (isValIden(validator)) return getIsValidator(validator);
    if (IsIndividual.isFn(validator)) {
        // testing... TODO: need to put under devFlag
            // if (!(validator.length)) throw new Error("expected validator to have args.length of 1");
            // this seems overly cautious in the extreme; sure it's the lib consumer's fault at this point XD
                // assertBool(validator({}), "validator functions must return boolean");
                // it would also fail if the validator threw because it was not set up to take "unknown" as a starting point, so would need 'try, catch'...
        return validator as ValidatorFn<any>;
    }
    throw new Error("expected valIden or function");
}