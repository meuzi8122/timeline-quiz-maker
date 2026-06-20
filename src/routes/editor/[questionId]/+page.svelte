<script lang="ts">
	import type { OccurrencePair } from "$lib/domains/entitite/occurrence-pair";
	import { updateQuestionSchema } from "./schema";
	import { untrack } from "svelte";

	let { data } = $props();

	let theme1 = $state($state.snapshot(untrack(() => data.question.theme1)));
	let theme2 = $state($state.snapshot(untrack(() => data.question.theme2)));
	let description = $state($state.snapshot(untrack(() => data.question.description)));
	let occurencesPairs = $state<Omit<OccurrencePair, "id">[]>(
		untrack(() => data.question.occurrencePairs)
	);

	let errors = $state<Record<string, string[] | undefined>>({
		theme1: [],
		theme2: [],
		description: [],
		occurrencePairs: []
	});

	function handleAddButtonClick() {
		occurencesPairs = [...occurencesPairs, { occurredAt: "", occurrence1: "", occurrence2: "" }];
	}

	function handleDeleteButtonClick(index: number) {
		occurencesPairs = occurencesPairs.filter((_, i) => i !== index);
	}

	async function handleSubmitButtonClick(isDraft: boolean) {
		const formData = new FormData();

		formData.append("theme1", theme1);
		formData.append("theme2", theme2);
		formData.append("description", description);
		formData.append("occurrencePairs", JSON.stringify(occurencesPairs));
		formData.append("isDraft", isDraft.toString());

		const submission = updateQuestionSchema.safeParse(Object.fromEntries(formData.entries()));
		if (!submission.success) {
			errors = submission.error.flatten().fieldErrors;
			return;
		}

		try {
			await fetch(`/editor/${data.question.id}`, {
				method: "POST",
				body: formData
			});
		} catch (error) {
			alert("クイズの更新に失敗しました。時間を置いて再度お試しください。");
		}

		alert(isDraft ? "下書きとして保存しました！" : "クイズを更新しました！");
		history.back();
	}
</script>

<div class="container mx-auto px-4 max-w-4xl mt-6">
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h1 class="card-title text-2xl justify-center mb-6">クイズを編集</h1>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">お題1</legend>
					<input
						type="text"
						class="input input-bordered w-full"
						placeholder="オモコロ"
						bind:value={theme1}
					/>
					{#if errors.theme1}<p class="label text-error">{errors.theme1[0]}</p>{/if}
				</fieldset>
				<fieldset class="fieldset w-full">
					<legend class="fieldset-legend">お題2</legend>
					<input
						type="text"
						class="input input-bordered w-full"
						placeholder="マンガ"
						bind:value={theme2}
					/>
					{#if errors.theme2}<p class="label text-error">{errors.theme2[0]}</p>{/if}
				</fieldset>
			</div>

			<fieldset class="fieldset w-full mb-6">
				<legend class="fieldset-legend">クイズについての説明（任意）</legend>
				<textarea
					class="textarea textarea-bordered h-24 w-full"
					placeholder="同時期に起こったオモコロと漫画の出来事を当てるクイズです。"
					bind:value={description}
				></textarea>
				{#if errors.description}<p class="label text-error">{errors.description[0]}</p>{/if}
			</fieldset>

			<div class="mb-6">
				<h3 class="text-lg font-semibold mb-4 flex items-center">
					出来事
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						type="button"
						class="btn btn-xs btn-ghost btn-circle"
						onclick={handleAddButtonClick}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</h3>
				<div class="space-y-4">
					{#each occurencesPairs as pair, index}
						<div class="bg-base-200 p-4 rounded-lg">
							<div class="flex flex-col lg:flex-row gap-3">
								<input
									type="text"
									class="input input-bordered lg:w-32"
									placeholder="2026/1"
									bind:value={pair.occurredAt}
								/>
								<input
									type="text"
									class="input input-bordered flex-1"
									placeholder="原宿が自分の卒アルをネットに曝す"
									bind:value={pair.occurrence1}
								/>
								<input
									type="text"
									class="input input-bordered flex-1"
									placeholder="トリコが小松と出会う"
									bind:value={pair.occurrence2}
								/>
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button
									type="button"
									class="btn btn-outline"
									onclick={() => handleDeleteButtonClick(index)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
						</div>
					{/each}
				</div>

				{#if errors.occurrencePairs && errors.occurrencePairs.length > 0}
					<div class="alert alert-error mt-3">
						<span>日付か出来事が未入力の箇所があります</span>
					</div>
				{/if}

				<div class="flex gap-3 justify-end mt-6">
					<button
						type="button"
						class="btn btn-outline"
						onclick={() => handleSubmitButtonClick(true)}
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
								d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
							/>
						</svg>

						下書きとして保存
					</button>
					<button
						type="button"
						class="btn btn-primary"
						onclick={() => handleSubmitButtonClick(false)}
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
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
						クイズを更新
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
