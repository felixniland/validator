<script lang="ts">
    import { getAsserter } from "$lib/assert/get/getAsserter.js";
    import { WIP_DO_NOT_EXPORT_sneakyAsserter as sneakyAsserter } from "$lib/assert/sneaky/index.js";
    import { onMount } from "svelte";

    function supremeDangerNoodle() {
        const snek = sneakyAsserter("arr", "arrBool", "obj"); // const snek: (v: unknown) => object | unknown[] | boolean[]
        const someObj = {}; // type = {}
        const validType = snek(someObj); // type = object | unknown[] | boolean[]

        const someStr = "snape, snape, severus snape";
        const invalidType = snek(someStr); // type = object | unknown[] | boolean[], i.e., the exact same as above; whereas a 'true' TS asserter would 
    }

    function doubleAllocateAsserterShennanigans() {
        const someVal = "hey";

        const someAsserter = getAsserter("arr", "arrStr");
        // someAsserter(someVal); // ERROR

        type Asserter = typeof someAsserter;
        const typedAsserter: Asserter = someAsserter;
        typedAsserter(someVal); // NO ERROR LMAO
    }

    onMount(() => {
        // supremeDangerNoodle();
    })
</script>