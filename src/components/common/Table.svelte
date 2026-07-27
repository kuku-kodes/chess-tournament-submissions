<script>
  export let headers = [];
</script>

<div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        {#each headers as header}
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <slot />
    </tbody>
  </table>
</div>