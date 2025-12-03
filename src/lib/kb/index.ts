import { isStr } from "$lib/is/index.js";
import { newStrValidator } from "$lib/str/index.js";
import { FN_KEYS, UNUSED, EDITING, OPEN_BRACKET, CLOSE_BRACKET, type Alpha, NAV, SPECIAL, SPECIAL_NON_BRACKET, MOD, type KBTextInput, type KBNonTextInput, type KBKey, type NumKey } from "./typesAndConsts.js";

export {
    isAlpha,
    isInputKey,
    isNonInputKey,
    isFunctionKey,
    isUnusedKey,
    isEditingKey,
    isNavKey,
    isSpecialChar,
    isSpecialNonBracket,
    isModKey,
    isOpenBracket,
    isCloseBracket,
    isKBKey,
    isNumKey,
    // doesNotFireUpdateSelection, // I think this is too niche... 
}

// const doesNotFireUpdateSelection = newStrValidator(DOES_NOT_FIRE_UPDATE_SELECTION);
const isFunctionKey = newStrValidator(FN_KEYS, { caseInsensitive: true });
const isUnusedKey = newStrValidator(UNUSED, { caseInsensitive: true });
const isEditingKey = newStrValidator(EDITING, { caseInsensitive: true });
const isNavKey = newStrValidator(NAV, { caseInsensitive: true });
const isSpecialChar = newStrValidator(SPECIAL);
const isSpecialNonBracket = newStrValidator(SPECIAL_NON_BRACKET);
const isModKey = newStrValidator(MOD, { caseInsensitive: true });
const isOpenBracket = newStrValidator(OPEN_BRACKET);
const isCloseBracket = newStrValidator(CLOSE_BRACKET);

// regex
const isNumKey = (str: string): str is NumKey => str.length === 1 && /^[0-9]$/.test(str);
// this old version of "isAlpha" only works with English // const isAlpha = (str: string): str is Alpha => str.length === 1 && /^[a-zA-Z]$/.test(str);

/**
 * @param str a string of any length
 * @returns boolean representing if the string is an alpha
 * NOTE:
 * - the "Alpha" type used is only the English alphabet in both upper & lowercase;
 * - however, this will actually return for all alphabet characters (i.e., Greek, Russian...)
 * - internally, it compares (for each char of the string) "does uppercase === lowercase", thus returning FALSE for numbers, emojis, etc
 */
const isAlpha = (str: string): str is Alpha => [...str].every((s) => s.toUpperCase() !== s.toLowerCase());

const isInputKey = (v: unknown): v is KBTextInput => isStr(v) && (isAlpha(v) || isNumKey(v) || isSpecialChar(v));
const isNonInputKey = (v: unknown): v is KBNonTextInput => isStr(v) && (isFunctionKey(v) || isEditingKey(v) || isNavKey(v));
const isKBKey = (v: unknown): v is KBKey => isStr(v) && (isInputKey(v) || isNonInputKey(v) || isUnusedKey(v));