<script lang="ts">
  import ArgumentCard from './ArgumentCard.svelte';
  import { getTextFromRanges } from '$lib/utils';

  export let analysis: any;
  export let content: string;

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
    {#each $analysis.arguments as argument}
      <ArgumentCard {argument} />
    {/each}
  </div>
{/if}
