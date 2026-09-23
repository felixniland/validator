import type { FnInOut } from "felixtypes";

const ASYNC_FUNCTION = Object.getPrototypeOf(async function(){}).constructor;

/** Checks if val is an async function */
export const isAsyncFn = (v: unknown): v is FnInOut<unknown, unknown, "async"> => v instanceof ASYNC_FUNCTION;