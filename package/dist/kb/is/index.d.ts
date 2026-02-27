import { type NumKey, type Alpha, type KBTextInput, type KBNonTextInput, type KBKey } from "felixtypes";
export { isAlpha, isInputKey, isNonInputKey, isFunctionKey, isUnusedKey, isEditingKey, isNavKey, isSpecialChar, isSpecialNonBracket, isModKey, isOpenBracket, isCloseBracket, isKBKey, isNumKey, };
declare const isFunctionKey: (val: unknown) => val is "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8" | "f9" | "f10" | "f11" | "f12";
declare const isUnusedKey: (val: unknown) => val is "printscreen" | "scrolllock" | "pausebreak" | "numlock" | "capslock" | "contextmenu" | "meta";
declare const isEditingKey: (val: unknown) => val is "tab" | "backspace" | "delete" | "insert" | "enter" | "escape" | " ";
declare const isNavKey: (val: unknown) => val is "arrowup" | "arrowdown" | "arrowleft" | "arrowright" | "home" | "end" | "pageup" | "pagedown";
declare const isSpecialChar: (val: unknown) => val is "+" | "-" | "=" | "/" | "\\" | "?" | "." | "," | ";" | ":" | "'" | "\"" | "`" | "[" | "]" | "{" | "}" | "(" | ")" | "<" | ">" | "~" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*";
declare const isSpecialNonBracket: (val: unknown) => val is "+" | "-" | "=" | "/" | "\\" | "?" | "." | "," | ";" | ":" | "'" | "\"" | "`" | "~" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*";
declare const isModKey: (val: unknown) => val is "shift" | "ctrl" | "alt";
declare const isOpenBracket: (val: unknown) => val is "[" | "{" | "(" | "<";
declare const isCloseBracket: (val: unknown) => val is "]" | "}" | ")" | ">";
declare const isNumKey: (str: string) => str is NumKey;
/**
 * @param str a string of any length
 * @returns boolean representing if the string is an alpha
 * NOTE:
 * - the "Alpha" type used is only the English alphabet in both upper & lowercase;
 * - however, this will actually return for all alphabet characters (i.e., Greek, Russian...)
 * - internally, it compares (for each char of the string) "does uppercase === lowercase", thus returning FALSE for numbers, emojis, etc
 */
declare const isAlpha: (str: string) => str is Alpha;
declare const isInputKey: (v: unknown) => v is KBTextInput;
declare const isNonInputKey: (v: unknown) => v is KBNonTextInput;
declare const isKBKey: (v: unknown) => v is KBKey;
