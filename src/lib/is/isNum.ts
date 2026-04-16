/**
 * Checks if a value is a number.
 * @param v - the value to check
 * @returns boolean representing if 'v' is a number
*/
export const isNum = (v: unknown): v is number => typeof v === "number";
