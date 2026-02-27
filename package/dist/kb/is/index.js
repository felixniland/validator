import { isDigitStr, isStr } from "../../is/index.js";
import { newStrValidator } from "../../str/index.js";
import { FN_KEYS, UNUSED, EDITING, NAV, SPECIAL, SPECIAL_NON_BRACKET, MOD, OPEN_BRACKET, CLOSE_BRACKET } from "felixtypes";
export { isAlpha, isInputKey, isNonInputKey, isFunctionKey, isUnusedKey, isEditingKey, isNavKey, isSpecialChar, isSpecialNonBracket, isModKey, isOpenBracket, isCloseBracket, isKBKey, isNumKey,
// doesNotFireUpdateSelection, // I think this is too niche... 
 };
// const doesNotFireUpdateSelection = newStrValidator(DOES_NOT_FIRE_UPDATE_SELECTION);
const isFunctionKey = newStrValidator(FN_KEYS);
const isUnusedKey = newStrValidator(UNUSED);
const isEditingKey = newStrValidator(EDITING);
const isNavKey = newStrValidator(NAV);
const isSpecialChar = newStrValidator(SPECIAL);
const isSpecialNonBracket = newStrValidator(SPECIAL_NON_BRACKET);
const isModKey = newStrValidator(MOD);
const isOpenBracket = newStrValidator(OPEN_BRACKET);
const isCloseBracket = newStrValidator(CLOSE_BRACKET);
const isNumKey = (str) => str.length === 1 && isDigitStr(str);
// this old version of "isAlpha" only works with English // const isAlpha = (str: string): str is Alpha => str.length === 1 && /^[a-zA-Z]$/.test(str);
/**
 * @param str a string of any length
 * @returns boolean representing if the string is an alpha
 * NOTE:
 * - the "Alpha" type used is only the English alphabet in both upper & lowercase;
 * - however, this will actually return for all alphabet characters (i.e., Greek, Russian...)
 * - internally, it compares (for each char of the string) "does uppercase === lowercase", thus returning FALSE for numbers, emojis, etc
 */
const isAlpha = (str) => [...str].every((s) => s.toUpperCase() !== s.toLowerCase());
const isInputKey = (v) => isStr(v) && (isAlpha(v) || isNumKey(v) || isSpecialChar(v));
const isNonInputKey = (v) => isStr(v) && (isFunctionKey(v) || isEditingKey(v) || isNavKey(v));
const isKBKey = (v) => isStr(v) && (isInputKey(v) || isNonInputKey(v) || isUnusedKey(v));
