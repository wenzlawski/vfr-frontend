<script lang="ts">
  import type { ArgumentInstance } from '$lib/stores/analysis';
  import type { Writable } from 'svelte/store';

  export let argument: ArgumentInstance;
  export let activeArgumentUuid: Writable<string>;

  let decimals = 2;
  const confidence = argument.confidence.toFixed(decimals);
  const sufficiency = argument.sufficiency.toFixed(decimals);

  function enter() {
    // console.log('hovering on ', argument.uuid);
  }

  function leave() {
    // console.log('leaving ', argument.uuid);
  }

  function focus() {
    $activeArgumentUuid = argument.uuid;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  on:mouseenter={enter}
  on:mouseleave={leave}
  on:click={focus}
  class:active={$activeArgumentUuid === argument.uuid}
  class="overflow-x-hidden rounded-md p-2 border-2 shadow-sm card bg-base-100 hover:bg-green-50 cursor-pointer hover:border-green-600"
>
  <div>
    <p class="text-sm text-justify">{argument.text.slice(0, 70) + '...'}</p>
    <div class="flex flex-wrap gap-x-4">
      <p>Confidence: {confidence}</p>
      <p>Sufficiency: {sufficiency}</p>
    </div>
  </div>
</div>

<style lang="scss">
  .active {
    @apply bg-green-50;
    @apply border-green-600;
  }
</style>
