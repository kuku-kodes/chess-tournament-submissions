<script>
  export let topPlayers = []; 
  
  $: first = topPlayers[0];
  $: second = topPlayers[1];
  $: third = topPlayers[2];
</script>

<div class="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl mb-6">
  <h2 class="text-xl font-bold text-center mb-8 text-indigo-200">Tournament Podium</h2>
  
  <div class="flex justify-center items-end space-x-4 h-64 pt-6">
    <!-- 2nd Place -->
    {#if second}
      <div class="flex flex-col items-center w-1/3 max-w-[140px]">
        <span class="text-sm font-semibold mb-2 truncate max-w-full text-gray-200">{second.name}</span>
        <div class="w-full bg-gray-400/30 border-t-4 border-gray-300 rounded-t-lg h-36 flex flex-col justify-between items-center py-4 backdrop-blur-sm">
          <span class="text-xs text-gray-300 font-medium">{second.points || 0} pts</span>
          <span class="text-3xl font-extrabold text-gray-300">2</span>
        </div>
      </div>
    {/if}

    <!-- 1st Place -->
    {#if first}
      <div class="flex flex-col items-center w-1/3 max-w-[140px]">
        <span class="text-sm font-bold mb-2 text-yellow-300 truncate max-w-full">👑 {first.name}</span>
        <div class="w-full bg-yellow-500/30 border-t-4 border-yellow-400 rounded-t-lg h-48 flex flex-col justify-between items-center py-4 backdrop-blur-sm shadow-lg shadow-yellow-500/10">
          <span class="text-xs text-yellow-200 font-medium">{first.points || 0} pts</span>
          <span class="text-4xl font-extrabold text-yellow-300">1</span>
        </div>
      </div>
    {/if}

    <!-- 3rd Place -->
    {#if third}
      <div class="flex flex-col items-center w-1/3 max-w-[140px]">
        <span class="text-sm font-semibold mb-2 truncate max-w-full text-amber-200">{third.name}</span>
        <div class="w-full bg-amber-600/30 border-t-4 border-amber-600 rounded-t-lg h-28 flex flex-col justify-between items-center py-4 backdrop-blur-sm">
          <span class="text-xs text-amber-200 font-medium">{third.points || 0} pts</span>
          <span class="text-3xl font-extrabold text-amber-400">3</span>
        </div>
      </div>
    {/if}
  </div>
</div>