<script lang="ts">
	type TagsArray = string[];

	interface Props {
		tags?: TagsArray;
		oninput?: (tags: TagsArray) => void;

		// Parameters
		inputPlaceholderText?: string;
		removeTagButtonText?: string;
		removeTagButtonAriaLabelPrefix?: string;
		addTagKey?: string;
		showAddButton?: boolean;
		addButtonText?: string;
		showClearAllButton?: boolean;
		showClearAllButtonText?: string;

		onlyUnique?: boolean;
		showLabel?: boolean;
		labelText?: string;
		maximumTags?: number;

		// Let user provide classes for external styling
		componentWrapperClasses?: string;
		allTagsWrapperClasses?: string;
		tagsInputWrapperClasses?: string;
		tagWrapperClasses?: string;
		tagClasses?: string;
		labelClasses?: string;
		removeTagButtonClasses?: string;
		inputClasses?: string;
		addButtonClasses?: string;
		clearAllButtonClasses?: string;
		inputButtonsSectionClasses?: string;
		buttonsSectionClasses?: string;
	}

	let {
		tags = $bindable([]),
		oninput,

		inputPlaceholderText = 'Add a tag',
		removeTagButtonText = '✕',
		removeTagButtonAriaLabelPrefix = 'Remove tag',
		addTagKey = 'Enter',
		showAddButton = false,
		addButtonText = 'Add Tag',
		showClearAllButton = false,
		showClearAllButtonText = 'Clear all',

		onlyUnique = false,
		showLabel = false,
		labelText = 'Tags',
		maximumTags = Infinity,

		componentWrapperClasses = '',
		allTagsWrapperClasses = '',
		tagsInputWrapperClasses = '',
		tagWrapperClasses = '',
		tagClasses = '',
		labelClasses = '',
		removeTagButtonClasses = '',
		inputClasses = '',
		addButtonClasses = '',
		clearAllButtonClasses = '',
		inputButtonsSectionClasses = '',
		buttonsSectionClasses = ''
	}: Props = $props();

	let inputValue: string = $state('');

	const id = $props.id();

	function addTag(value: string) {
		if (value && (!onlyUnique || !tags.includes(value)) && tags.length < maximumTags) {
			tags = [...tags, value];
			oninput?.(tags);
		}
	}

	function addTagFromInput(event: KeyboardEvent) {
		const target = event.target as HTMLInputElement | null;
		if (target && event.key === addTagKey) {
			addTag(target.value);
			inputValue = '';
		}
	}

	function removeTag(index: number) {
		tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
		oninput?.(tags);
	}

	function removeAllTags() {
		tags = [];
		oninput?.(tags);
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
						class={`removeTagButton ${removeTagButtonClasses}`}
						aria-label={`${removeTagButtonAriaLabelPrefix} ${tag}`}
						onclick={() => removeTag(index)}>{removeTagButtonText}</button
					>
				</div>
			{/each}
		</div>
		<div class={`inputButtonsSection ${inputButtonsSectionClasses}`}>
			<input
				id={`tagsInput-${id}`}
				class={`tagsInput ${inputClasses}`}
				bind:value={inputValue}
				onkeydown={addTagFromInput}
				type="text"
				placeholder={inputPlaceholderText}
			/>
			{#if showAddButton || showClearAllButton}
				<div class={`buttonsSection ${buttonsSectionClasses}`}>
					{#if showAddButton}
						<button
							class={`addTagButton ${addButtonClasses}`}
							onclick={() => {
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
							onclick={() => {
								removeAllTags();
							}}
						>
							{showClearAllButtonText}
						</button>
					{/if}
				</div>
			{/if}
		</div>
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
