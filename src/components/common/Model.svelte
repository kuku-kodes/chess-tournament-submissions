<script>
  export let isOpen = false;
  export let title = '';
  export let onClose = () => {};
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
      <div class="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h3 class="text-lg font-bold text-gray-900">{title}</h3>
        <button 
          on:click={onClose}
          class="text-gray-400 hover:text-gray-600 text-xl font-bold focus:outline-none"
        >
          &times;
        </button>
      </div>
      <div class="p-6">
        <slot />
      </div>
    </div>
  </div>
{/if}