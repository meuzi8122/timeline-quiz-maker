<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto">
	{#each data.questions as question}
		<a href={`/questions/${question.id}`}>
			{question.title}
		</a>
	{/each}
</div>
