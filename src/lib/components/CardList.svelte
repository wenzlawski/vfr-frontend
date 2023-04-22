<script lang="ts">
  import type { Writable } from 'svelte/store';
  import ArgumentCard from './ArgumentCard.svelte';

  export let analysis: any;

  export let activeArgumentUuid: Writable<string>;

  let sortBy;

  $: analysis.sortArgs(sortBy);

  // function setActiveArgument(event) {
  //   $activeArgumentUuid = event.detail.uuid;
  // }

  console.log($analysis.arguments);
</script>

{#if !$analysis.hasAnalysis}
  <div class="flex flex-col justify-center items-center mx-2 mt-20">
    <div
      class="inline-block w-8 h-8 rounded-full border-4 border-current border-solid animate-spin border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
    <p class="mt-4 text-center">
      Analyzing.<br />This may take a up to one minute.
    </p>
  </div>
{:else}
  <div class="overflow-y-scroll p-2 space-y-2 h-full">
    <label>
      Sort by
      <select bind:value={sortBy} class="select select-bordered select-sm">
        <option value="sequential">Sequential</option>
        <option value="conf_asc">Confidence (asc)</option>
        <option value="conf_desc">Confidence (desc)</option>
        <option value="suff_asc">Sufficiency (asc)</option>
        <option value="suff_desc">Sufficiency (desc)</option>
      </select>
    </label>
    {#each $analysis.arguments as argument (argument.uuid)}
      <ArgumentCard {argument} {activeArgumentUuid} />
    {/each}
  </div>
{/if}
