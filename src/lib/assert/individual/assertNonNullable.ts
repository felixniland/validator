/**
 * Asserts that a value is not null or undefined.
 * @param v - The value to check
 * @throws Error if the value is null or undefined
 */
import * as IsIndividual from "../../is/individual/index.js";

export function assertNonNullable<T>(v: T): asserts v is NonNullable<T> {
    if (!IsIndividual.isNonNullable(v)) throw new Error(`v is nullable: ${v}`);
}
