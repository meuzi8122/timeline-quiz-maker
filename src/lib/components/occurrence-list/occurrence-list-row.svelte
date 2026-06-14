<script lang="ts">
	import OccurrenceListItem, { type OccurrenceType } from "./occurrence-list-item.svelte";
	import { fly } from "svelte/transition";

	type Props = {
		index: number;
		occurredAt: string;
		occurrence1: string;
		occurrence2: string;
		handleDragStart(event: DragEvent, index: number, occurrenceType: OccurrenceType): void;
		handleDragOver(event: DragEvent, occurrenceType: OccurrenceType): void;
		handleDragEnd: () => void;
		handleDrop(event: DragEvent, index: number, occurrenceType: OccurrenceType): void;
		answerable: boolean;
		correctPositionPairIndexes: Set<number>;
	};

	let {
		index,
		occurredAt,
		occurrence1,
		occurrence2,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
		handleDrop,
		answerable,
		correctPositionPairIndexes
	}: Props = $props();
</script>

<!-- アニメーションを有効にするため、三項演算子ではなくif-elseブロックで条件分岐 -->
<div class="grid grid-cols-[4rem_1fr_1fr] gap-2 items-center mb-2">
	{#if correctPositionPairIndexes.has(index) || !answerable}
		<div transition:fly={{ y: 20, duration: 700 }}>{occurredAt}</div>
	{:else}
		<div>????/??</div>
	{/if}
	<OccurrenceListItem
		occurrence={occurrence1}
		{index}
		occurrenceType="theme1"
		{handleDragStart}
		{handleDragOver}
		{handleDragEnd}
		{handleDrop}
	/>
	<OccurrenceListItem
		occurrence={occurrence2}
		{index}
		occurrenceType="theme2"
		{handleDragStart}
		{handleDragOver}
		{handleDragEnd}
		{handleDrop}
	/>
</div>
