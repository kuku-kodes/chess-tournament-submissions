<script>
  export let label = '';
  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let error = '';
  export let id = '';
</script>

<div class="mb-4">
  {#if label}
    <label for={id} class="block text-sm font-medium text-gray-700 mb-1">{label}</label>
  {/if}
  <input 
    {id}
    {type}
    {placeholder}
    bind:value
    class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm {error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}"
    on:input
    on:change
  />
  {#if error}
    <p class="mt-1 text-xs text-red-600">{error}</p>
  {/if}
</div>