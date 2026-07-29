import { newPrimValidator } from "$lib/prim/index.js";
import { FN_KEYS } from "felixtypes";

export const isFnKey = newPrimValidator(FN_KEYS);