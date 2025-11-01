<script lang="ts">
	import icon from "$lib/assets/img1.png";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={icon} />
</svelte:head>

{@render children()}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		background: none;
		color: #f8f9fa;
	}
</style>
