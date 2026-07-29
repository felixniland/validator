import { newPrimValidator } from "$lib/prim/index.js";
import { MOD } from "felixtypes";

export const isModKey = newPrimValidator(MOD);