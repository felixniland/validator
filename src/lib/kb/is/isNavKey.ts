import { newStrValidator } from "../../str/index.js";
import { NAV } from "felixtypes";

export const isNavKey = newStrValidator(NAV);