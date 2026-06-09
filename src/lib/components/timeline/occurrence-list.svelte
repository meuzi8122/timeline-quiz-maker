<script lang="ts">
	import type { OccurenceType } from "./occurence-type";

	type Props = {
		occurences: string[];
		occurenceType: OccurenceType;
		handleDragStart(event: DragEvent, index: number, occurenceType: OccurenceType): void;
		handleDragOver(event: DragEvent, index: number, occurenceType: OccurenceType): void;
		handleDragEnd: () => void;
	};

	let { occurences, occurenceType, handleDragStart, handleDragOver, handleDragEnd }: Props =
		$props();
</script>

<ul>
	{#each occurences as occurrence, index}
		<li
			class="p-4 border rounded mb-2"
			draggable="true"
			ondragstart={(e) => handleDragStart(e, index, occurenceType)}
			ondragover={(e) => handleDragOver(e, index, occurenceType)}
			ondragend={handleDragEnd}
		>
			{occurrence}
		</li>
	{/each}
</ul>
