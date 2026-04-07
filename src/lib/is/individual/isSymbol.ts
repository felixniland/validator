/**
 * Checks if a value is a symbol.
 * @param v - the value to check
 * @returns boolean representing if 'v' is a symbol
*/
export const isSymbol = (v: unknown): v is object => typeof v === "symbol";
