import { newStrValidator } from "../../str/index.js";
import { SPECIAL } from "felixtypes";

export const isSpecialChar = newStrValidator(SPECIAL);