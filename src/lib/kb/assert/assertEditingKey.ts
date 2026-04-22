import { getKbAsserter, type KbAsserter } from "./internal/index.js";

export const assertEditingKey: KbAsserter<"isEditingKey"> = getKbAsserter("isEditingKey");