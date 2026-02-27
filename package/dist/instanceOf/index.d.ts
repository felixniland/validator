import type { Constructor } from "felixtypes";
export { newInstanceOfValidator, };
declare function newInstanceOfValidator<T>(constructor: Constructor<T>): (val: unknown) => val is T;
