import type { Constructor } from "../internal/types.js";

export {
    newInstanceOfValidator,
}

function newInstanceOfValidator<T>(constructor: Constructor<T>): (val: unknown) => val is T {
    const validator = (val: unknown): val is T => val instanceof constructor;
    return validator;
}