<script lang="ts">
    import { finalAsserter as ASSERT } from "$lib/anotherScratcher.js";
    import { onMount } from "svelte";

    const val = {} as unknown;

    function someTypeguard(v: unknown): v is number {
        return false;
    }

    function anotherTypeguard(v: unknown): v is Array<string> {
        return false;
    }
    
    onMount(() => {
        try {
            // ASSERT(val, "arr", "arrNum");
            // ASSERT(val, "num"); // works
            // ASSERT(val, someTypeguard); // generic does not pick it up
            ASSERT(val, "expected str or num or arrstr", someTypeguard, anotherTypeguard); //, "str");
            val;

            // TODO
            // finalAsserter<string>(val, true);
            // val; // string
            // finalAsserter<string | number>(val, () => true);
            // val; // string | number
            // finalAsserter(val, isStr);
            // val; // string
            // finalAsserter(val, "arr", isStr, isNum, (v: unknown): v is object => typeof v === "object");
            // val; // string | number | object | unknown[]

            // // ✔️ fails with "no valid refiner provided"
            // finalAsserter(val);
            // val; // never
        } catch (e) {
            throw new Error(String(e))
        }
    })
</script>