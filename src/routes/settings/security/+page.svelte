<script>
  import { enhance } from '$app/forms';
  import { Modal } from '$lib/components';
  let modalOpen;
</script>

<div class="flex flex-col w-full h-full">
  <h3 class="text-2xl font-medium">Delete my account</h3>
  <Modal label="delete" checked={modalOpen}>
    <p slot="trigger" class="btn btn-primary max-w-md mt-4">
      Delete my account
    </p>
    <div slot="heading">
      <h3 class="text-2xl">Delete my account</h3>
      <form
        class="mt-4 space-y-3"
        method="POST"
        action="?/deleteAllDocuments"
        use:enhance
      >
        <p class="text-base font-normal mt-2">
          Are you sure you want to delete your account?
        </p>
        <div class="mt-8">
          <label for="delete" class="btn btn-outline">Cancel</label>
          <button type="submit" class="btn btn-primary">Yes, delete</button>
        </div>
      </form>
    </div>
    <div slot="actions" />
  </Modal>
</div>
