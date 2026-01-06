import { isStr } from "$lib/index.js";
import type { ValidatorFn } from "felixtypes";
import * as KB_STUFF from "../is/index.js";

export {
    assertAlpha,
    assertInputKey,
    assertNonInputKey,
    assertKBKey,
    assertFnKey,
    assertUnusedKey,
    assertEditingKey,
    assertNavKey,
    assertSpecialChar,
    assertSpecialNonBracket,
    assertModKey,
    assertOpenBracket,
    assertCloseBracket,
    assertNumKey,
}

type KbIden = keyof typeof KB_STUFF;

type Kb_InferValidatedType<K extends KbIden> = 
    typeof KB_STUFF[K] extends ValidatorFn<infer T, string>
        ? T 
        : never;

type Kb_Asserter<R extends keyof typeof KB_STUFF> = (v: string) => asserts v is Kb_InferValidatedType<R>;

const assertAlpha: Kb_Asserter<"isAlpha"> = getKbAsserter("isAlpha");
const assertInputKey: Kb_Asserter<"isInputKey"> = getKbAsserter("isInputKey");
const assertNonInputKey: Kb_Asserter<"isNonInputKey"> = getKbAsserter("isNonInputKey");
const assertKBKey: Kb_Asserter<"isKBKey"> = getKbAsserter("isKBKey");
const assertFnKey: Kb_Asserter<"isFunctionKey"> = getKbAsserter("isFunctionKey");
const assertUnusedKey: Kb_Asserter<"isUnusedKey"> = getKbAsserter("isUnusedKey");
const assertEditingKey: Kb_Asserter<"isEditingKey"> = getKbAsserter("isEditingKey");
const assertNavKey: Kb_Asserter<"isNavKey"> = getKbAsserter("isNavKey");
const assertSpecialChar: Kb_Asserter<"isSpecialChar"> = getKbAsserter("isSpecialChar");
const assertSpecialNonBracket: Kb_Asserter<"isSpecialNonBracket"> = getKbAsserter("isSpecialNonBracket");
const assertModKey: Kb_Asserter<"isModKey"> = getKbAsserter("isModKey");
const assertOpenBracket: Kb_Asserter<"isOpenBracket"> = getKbAsserter("isOpenBracket");
const assertCloseBracket: Kb_Asserter<"isCloseBracket"> = getKbAsserter("isCloseBracket");
const assertNumKey: Kb_Asserter<"isNumKey"> = getKbAsserter("isNumKey");

function getKbAsserter<const K extends keyof typeof KB_STUFF>(type: K) {
    const refiner = KB_STUFF[type];
    
    return (v: unknown) => {
        const err = `expected type: "${type.slice(2)}", received value: "${v}"`; // TODO ehhh... getPrettyValIden(type)... mebbe;
        if (!isStr(v)) throw new Error(err);
        if (!refiner(v)) throw new Error(err);
    }
}