/** Checks if v is a bigint */
export const isBigInt = (v: unknown): v is bigint => (typeof v === "bigint");