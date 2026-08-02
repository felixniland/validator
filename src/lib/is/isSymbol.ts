/** Checks if v is a symbol */
export const isSymbol = (v: unknown): v is symbol => typeof v === "symbol";
