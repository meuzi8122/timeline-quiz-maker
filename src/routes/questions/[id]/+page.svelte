<script lang="ts">
	import Timeline from "$lib/components/timeline/timeline.svelte";

	let { data } = $props();
</script>

<div class="container mx-auto mt-4">
	<Timeline question={data.question} occurencesPairs={data.question.occurrencePairs} />
</div>
