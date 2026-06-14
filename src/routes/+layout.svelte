<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import Navbar from "$lib/components/layout/navbar.svelte";
	import "./layout.css";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /><title>一方その頃</title></svelte:head>
<Navbar />
{@render children()}
