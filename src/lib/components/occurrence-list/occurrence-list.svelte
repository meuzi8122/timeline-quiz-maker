<script lang="ts">
	import {
		checkAnswers,
		shuffleOccurrences,
		type OccurrencePair
	} from "$lib/domains/entitite/occurrence-pair";
	import { createTitle, type Question } from "$lib/domains/entitite/question";
	import type { OccurrenceType } from "./occurrence-list-item.svelte";
	import OccurrenceListRow from "./occurrence-list-row.svelte";

	interface Props {
		question: Question;
		occurencesPairs: OccurrencePair[];
	}

	let { question, occurencesPairs }: Props = $props();

	let dragIndex = $state<number | null>(null);
	let dragOccurrenceType = $state<OccurrenceType | null>(null);

	// svelte-ignore state_referenced_locally
	const shuffledOccurrences = shuffleOccurrences(occurencesPairs);

	let occurrences1 = $state<string[]>(shuffledOccurrences.occurrences1);
	let occurrences2 = $state<string[]>(shuffledOccurrences.occurrences2);

	function handleDragStart(event: DragEvent, index: number, occurrenceType: OccurrenceType) {
		dragIndex = index;
		dragOccurrenceType = occurrenceType;
		if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
	}

	function handleDragOver(event: DragEvent, occurrenceType: OccurrenceType) {
		event.preventDefault();
		if (dragOccurrenceType && dragOccurrenceType === occurrenceType) {
			if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
		}
	}

	function handleDrop(event: DragEvent, index: number, occurrenceType: OccurrenceType) {
		event.preventDefault();

		if (!occurrenceType || dragOccurrenceType !== occurrenceType) return;
		if (dragIndex === null || dragIndex === index) return;

		const swapOccurrences = (occurrences: string[], dragIndex: number, index: number) => {
			const updatedOccurrences = [...occurrences];
			const [moved] = updatedOccurrences.splice(dragIndex, 1);
			updatedOccurrences.splice(index, 0, moved);
			return updatedOccurrences;
		};

		if (dragOccurrenceType === "theme1") {
			occurrences1 = swapOccurrences(occurrences1, dragIndex, index);
		} else if (dragOccurrenceType === "theme2") {
			occurrences2 = swapOccurrences(occurrences2, dragIndex, index);
		}
	}

	function handleDragEnd() {
		dragIndex = null;
		dragOccurrenceType = null;
	}

	let answerable = $state(true);

	let correctPositionPairIndexes = $state(new Set<number>());
	let correctPairCount = $state(0);

	let message = $derived(
		(() => {
			if (!answerable) return "";
			return `${correctPairCount}件のペアが成立`;
		})()
	);

	function handleAnswerButtonClick() {
		({ correctPositionPairIndexes, correctPairCount } = checkAnswers(
			occurencesPairs,
			occurrences1,
			occurrences2
		));
		if (correctPositionPairIndexes.size === occurencesPairs.length) {
			alert("正解です");
			answerable = false;
		}
	}

	function handleShowAnswerButtonClick() {
		occurrences1 = occurencesPairs.map((pair) => pair.occurrence1);
		occurrences2 = occurencesPairs.map((pair) => pair.occurrence2);
		answerable = false;
	}
</script>

<div class="flex flex-col items-center mt-6">
	<h1 class="text-xl font-bold mb-4 text-center">
		{createTitle(question)}
	</h1>
	<div class="flex flex-col">
		{#each occurrences1 as occurrence1, index}
			<OccurrenceListRow
				{index}
				occurredAt={occurencesPairs[index].occurredAt}
				{occurrence1}
				occurrence2={occurrences2[index]}
				{handleDragOver}
				{handleDragStart}
				{handleDragEnd}
				{handleDrop}
				{answerable}
				{correctPositionPairIndexes}
			/>
		{/each}
	</div>

	{#if message}<p class="mt-5">{message}</p>{/if}

	<div class="flex gap-2 mt-4">
		<button class="btn btn-primary" onclick={handleAnswerButtonClick} disabled={!answerable}
			>回答する</button
		>
		<button class="btn btn-warning" onclick={handleShowAnswerButtonClick}>正解を見る</button>
	</div>
</div>
