/**
 * Checks if a value is an async function.
 * @param val - The value to check
 * @returns True if the value is an async function
 */
export const isAsyncFn = (val: unknown): val is ((args?: any) => Promise<any>) => typeof val === "function" && val instanceof Object.getPrototypeOf(async function(){}).constructor;
