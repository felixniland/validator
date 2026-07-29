import { newPrimValidator } from "$lib/prim/index.js";
import { OPEN_BRACKET } from "felixtypes";

export const isOpenBracket = newPrimValidator(OPEN_BRACKET);