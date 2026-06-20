<script lang="ts">
	import { createTitle } from "$lib/domains/entitite/question.js";

	let { data } = $props();
</script>

<div class="container mx-auto mt-6 px-4 max-w-4xl">
	<h1 class="font-bold text-2xl text-center mb-6">Myクイズ</h1>

	<div class="space-y-3">
		{#each data.questions as question}
			<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
				<div class="card-body">
					<div class="flex justify-between items-center">
						<div class="flex-1">
							<h2 class="card-title text-lg mb-2">
								<a href={`/editor/${question.id}`} class="link link-primary hover:link-accent">
									{createTitle(question)}
								</a>
							</h2>
							<p class="text-sm text-base-content/70">
								{question.description ?? "説明はありません"}
							</p>
						</div>
						<div class="flex-none">
							<!-- svelte-ignore a11y_consider_explicit_label -->
							<button
								class="btn btn-circle btn-ghost"
								onclick={() => {
									alert("クイズの削除機能は今後実装予定です");
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
