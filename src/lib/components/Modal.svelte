<script lang="ts">
  export let label;
  export let checked = false;
  export function close() {
    checked = false;
  }
</script>

<label for={label} class="cursor-pointer">
  <slot name="trigger" />
</label>

<input type="checkbox" id={label} class="modal-toggle" bind:checked />
<label class="modal modal-bottom sm:modal-middle m-0" for={label}>
  <label class="modal-box relative cursor-pointer" for="">
    <div class="font-bold text-xl text-center">
      <slot name="heading" />
    </div>
    <div class="my-2 text-center">
      <slot name="body" />
    </div>
    <div class="modal-action justify-center">
      <slot name="actions" />
    </div>
  </label>
</label>
