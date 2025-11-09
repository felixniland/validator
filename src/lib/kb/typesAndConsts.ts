import type { ToStr } from "$lib/internal/types.js";
import type { Digit } from "$lib/types/index.js";

export type {
	KeyStr,
	ModKey,
	KBKey,
	KBTextInput,
	KBNonTextInput,
	FunctionKey,
	SpecialChar,
	SpecialNonBracket,
	EditingKey,
	NavKey,
	UnbrandedDigitStr as KBDigitStr,
	Alpha,
	NumKey,
	OpenBracket,
	CloseBracket,
	DoesNotFireUpdateSelection
}

export {
    FN_KEYS,
    UNUSED,
    EDITING,
    CLOSE_BRACKET,
    OPEN_BRACKET,
    NAV,
    SPECIAL,
    SPECIAL_NON_BRACKET,
    DOES_NOT_FIRE_UPDATE_SELECTION,
    MOD,
}

type KeyStr = KeyStrBuilder<KBKey>[keyof KeyStrBuilder<KBKey>] | OnlyMods;
/** as compared to the branded type returned from Validator.ts */
type UnbrandedDigitStr = ToStr<Digit>;

type AlphaBase = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

/** note, this is a-z in either upper or lowercase, but oddly TS only shows it as the uppercase in the Inspector */
type Alpha = AlphaBase | Uppercase<AlphaBase>;

type ModKeyAll = typeof MOD[number];
type ModKey = Exclude<ModKeyAll, "control">; // NTS: only including the most elegant nomdeplume for each mod
// type ModPrefix<M extends ModKey> = `${M}-` | "";
type FunctionKey = typeof FN_KEYS[number];
type SpecialChar = typeof SPECIAL[number];
type EditingKey = typeof EDITING[number];
type NavKey = typeof NAV[number];
type UnusedKey = typeof UNUSED[number];
type DoesNotFireUpdateSelection = typeof DOES_NOT_FIRE_UPDATE_SELECTION[number];
type NumKey = UnbrandedDigitStr;

type KBKey = Alpha | NumKey | FunctionKey | SpecialChar | EditingKey | NavKey | UnusedKey;
type KBTextInput = Extract<KBKey, Alpha | NumKey | SpecialChar>; // i.e., when the user presses them, the text content changes directly
type KBNonTextInput = Exclude<KBKey, KBTextInput>; // i.e., function + editing + nav
type OpenBracket = Extract<SpecialChar, "(" | "[" | "{" | "<">
type CloseBracket = Extract<SpecialChar, ")" | "]" | "}" | ">">
type SpecialNonBracket = Exclude<SpecialChar, OpenBracket | CloseBracket>;

type KeyStrBuilder<K extends KBKey> = {
		"plain": K;
		// Single modifiers
		"ctrl": `ctrl-${K}`;
		"alt": `alt-${K}`;
		"shift": `shift-${K}`;
		
		// Double modifiers (following standard order)
		"ctrl-alt": `ctrl-alt-${K}`;
		"ctrl-shift": `ctrl-shift-${K}`;
		"alt-shift": `alt-shift-${K}`;
		
		// Triple modifier
		"ctrl-alt-shift": `ctrl-alt-shift-${K}`;
};

type OnlyMods = "ctrl" | "alt" | "shift" | "ctrl-alt" | "ctrl-shift" | "alt-shift" | "ctrl-alt-shift"; // TODO: add non-Winderz

const FN_KEYS = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12"] as const;
const SPECIAL = [
    "+", "-", "=", "/", "\\", "?", ".", ",", ";", ":", "'", "\"", "`", 
    "[", "]", "{", "}", "(", ")", "<", ">", 
    "~", "!", "@", "#", "$", "%", "^", "&", "*"
] as const;
const SPECIAL_NON_BRACKET = [
    "+", "-", "=", "/", "\\", "?", ".", ",", ";", ":", "'", "\"", "`", 
    "~", "!", "@", "#", "$", "%", "^", "&", "*"
] as const;
const EDITING = ["tab", "backspace", "delete", "insert", "enter", "escape", " "] as const;
const NAV = ["arrowup", "arrowdown", "arrowleft", "arrowright", "home", "end", "pageup", "pagedown"] as const;
const UNUSED = ["printscreen", "scrolllock", "pausebreak", "numlock", "capslock", "contextmenu", "meta"] as const;
const MOD = ["ctrl", "alt", "shift"] as const; // removed "control" to match the type, which has done the same
const DOES_NOT_FIRE_UPDATE_SELECTION = ["ctrl-arrowup" , "ctrl-arrowdown" , "ctrl-arrowleft" , "ctrl-arrowright" , "ctrl-a" , "ctrl-shift-arrowup" , "ctrl-shift-arrowdown" , "ctrl-shift-arrowleft" , "ctrl-shift-arrowright"] as const;
const OPEN_BRACKET = ["(", "<", "[", "{"] as const;
const CLOSE_BRACKET = [")", ">", "]", "}"] as const;