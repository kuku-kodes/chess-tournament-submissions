<script>
  export let type = 'button';
  export let variant = 'primary'; // primary, secondary, danger, outline
  export let disabled = false;

  const baseClasses = "px-4 py-2 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-indigo-500"
  };
</script>

<button 
  {type} 
  {disabled}
  class="{baseClasses} {variants[variant] || variants.primary}"
  on:click
>
  <slot />
</button>