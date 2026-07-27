<script>
  export let match;
  export let onSelect = () => {};
</script>

<div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
  <div class="flex justify-between items-center mb-3">
    <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
      Round {match.round || 1}
    </span>
    <span class={`text-xs px-2.5 py-1 rounded-full font-medium ${
      match.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
    }`}>
      {match.status || 'Upcoming'}
    </span>
  </div>

  <div class="space-y-2 my-2">
    <div class="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg">
      <span class="font-medium text-gray-800">{match.player1}</span>
      <span class="font-bold text-gray-900">{match.score1 ?? '-'}</span>
    </div>
    <div class="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg">
      <span class="font-medium text-gray-800">{match.player2}</span>
      <span class="font-bold text-gray-900">{match.score2 ?? '-'}</span>
    </div>
  </div>

  <div class="mt-4 pt-3 border-t border-gray-100 flex justify-end">
    <button 
      on:click={() => onSelect(match)}
      class="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center"
    >
      {match.status === 'Completed' ? 'View Details' : 'Enter Result'}
    </button>
  </div>
</div>