<script lang="ts">
	let { children } = $props();
</script>

<nav>
	<a href="/">validator</a>
	<!-- <a href="/about">about</a> -->
</nav>

{@render children()}