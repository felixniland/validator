import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertNavKey: KbAsserter<"isNavKey"> = getKbAsserter("isNavKey");