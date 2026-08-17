import { newPrimValidator } from "../../prim/index.js";
import { CLOSE_BRACKET } from "felixtypes";

export const isCloseBracket = newPrimValidator(CLOSE_BRACKET);