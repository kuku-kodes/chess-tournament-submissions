<script>
  export let winner = null;
</script>

{#if winner}
  <div class="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between">
    <div class="space-y-2">
      <span class="bg-black/20 text-yellow-100 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
        Tournament Champion
      </span>
      <h2 class="text-3xl font-extrabold tracking-tight">{winner.name}</h2>
      <p class="text-yellow-100 text-sm">
        Finished with <span class="font-bold text-white">{winner.points || 0} points</span> and an Elo rating of <span class="font-bold text-white">{winner.rating || 1200}</span>.
      </p>
    </div>
    <div class="hidden sm:flex bg-white/20 p-4 rounded-2xl backdrop-blur-md items-center justify-center">
      <svg class="w-12 h-12 text-yellow-200" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 3h14a1 1 0 0 1 1 1v2a6 6 0 0 1-5.17 5.93C14.36 12.5 13.5 14 13.5 14H15a1 1 0 0 1 1 1v4h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2v-4a1 1 0 0 1 1-1h1.5s-.86-1.5-1.33-3.07A6 6 0 0 1 4 6V4a1 1 0 0 1 1-1z"/>
      </svg>
    </div>
  </div>
{/if}