/**
 * Checks if a value is a bigint.
 * @param v - the value to check
 * @returns boolean representing if 'v' is a bigint
*/
export const isBigInt = (v: unknown): v is bigint => (typeof v === "bigint");