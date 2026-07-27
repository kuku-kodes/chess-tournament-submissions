<script>
  export let title = '';
  export let subtitle = '';
</script>

<div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
  {#if title}
    <div class="mb-4">
      <h3 class="text-lg font-bold text-gray-900">{title}</h3>
      {#if subtitle}
        <p class="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      {/if}
    </div>
  {/if}
  <slot />
</div>