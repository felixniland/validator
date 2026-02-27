import type { ValIden } from "felixtypes";
import { VAL_IDEN_TO_PRETTY_MAP } from "./labels/index.js";
export type { PrettyValIden, GetPrettyValIden, };
type GetPrettyValIden<I extends ValIden> = typeof VAL_IDEN_TO_PRETTY_MAP[I];
/** a "pretty" validator iden for use in public error messages */
type PrettyValIden = typeof VAL_IDEN_TO_PRETTY_MAP[ValIden];
