import * as IsIndividual from "../../is/individual/index.js";
import { getIsValidator } from "../../is/index.js";
import { isValIden } from "../../labels/index.js";
export { INTERNAL_getValidator };
function INTERNAL_getValidator(validator) {
    if (isValIden(validator))
        return getIsValidator(validator);
    if (IsIndividual.isFn(validator)) { // just assertFn here
        // testing... TODO: need to put under devFlag, once I import that utility into here
        // if (validator.length !== 1) throw new Error("expected validator to have args.length of 1");
        // const res = validator({});
        // if (typeof res !== "boolean") throw new Error("validator functions must return boolean");
        return validator;
    }
    throw new Error("expected valIden or function");
}
