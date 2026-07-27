<script>
  export let size = 'md'; // sm, md, lg
  export let text = '';

  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
</script>

<div class="flex flex-col items-center justify-center p-4">
  <div class="{sizeClasses[size] || sizeClasses.md} border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  {#if text}
    <p class="mt-2 text-sm text-gray-600 font-medium">{text}</p>
  {/if}
</div>