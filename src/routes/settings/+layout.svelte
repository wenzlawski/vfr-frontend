<script>
  import { page } from '$app/stores';
  const navigation = [
    {
      title: 'Profile',
      href: '/settings/profile'
    },
    {
      title: 'Security',
      href: '/settings/security'
    },
    {
      title: 'Data',
      href: '/settings/data'
    }
  ];
</script>

<svelte:head>
  <title>Settings - Readanalytics</title>
</svelte:head>

<div class="flex justify-center">
  <div class="flex flex-col sm:w-[80%] lg:w-[60%] mt-8">
    <div class="w-full h-full px-2">
      <h3 class="text-2xl font-medium">Settings</h3>
      <div class="divider" />
    </div>
    <div class="flex w-full h-full gap-x-4">
      <ul class="menu bg-base-100 w-56 p-2 rounded-box">
        {#each navigation as navItem}
          <li>
            <a
              href={navItem.href}
              class="font-medium {$page.url.pathname === navItem.href
                ? 'active'
                : ''}">{navItem.title}</a
            >
          </li>
        {/each}
      </ul>
      <div class="w-full">
        <slot />
      </div>
    </div>
  </div>
</div>
