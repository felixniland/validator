import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertInputKey: KbAsserter<"isInputKey"> = getKbAsserter("isInputKey");