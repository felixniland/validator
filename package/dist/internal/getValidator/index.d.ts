import type { ValIden, ValidatorFn } from "felixtypes";
export { INTERNAL_getValidator };
declare function INTERNAL_getValidator(validator: ValIden | ValidatorFn<any, any>): ValidatorFn<any, any>;
