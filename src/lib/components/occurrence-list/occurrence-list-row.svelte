<script lang="ts">
	import OccurrenceListItem, { type OccurrenceType } from "./occurrence-list-item.svelte";

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
		answerable
	}: Props = $props();
</script>

<div class="grid grid-cols-[4rem_1fr_1fr] gap-2 items-center mb-2">
	<div>{answerable ? "????/??" : occurredAt}</div>
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
