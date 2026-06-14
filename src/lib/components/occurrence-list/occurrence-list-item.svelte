<script lang="ts">
	export type OccurrenceType = "theme1" | "theme2";

	type Props = {
		occurrence: string;
		index: number;
		occurrenceType: OccurrenceType;
		occurredAt?: string;
		handleDragStart(event: DragEvent, index: number, occurrenceType: OccurrenceType): void;
		handleDragOver(event: DragEvent, occurrenceType: OccurrenceType): void;
		handleDragEnd: () => void;
		handleDrop(event: DragEvent, index: number, occurrenceType: OccurrenceType): void;
	};

	let {
		occurrence,
		index,
		occurrenceType,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
		handleDrop
	}: Props = $props();
</script>

<div
	class={`w-full block p-4 border border-gray-500 rounded text-center cursor-pointer ${occurrenceType === "theme2" ? "bg-blue-500" : "bg-red-600"}`}
	draggable="true"
	role="listitem"
	ondragstart={(e) => handleDragStart(e, index, occurrenceType)}
	ondragover={(e) => handleDragOver(e, occurrenceType)}
	ondragend={handleDragEnd}
	ondrop={(e) => handleDrop(e, index, occurrenceType)}
>
	{occurrence}
</div>
