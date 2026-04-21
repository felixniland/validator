/** Checks if val is an async function */
export const isAsyncFn = (val: unknown): val is ((args?: any) => Promise<any>) => typeof val === "function" && val instanceof Object.getPrototypeOf(async function(){}).constructor;
