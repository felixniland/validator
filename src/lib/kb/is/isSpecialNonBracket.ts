import { newPrimValidator } from "../../prim/index.js";
import { SPECIAL_NON_BRACKET } from "felixtypes";

export const isSpecialNonBracket = newPrimValidator(SPECIAL_NON_BRACKET);