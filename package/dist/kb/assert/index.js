import { isStr } from "../../index.js";
import * as KB_STUFF from "../is/index.js";
export { assertAlpha, assertInputKey, assertNonInputKey, assertKBKey, assertFnKey, assertUnusedKey, assertEditingKey, assertNavKey, assertSpecialChar, assertSpecialNonBracket, assertModKey, assertOpenBracket, assertCloseBracket, assertNumKey, };
const assertAlpha = getKbAsserter("isAlpha");
const assertInputKey = getKbAsserter("isInputKey");
const assertNonInputKey = getKbAsserter("isNonInputKey");
const assertKBKey = getKbAsserter("isKBKey");
const assertFnKey = getKbAsserter("isFunctionKey");
const assertUnusedKey = getKbAsserter("isUnusedKey");
const assertEditingKey = getKbAsserter("isEditingKey");
const assertNavKey = getKbAsserter("isNavKey");
const assertSpecialChar = getKbAsserter("isSpecialChar");
const assertSpecialNonBracket = getKbAsserter("isSpecialNonBracket");
const assertModKey = getKbAsserter("isModKey");
const assertOpenBracket = getKbAsserter("isOpenBracket");
const assertCloseBracket = getKbAsserter("isCloseBracket");
const assertNumKey = getKbAsserter("isNumKey");
function getKbAsserter(type) {
    const refiner = KB_STUFF[type];
    return (v) => {
        const err = `expected type: "${type.slice(2)}", received value: "${v}"`; // TODO ehhh... getPrettyValIden(type)... mebbe;
        if (!isStr(v))
            throw new Error(err);
        if (!refiner(v))
            throw new Error(err);
    };
}
