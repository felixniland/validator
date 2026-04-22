import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertCloseBracket: KbAsserter<"isCloseBracket"> = getKbAsserter("isCloseBracket");