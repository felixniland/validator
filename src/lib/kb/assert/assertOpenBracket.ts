import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertOpenBracket: KbAsserter<"isOpenBracket"> = getKbAsserter("isOpenBracket");