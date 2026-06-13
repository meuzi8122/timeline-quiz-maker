<script lang="ts">
	import { goto } from "$app/navigation";
	import type { OccurrencePair } from "$lib/domains/entitite/occurrence-pair";
	import { newQuestionSchema } from "./schema";

	let title = $state("");
	let theme1 = $state("");
	let theme2 = $state("");
	let occurencesPairs = $state<Omit<OccurrencePair, "id">[]>([]);

	let errors = $state<Record<string, string[] | undefined>>({
		title: [],
		theme1: [],
		theme2: [],
		occurrencePairs: []
	});

	function handleAddButtonClick() {
		occurencesPairs = [...occurencesPairs, { date: "", occurrence1: "", occurrence2: "" }];
	}

	function handleDeleteButtonClick(index: number) {
		occurencesPairs = occurencesPairs.filter((_, i) => i !== index);
	}

	async function handleSubmitButtonClick() {
		const formData = new FormData();

		formData.append("title", title);
		formData.append("theme1", theme1);
		formData.append("theme2", theme2);
		formData.append("occurrencePairs", JSON.stringify(occurencesPairs));

		const submission = newQuestionSchema.safeParse(Object.fromEntries(formData.entries()));
		if (!submission.success) {
			errors = submission.error.flatten().fieldErrors;
			return;
		}

		try {
			await fetch("/editor/new", {
				method: "POST",
				body: formData
			});
		} catch (error) {
			alert("クイズの投稿に失敗しました。時間を置いて再度お試しください。");
		}

		alert("クイズを投稿しました！");
		goto("/");
	}
</script>

<div class="container mx-auto flex flex-col gap-2 mt-4">
	<h1 class="text-xl font-bold">クイズを投稿</h1>
	<fieldset class="fieldset">
		<legend class="fieldset-legend">クイズタイトル</legend>
		<input type="text" class="input w-full" placeholder="オモコロ" bind:value={title} />
		{#if errors.title}<p class="label text-red-500">{errors.title[0]}</p>{/if}
	</fieldset>
	<div class="flex gap-2">
		<fieldset class="fieldset w-full">
			<legend class="fieldset-legend">お題1</legend>
			<input type="text" class="input w-full" placeholder="オモコロ" bind:value={theme1} />
			{#if errors.theme1}<p class="label text-red-500">{errors.theme1[0]}</p>{/if}
		</fieldset>
		<fieldset class="fieldset w-full">
			<legend class="fieldset-legend">お題2</legend>
			<input type="text" class="input w-full" placeholder="マンガ" bind:value={theme2} />
			{#if errors.theme2}<p class="label text-red-500">{errors.theme2[0]}</p>{/if}
		</fieldset>
	</div>
	<div class="flex flex-col gap-2">
		<span class="text-[12px] font-semibold block leading-normal">出来事</span>
		<div class="flex flex-col gap-2">
			{#each occurencesPairs as pair, index}
				<div class="flex gap-2">
					<input type="text" class="input" placeholder="2026/1" bind:value={pair.date} />
					<input
						type="text"
						class="input flex-1"
						placeholder="原宿が自分の卒アルをネットに晒す"
						bind:value={pair.occurrence1}
					/>

					<input
						type="text"
						class="input flex-1"
						placeholder="トリコが小松と出会う"
						bind:value={pair.occurrence2}
					/>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button type="button" class="btn" onclick={() => handleDeleteButtonClick(index)}>
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
			{/each}
		</div>
		{#if errors.occurrencePairs && errors.occurrencePairs.length > 0}<p
				class="text-red-500 text-[12px] block leading-normal"
			>
				日付か出来事が未入力の箇所があります
			</p>{/if}
		<div class="flex gap-2 justify-end mt-5">
			<button type="button" class="btn" onclick={handleAddButtonClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
				</svg>
				出来事を追加
			</button>
			<button type="button" class="btn btn-primary" onclick={handleSubmitButtonClick}>
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
						d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
					/>
				</svg>

				クイズを投稿</button
			>
		</div>
	</div>
</div>
