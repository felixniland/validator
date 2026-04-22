import { newStrValidator } from "../../str/index.js";
import { SPECIAL_NON_BRACKET } from "felixtypes";

export const isSpecialNonBracket = newStrValidator(SPECIAL_NON_BRACKET);