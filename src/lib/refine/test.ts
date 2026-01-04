// import * as IsIndividual from "../is/individual/index.js";
// import { getRelatedRefiner, type InferValidatedType } from "./index.js";

/** "getRelatedRefiner" */
// const TEST_TYPED_MULTI_REFINER = getRelatedRefiner<string>()("dateStr", "digitStr", (s: string): s is "cool" => s === "cool");
// expect "const TEST_TYPED_MULTI_REFINER: (v: string) => v is DigitStr | DateStr | "cool""

// type TEST_ONE_InferValidated = InferValidatedType<"arr">; // expect unknown[]
// type TEST_TWO_InferValidated = InferValidatedType<"str">; // expect string
// type TEST_THREE_InferValidated = InferValidatedType<"el">; // expect Element