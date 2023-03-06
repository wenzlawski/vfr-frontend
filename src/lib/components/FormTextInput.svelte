<script lang="ts">
	export let errors;
	export let name;
	export let label;
	export let type;
	export let required;
</script>

<div class="form-control w-full max-w-md mb-5">
	<label for={name} class="label font-medium pb-1 block"
		><span class="label-text">{label}</span>

		<span style="color:red">*</span>
	</label>
	<input
		{type}
		{name}
		class="input w-full max-w-md block box-border mr-5 p-2 {errors[name]
			? 'input-error'
			: 'input-bordered'}
    "
		aria-describedby="{name}-validation"
		{required}
	/>
	<div
		class="text-red-500"
		id="{name}-validation"
		data-felte-reporter-dom-for={name}
		aria-live="polite"
	/>
</div>
