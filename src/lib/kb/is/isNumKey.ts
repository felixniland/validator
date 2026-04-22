import type { NumKey } from "felixtypes";
import { isDigitStr } from "validator";

export const isNumKey = (str: string): str is NumKey => str.length === 1 && isDigitStr(str);