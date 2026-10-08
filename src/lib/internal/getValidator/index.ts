import { INTERNAL_REGISTRY } from "../../mgr/index.js";
import { isCoreValIden, type CoreValIden as ValIden } from "../../index.js";
import { _INTERNAL_getIsValidator } from "../../is/getIsValidator.js";
import type { ValidatorFn } from "../../types.js";

export {
    INTERNAL_getValidator
};

/**
 * @param validator the ValIden, or an actual ValidatorFn
 * @returns a validator function
 * @returns the relevant fn if 'validator' is a ValIden
 * @returns the function otherwise, trusting that it is a validatorFn
 * @throws if 'validator' is neither ValIden, nor a Function
*/
function INTERNAL_getValidator(idenOrFn: ValIden | ValidatorFn<any, any>): ValidatorFn<any, any> {
    switch (true) {
        case (isCoreValIden(idenOrFn)): return _INTERNAL_getIsValidator(idenOrFn);
        case (INTERNAL_REGISTRY.isRegisteredValIden(idenOrFn)): return INTERNAL_REGISTRY.getValidator(idenOrFn);
        default:
            if (typeof idenOrFn !== "function") throw new Error("expected ValIden or function");
            return idenOrFn;
    }
}