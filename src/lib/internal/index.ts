import type { FiniteNumber } from "$lib/internal/types.js";
import type { KeyStr, ModKey } from "$lib/kb/typesAndConsts.js";

export {
    toCamelCase,
    isComparableNumber,
    capitalise,
    getTypedEntries,
    modsFromKeyStr,
}

const getTypedEntries = <T extends object>(obj: T): Array<[keyof T, T[keyof T]]> => Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

const isComparableNumber = (v: unknown): v is FiniteNumber => {
    const res = (typeof v === "number") && Number.isFinite(v);
    return res;
}

const toCamelCase = (str: string) => str.charAt(0).toLowerCase() + (toTitleCase(str).replaceAll(" ", "")).slice(1);
const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

function toTitleCase(str: string): string {
    if (str.includes(" ")) return simpleToTitlecase(str);
    return complexToTitleCase(str);
}

function complexToTitleCase(str: string): string {
    if (!str) return str;

    if (
        str.includes('-') // kebab
        || str.includes('_') // snek
    ) {
        return str
            .split(/[-_]/)
            // .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    
    // handle camel && pascal
    const words = str
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split at uppercase to uppercase transitions when followed by lowercase
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    
    return words
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function simpleToTitlecase(str: string): string {
    return str.split(" ").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

function modStateFromKeyStr(keyStr: KeyStr): { ctrl: boolean, shift: boolean, alt: boolean } {
	const keyArr = keyStr.split("-");
	return {
		ctrl: keyArr.includes("ctrl"),
		shift: keyArr.includes("shift"),
		alt: keyArr.includes("alt")
	};
}

function modsFromKeyStr(keyStr: KeyStr): Array<ModKey> {
	return compact(getTypedEntries(
		modStateFromKeyStr(keyStr))
		.map(([mod, bool]) => bool ? mod : null)
	);
}

function compact<T>(arr: Array<T>): Array<NonNullable<T>> {
    return arr.filter(Boolean) as any;
}