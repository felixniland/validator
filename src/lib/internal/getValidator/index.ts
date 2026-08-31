import type { ValIden, ValidatorFn } from "felixtypes";
import * as IsIndividual from "../../is/index.js";
import { isValIden } from "../../labels/index.js";
import { _INTERNAL_GET_IS_IDEN } from "../../is/getIsValidator.js";

export {
    INTERNAL_getValidator
}

/**
 * @param validator the ValIden, or an actual ValidatorFn
 * @returns a validator function
 * @returns the relevant fn if 'validator' is a ValIden
 * @returns the function otherwise, trusting that it is a validatorFn
 * @throws if 'validator' is neither ValIden, nor a Function
*/
function INTERNAL_getValidator(validator: ValIden | ValidatorFn<any, any>): ValidatorFn<any, any> {
    if (isValIden(validator)) return IsIndividual[_INTERNAL_GET_IS_IDEN[validator]];
    if (IsIndividual.isFn(validator)) {
        // testing... TODO: need to put under devFlag
            // if (!(validator.length)) throw new Error("expected validator to have args.length of 1");
            // this is a dumbc heck, too, since '.length' can be w/e
            // this seems overly cautious in the extreme; sure it's the lib consumer's fault at this point XD
                // assertBool(validator({}), "validator functions must return boolean");
                // it would also fail if the validator threw because it was not set up to take "unknown" as a starting point, so would need 'try, catch'...
        return validator as ValidatorFn<any>;
    }
    
    throw new Error("expected ValIden or function");
}