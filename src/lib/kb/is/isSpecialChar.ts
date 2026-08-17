import { newPrimValidator } from "../../prim/index.js";
import { SPECIAL } from "felixtypes";

export const isSpecialChar = newPrimValidator(SPECIAL);