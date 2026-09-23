const ASYNC_FUNCTION = Object.getPrototypeOf(async function(){}).constructor;

/** Checks if val is an async function */
export const isAsyncFn = (v: unknown): v is (...args: any) => Promise<any> => v instanceof ASYNC_FUNCTION;