<script lang="ts">
	import reporterDom from '@felte/reporter-dom';
	import { enhance } from '$app/forms';
	import { RadioFeedback } from '$lib/components';
	import { createForm } from 'felte';

	let success;
	const { form, errors } = createForm({
		extend: [reporterDom()],
		onSuccess: () => {
			success = true;
		}
	});
</script>

{#if !success}
	<div class="flex flex-col justify-center items-center mt-5 mx-2">
		<form method="POST" use:form>
			<h2 class="text-xl font-bold">Readanalytics Feedback Form</h2>

			<div class="divider" />
			<h3 class="text-lg">User Experience</h3>
			<label for="ease-of-use">How easy was it to use Readanalytics?</label>
			<RadioFeedback name="ease-of-use" values={[1, 2, 3, 4, 5]} />
			<br />

			<label for="interpretability"
				>How easy was it to interpret the results provided by Readanalytics?</label
			>
			<RadioFeedback name="interpretability" values={[1, 2, 3, 4, 5]} />

			<br />
			<label for="responsiveness">How responsive was Readanalytics?</label>
			<RadioFeedback name="responsiveness" values={[1, 2, 3, 4, 5]} />
			<div class="divider" />
			<h3 class="text-lg">Features</h3>
			<label for="accuracy">How accurate were the results provided by Readanalytics?</label>
			<RadioFeedback name="accuracy" values={[1, 2, 3, 4, 5]} />
			<br />
			<label for="usefulness"
				>How useful was Readanalytics in helping you understand the argument structure of the text?</label
			>
			<RadioFeedback name="usefulness" values={[1, 2, 3, 4, 5]} />
			<br />
			<label for="speed">How fast was Readanalytics in generating results?</label>
			<RadioFeedback name="speed" values={[1, 2, 3, 4, 5]} />

			<div class="divider" />

			<h3 class="text-lg">Robustness</h3>
			<label for="errors">Did you experience any errors or bugs while using Readanalytics?</label>
			<RadioFeedback name="errors" values={[1, 2, 3, 4, 5]} />
			<div class="divider" />

			<h3 class="text-lg">Additional Feedback</h3>
			<label for="comments"
				>Do you have any additional comments or suggestions for improving Readanalytics?</label
			>
			<textarea
				id="comments"
				name="comments"
				placeholder="Enter your comments here"
				class="textarea textarea-bordered w-full max-w-md"
				style="border: solid grey"
			/>

			<br />
			<input type="submit" value="Submit" class="btn btn-primary" />
		</form>
	</div>
{:else}
	<div class="flex flex-col justify-center items-center mt-5">
		<h2 class="text-xl font-bold">Thank you for your feedback!</h2>
		<p>We will use your feedback to improve Readanalytics.</p>
		<p>Feel free to submit more feedback in the future.</p>
		<p>Click <a class="text-blue-500" href="/">here</a> to return to the home page.</p>
	</div>
{/if}
