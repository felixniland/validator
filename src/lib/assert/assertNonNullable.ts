/** Asserts v is not null or undefined */
import * as IsIndividual from "../is/index.js";

export function assertNonNullable<T>(v: T): asserts v is NonNullable<T> {
    if (!IsIndividual.isNonNullable(v)) throw new Error(`v is nullable: ${v}`);
}
