<script lang="ts">
	import { createTitle } from "$lib/domains/entitite/question.js";

	let { data } = $props();

	let keyword = $state("");
</script>

<div class="container mx-auto mt-6 px-4 max-w-4xl">
	<h1 class="font-bold text-2xl text-center mb-6">クイズを探す</h1>

	<div class="flex justify-center mb-6">
		<label class="input input-bordered w-full max-w-md">
			<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<g
					stroke-linejoin="round"
					stroke-linecap="round"
					stroke-width="2.5"
					fill="none"
					stroke="currentColor"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.3-4.3"></path>
				</g>
			</svg>
			<input
				type="search"
				class="grow w-full"
				placeholder="キーワードで絞り込む"
				bind:value={keyword}
			/>
		</label>
	</div>

	<div class="space-y-3">
		{#each data.questions as question}
			{#if question.theme1.includes(keyword) || question.theme2.includes(keyword) || question.description?.includes(keyword)}
				<div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
					<div class="card-body">
						<div class="flex justify-between items-center">
							<div class="flex-1">
								<h2 class="card-title text-lg mb-2">
									<a href={`/questions/${question.id}`} class="link link-primary hover:link-accent">
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
										alert("クイズのブックマーク機能は今後実装予定です");
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
											d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
