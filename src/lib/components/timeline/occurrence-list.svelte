<script lang="ts">
	import type { OccurenceType } from "./occurence-type";

	type Props = {
		theme: string;
		occurences: string[];
		occurenceType: OccurenceType;
		handleDragStart(event: DragEvent, index: number, occurenceType: OccurenceType): void;
		handleDragOver(event: DragEvent, index: number, occurenceType: OccurenceType): void;
		handleDragEnd: () => void;
	};

	let { theme, occurences, occurenceType, handleDragStart, handleDragOver, handleDragEnd }: Props =
		$props();
</script>

<div class="flex flex-col">
	<h2 class="text-xl font-bold mb-2 text-center">{theme}</h2>
	<ul>
		{#each occurences as occurrence, index}
			<li
				class={`p-4 border border-gray-200 rounded mb-2 text-center ${occurenceType === "theme2" ? "bg-blue-100" : "bg-red-100"}`}
				draggable="true"
				ondragstart={(e) => handleDragStart(e, index, occurenceType)}
				ondragover={(e) => handleDragOver(e, index, occurenceType)}
				ondragend={handleDragEnd}
			>
				{occurrence}
			</li>
		{/each}
	</ul>
</div>
