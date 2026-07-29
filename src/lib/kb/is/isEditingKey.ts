import { newPrimValidator } from "$lib/prim/index.js";
import { EDITING } from "felixtypes";

export const isEditingKey = newPrimValidator(EDITING);
