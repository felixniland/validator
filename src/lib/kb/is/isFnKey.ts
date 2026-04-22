import { newStrValidator } from "../../str/index.js";
import { FN_KEYS } from "felixtypes";

export const isFnKey = newStrValidator(FN_KEYS);