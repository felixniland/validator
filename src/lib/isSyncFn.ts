import type { FnInOut } from "felixtypes";
import { isAsyncFn } from "./is/isAsyncFn.js";
import { isFn } from "./is/isFn.js";

/** TODO: wire this up with 'felixtypes', etc, then put it in the ol'... uh... 'is' directory, like normal... yeah... */
const isSyncFn = (v: unknown): v is FnInOut<unknown, unknown, "sync"> => !isAsyncFn(v) && isFn(v);