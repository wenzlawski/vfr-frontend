<script lang="ts">
	export let content;
	export let update = (_) => {};
</script>

<input
	type="text"
	bind:value={content}
	on:keyup={() => update({ title: content })}
	class="border-none text-xl w-full my-5"
/>
