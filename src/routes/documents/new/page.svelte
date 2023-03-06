<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<Input
				id="title"
				label="Document title"
				value={form?.data?.title}
				errors={form?.errors?.title}
			/>
			<TextArea
				id="content"
				label="Content"
				value={form?.data?.content}
				errors={form?.errors?.content}
			/>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Document</button>
			</div>
		</form>
	</div>
</div>
