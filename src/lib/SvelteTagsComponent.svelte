<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Parameters
	export let inputPlaceholderText: string = 'Add a tag';
	export let removeTagButtonText: string = '✕';
	export let addTagKey: string = 'Enter';
	export let showAddButton: boolean = false;
	export let addButtonText: string = 'Add Tag';
	export let showClearAllButton: boolean = false;
	export let showClearAllText: string = 'Clear all';

	export let onlyUnique: boolean = false;
	export let showLabel: boolean = false;
	export let labelText: string = 'Tags';
	export let maximumTags: number = Infinity;

	// Let user provide classes for external styling
	export let componentWrapperClasses: string = '';
	export let allTagsWrapperClasses: string = '';
	export let tagsInputWrapperClasses: string = '';
	export let tagWrapperClasses: string = '';
	export let tagClasses: string = '';
	export let labelClasses: string = '';
	export let tagRemoveButtonClasses: string = '';
	export let inputClasses: string = '';
	export let addButtonClasses: string = '';
	export let clearAllButtonClasses: string = '';

	let inputValue: string = '';

	type TagsArray = string[];

	export let tags: TagsArray;
	const dispatch = createEventDispatcher<{ tags: TagsArray; input: TagsArray }>();

	// Create a unique-enough id to assign to the component
	const id = Number(new Date().getTime() + '000').toString(36);

	function addTag(value: string) {
		if (value && (!onlyUnique || !tags.includes(value)) && tags.length < maximumTags) {
			tags = [...tags, value];
			dispatch('input', tags);
		}
	}

	function addTagFromInput(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement | null;
		if (target && event.key === addTagKey) {
			addTag(target.value);
			target.value = '';
		}
	}

	function removeTag(index: number) {
		tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
		dispatch('input', tags);
	}

	function removeAllTags() {
		tags = [];
		dispatch('input', tags);
	}
</script>

<div class={`svelteUnstyledTagsWrapper ${componentWrapperClasses}`} {id}>
	<label
		for={`tagsInput-${id}`}
		class={showLabel ? `${labelClasses}` : `${labelClasses} screen-reader-only`}
	>
		{labelText}
	</label>

	<div class={`tagsInputWrapper ${tagsInputWrapperClasses}`}>
		<div class={`allTagsWrapper ${allTagsWrapperClasses}`} role="list">
			{#each tags as tag, index (`${id}-${index}`)}
				<div
					class={`tagWrapper ${tagWrapperClasses}`}
					role="listitem"
					data-tag={`${tag}`}
					data-index={index}
				>
					<span class={`tag ${tagClasses}`} data-tag-id={`${tag}-${index}`}>{tag}</span>
					<button
						class={`tagRemoveButton ${tagRemoveButtonClasses}`}
						on:click={() => removeTag(index)}>{removeTagButtonText}</button
					>
				</div>
			{/each}
		</div>

		<input
			id={`tagsInput-${id}`}
			class={`tagsInput ${inputClasses}`}
			bind:value={inputValue}
			on:keydown={addTagFromInput}
			type="text"
			placeholder={inputPlaceholderText}
		/>
		{#if showAddButton}
			<button
				class={`addTagButton ${addButtonClasses}`}
				on:click={() => {
					addTag(inputValue);
					inputValue = '';
				}}
			>
				{addButtonText}
			</button>
		{/if}

		{#if showClearAllButton}
			<button
				class={`clearAllTagsButton ${clearAllButtonClasses}`}
				on:click={() => {
					removeAllTags();
				}}
			>
				{showClearAllText}
			</button>
		{/if}
	</div>
</div>

<style>
	.screen-reader-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
