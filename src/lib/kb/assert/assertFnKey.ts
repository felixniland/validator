import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertFnKey: KbAsserter<"isFnKey"> = getKbAsserter("isFnKey");