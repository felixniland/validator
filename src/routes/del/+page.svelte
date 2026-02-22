<script lang="ts">
    import { ASSERT } from "$lib/index.js";
    import { onMount } from "svelte";

    const someVal = "Pikachu" as unknown;

    function validator(v: unknown): v is "Pikachu" {
        return false;
        // return (isStr(v) && v === "Pikachu");
    }

    onMount(() => {
        ASSERT(someVal, "arr", "arrNum", validator);
        someVal;
    })
</script>