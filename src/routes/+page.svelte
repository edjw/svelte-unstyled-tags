<script lang="ts">
	import Tags from '$lib/index.js';

	let tags: string[] = $state(['tag', 'another tag', 'and another']);
</script>

<Tags bind:tags />
