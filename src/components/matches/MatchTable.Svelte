<script>
  export let matches = [];
  export let onUpdateResult = () => {};
</script>

<div class="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player 1</th>
        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">VS</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player 2</th>
        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      {#each matches as match, index}
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Round {match.round || index + 1}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{match.player1}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 font-bold">
            {#if match.status === 'Completed'}
              {match.score1} - {match.score2}
            {:else}
              vs
            {/if}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{match.player2}</td>
          <td class="px-6 py-4 whitespace-nowrap text-center">
            <span class={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              match.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {match.status || 'Pending'}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            {#if match.status !== 'Completed'}
              <button 
                on:click={() => onUpdateResult(match)}
                class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded transition-colors"
              >
                Set Result
              </button>
            {:else}
              <span class="text-gray-400">Finished</span>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>