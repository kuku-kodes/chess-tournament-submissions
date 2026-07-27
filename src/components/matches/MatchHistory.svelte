<script>
  export let history = [];
</script>

<div class="bg-white shadow-md rounded-xl p-6 border border-gray-200">
  <h3 class="text-lg font-bold text-gray-900 mb-4">Match History</h3>
  
  {#if history.length === 0}
    <div class="text-center py-8 text-gray-500">
      <p>No completed matches recorded yet.</p>
    </div>
  {:else}
    <div class="space-y-3">
      {#each history as record}
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div class="flex items-center space-x-4">
            <div class="bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-lg text-xs">
              R{record.round || 1}
            </div>
            <div>
              <div class="font-semibold text-gray-900">
                {record.player1} <span class="text-gray-400 font-normal">vs</span> {record.player2}
              </div>
              <div class="text-xs text-gray-500 mt-0.5">Winner: <span class="font-medium text-green-600">{record.winner || 'Draw'}</span></div>
            </div>
          </div>
          <div class="text-right">
            <span class="text-lg font-bold text-gray-900">{record.score1} - {record.score2}</span>
            <div class="text-xs text-gray-400">{record.date || 'Completed'}</div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>