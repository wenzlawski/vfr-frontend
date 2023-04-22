<div class="dropdown">
  <label tabindex="-1" class="btn btn-circle btn-ghost btn-xs">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="w-4 h-4 stroke-current"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <input type="hidden" />
  </label>
  <div
    tabindex="-1"
    class="border-gray-700 border-[1px] rounded-lg card compact dropdown-content shadow bg-base-100 w-64"
  >
    <div class="card-body">
      <slot />
    </div>
  </div>
</div>
