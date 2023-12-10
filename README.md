# Svelte Unstyled Tags

Svelte Unstyled Tags is a customisable Tags Input Component for Svelte.

It is in development and things might change like class names.

## Installation

```bash
npm install svelte-unstyled-tags
yarn add svelte-unstyled-tags
pnpm add svelte-unstyled-tags
```

Import it in your Svelte component like this:

```javascript
import TagsInput from 'svelte-unstyled-tags';
```

## Usage

Use the component in your Svelte files:

```svelte
<script>
    let tags = [];
</script>

<TagsInput bind:tags={tags} />
```

You can pass tags array to component with `bind:tags` and pass your configuration through props.

## Options

The following are the customisable options that come with the package:

| Parameter                 | Type             | Description                                 | Default     |
| ------------------------- | ---------------- | ------------------------------------------- | ----------- |
| `tags`                    | array of strings | The array to store the tag values           | [ ]         |
| `inputPlaceholderText`    | string           | Placeholder text for the tag input field    | 'Add a tag' |
| `removeTagButtonText`     | string           | Text for the tag remove button              | 'x'         |
| `addTagKey`               | string           | The key that triggers the addition of a tag | 'Enter'     |
| `showAddButton`           | boolean          | Show an add button                          | false       |
| `addButtonText`           | string           | Text for the add button                     | 'Add Tag'   |
| `showClearAllButton`      | boolean          | Show a clear all button                     | false       |
| `showClearAllText`        | string           | Text for the clear all button               | 'Clear all' |
| `onlyUnique`              | boolean          | Only allow unique tags                      | false       |
| `showLabel`               | boolean          | Show label for the input                    | false       |
| `labelText`               | string           | Text for the label                          | 'Tags'      |
| `maximumTags`             | number           | Maximum number of tags                      | Infinity    |
| `id`                      | string           | Custom ID for the input                     | 'tagsInput' |
| `componentWrapperClasses` | string           | CSS Classes for component wrapper           | ''          |
| `allTagsWrapperClasses`   | string           | CSS Classes for the 'all tags' wrapper      | ''          |
| `tagWrapperClasses`       | string           | CSS Classes for each tag wrapper            | ''          |
| `tagClasses`              | string           | CSS Classes for each tag                    | ''          |
| `labelClasses`            | string           | CSS Classes for label                       | ''          |
| `tagRemoveButtonClasses`  | string           | CSS Classes for the tag remove buttons      | ''          |
| `inputClasses`            | string           | CSS Classes for the input                   | ''          |
| `addButtonClasses`        | string           | CSS Classes for the add button              | ''          |
| `clearAllButtonClasses`   | string           | CSS Classes for the clear all button        | ''          |

## Listen for changes to tags

This component dispatches a 'input' event whenever the tags array changes. You can listen for it like this:

```svelte
<TagsInput bind:tags={tags} on:input="{event => console.log(event.detail)}"/>
```

This will log the new tags array whenever it changes.

## Example HTML

This is an example of the HTML markup that's created.

```html
<div id="svelteTagsComponentWrapper">
	<label
		for="tagsInput"
		class="screen-reader-only"
		>Tags</label
	>
	<div class="tagsInputWrapper">
		<div
			id="allTagsWrapper"
			role="list"
		>
			<div
				class="tagWrapper"
				role="listitem"
				data-tag="tag"
				data-index="0"
			>
				<span
					class="tag"
					id="tag-0"
					>tag</span
				>
				<button class="tagRemoveButton">x</button>
			</div>
			<div
				class="tagWrapper"
				role="listitem"
				data-tag="tag2"
				data-index="1"
			>
				<span
					class="tag"
					id="tag2-1"
					>tag2</span
				>
				<button class="tagRemoveButton">x</button>
			</div>
		</div>
		<input
			id="tagsInput"
			type="text"
			placeholder="Add a tag…"
		/>
		<button>Add Tag</button>
	</div>
</div>

```

## Licence

MIT