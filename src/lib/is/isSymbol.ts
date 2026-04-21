/** Checks if v is a symbol */
export const isSymbol = (v: unknown): v is object => typeof v === "symbol";
