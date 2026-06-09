<script lang="ts">
	import {
		checkAnswers,
		shuffleOccurrences,
		type OccurrencePair
	} from "$lib/domains/entitite/occurrence-pair";
	import type { OccurenceType } from "./occurence-type";
	import OccurrenceList from "./occurrence-list.svelte";

	interface Props {
		occurencesPairs: OccurrencePair[];
	}

	let { occurencesPairs }: Props = $props();

	let dragIndex = $state<number | null>(null);
	let dragOccurenceType = $state<OccurenceType | null>(null);

	// svelte-ignore state_referenced_locally
	const shuffledOccurrences = shuffleOccurrences(occurencesPairs);

	let occurrences1 = $state<string[]>(shuffledOccurrences.occurrences1);
	let occurrences2 = $state<string[]>(shuffledOccurrences.occurrences2);

	function handleDragStart(event: DragEvent, index: number, occurenceType: OccurenceType) {
		dragIndex = index;
		dragOccurenceType = occurenceType;
		if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
	}

	function handleDragOver(event: DragEvent, index: number, occurenceType: OccurenceType) {
		event.preventDefault();

		if (!occurenceType || dragOccurenceType !== occurenceType) return;
		if (!dragIndex || dragIndex === index) return;

		const swapOccurrences = (occurrences: string[], dragIndex: number, index: number) => {
			const updatedOccurrences = [...occurrences];
			const [moved] = updatedOccurrences.splice(dragIndex, 1);
			updatedOccurrences.splice(index, 0, moved);
			return updatedOccurrences;
		};

		if (dragOccurenceType === "left") {
			occurrences1 = swapOccurrences(occurrences1, dragIndex, index);
		} else if (dragOccurenceType === "right") {
			occurrences2 = swapOccurrences(occurrences2, dragIndex, index);
		}

		dragIndex = index;
	}

	function handleDragEnd() {
		dragIndex = null;
		dragOccurenceType = null;
	}

	let answerable = $state(true);

	let correctPositionPairCount = $state(0);
	let correctPairCount = $state(0);

	let message = $derived(
		(() => {
			if (!answerable) return "";
			return `${correctPairCount}件のペアが成立`;
		})()
	);

	function handleAnswerButtonClick() {
		({ correctPositionPairCount, correctPairCount } = checkAnswers(
			occurencesPairs,
			occurrences1,
			occurrences2
		));
		if (correctPositionPairCount === occurencesPairs.length) {
			alert("正解です");
		}
	}

	function handleShowAnswerButtonClick() {
		occurrences1 = occurencesPairs.map((pair) => pair.occurrence1);
		occurrences2 = occurencesPairs.map((pair) => pair.occurrence2);
		answerable = false;
	}
</script>

<div>
	<div class="flex gap-2">
		<OccurrenceList
			occurences={occurrences1}
			occurenceType="left"
			{handleDragOver}
			{handleDragStart}
			{handleDragEnd}
		/>
		<OccurrenceList
			occurences={occurrences2}
			occurenceType="right"
			{handleDragOver}
			{handleDragStart}
			{handleDragEnd}
		/>
	</div>

	<p class="mt-2">{message}</p>

	<div class="flex gap-2 mt-4">
		<button onclick={handleAnswerButtonClick} disabled={!answerable}>回答する</button>
		<button onclick={handleShowAnswerButtonClick}>回答を見る</button>
	</div>
</div>
