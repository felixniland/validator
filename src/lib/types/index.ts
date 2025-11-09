import type { MakeBrandedType } from "$lib/internal/types.js";

export type {
    FiniteNumber,
    Digit,
    DigitStr,
    NumKey,
    DateStr,
    BoolNum,
    ContentEditableElement,
    HTMLListElement,
}

type FiniteNumber = MakeBrandedType<number, "FiniteNumber">;
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type DigitStr = MakeBrandedType<NumKey, "DigitStr">;
type NumKey = `${Digit}`; // i.e., unbranded DigitStr
type DateStr = MakeBrandedType<string, "DateStr">;
type BoolNum = 0 | 1;

type ContentEditableElement = Omit<HTMLElement, "contenteditable"> & {
    isContentEditable: true;
}

type HTMLListElement = HTMLUListElement | HTMLOListElement;