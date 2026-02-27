import type { NonEmptyArr } from "felixtypes";
export { newStrValidator };
declare function newStrValidator<T extends string>(arr: NonEmptyArr<T>): (val: unknown) => val is T;
