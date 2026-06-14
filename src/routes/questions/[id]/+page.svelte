<script lang="ts">
	import OccurrenceList from "$lib/components/occurrence-list/occurrence-list.svelte";

	let { data } = $props();
</script>

<div class="container mx-auto mt-4">
	<OccurrenceList question={data.question} occurencesPairs={data.question.occurrencePairs} />
</div>
