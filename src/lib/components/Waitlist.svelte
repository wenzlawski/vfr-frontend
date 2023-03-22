<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="card w-full max-w-md pt-4 p-6 bg-base-300">
	<form method="POST" use:enhance class="w-full space-y-4">
		<div class="form-control w-full">
			<span class="label-text text-lg">What is your name?</span>
			<input type="text" name="name" class="input input-bordered w-full " />
		</div>
		<div class="form-control w-full">
			<span class="label-text text-lg">What is your email?</span>
			<input type="email" name="email" class="input input-bordered w-full" />
		</div>
		<div class="form-control w-full">
			<label class="label cursor-pointer">
				<span class="label-text">Subscribe to the mailing list for updates</span>
				<input type="checkbox" name="updates" class="checkbox checkbox-accent" />
			</label>
		</div>
		<button type="submit" class="btn w-full">Sign up to the waitlist</button>
	</form>
</div>
