<script lang="ts">
  import { PreviewItem, PreviewItemNew } from '$lib/components';
  export let data;
</script>

<svelte:head>
  <title>Documents - Readanalytics</title>
</svelte:head>

<div class="flex flex-col lg:items-center lg:max-w-[80%]">
  <div>
    <h2 class="text-3xl font-bold mt-8 ml-4 md:ml-14">My Documents</h2>
    <div class="mt-4 ml-4 md:ml-14 ">
      <div
        class="container pt-5 grid w-fit grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 justify-between gap-y-4 gap-x-8"
      >
        <PreviewItemNew />
        {#each data.documents as document (document.id)}
          <PreviewItem {document} />
        {/each}
      </div>
    </div>
  </div>
</div>
