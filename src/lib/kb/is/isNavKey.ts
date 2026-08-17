import { newPrimValidator } from "../../prim/index.js";
import { NAV } from "felixtypes";

export const isNavKey = newPrimValidator(NAV);