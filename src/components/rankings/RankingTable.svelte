<script>
  export let rankings = [];
</script>

<div class="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Name</th>
        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Played</th>
        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Won</th>
        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rating (Elo)</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      {#each rankings as item, index}
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
            <span class={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
              index === 0 ? 'bg-yellow-100 text-yellow-800' :
              index === 1 ? 'bg-gray-200 text-gray-800' :
              index === 2 ? 'bg-amber-100 text-amber-800' : 'text-gray-600'
            }`}>
              {index + 1}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.name}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">{item.played || 0}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">{item.won || 0}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-indigo-600">{item.points || 0}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">{item.rating || 1200}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>