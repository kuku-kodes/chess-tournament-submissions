<script>
  import { playerStore } from '../../stores/playerStore.js';
  import { toast } from '../../stores/uiStore.js';

  let name = '';
  let email = '';
  let rating = 1200;
  let country = '';

  function handleSubmit() {
    if (!name.trim()) {
      toast.show('Please enter player name', 'error');
      return;
    }

    playerStore.add({
      name,
      email,
      rating: Number(rating),
      country: country || 'India'
    });

    toast.show('Player added successfully!', 'success');
    
    // Form reset
    name = '';
    email = '';
    rating = 1200;
    country = '';
  }
</script>

<form class="player-form" on:submit|preventDefault={handleSubmit}>
  <h3>Add New Player</h3>
  
  <div class="form-group">
    <label for="name">Player Name *</label>
    <input id="name" type="text" bind:value={name} placeholder="e.g. Viswanathan Anand" required />
  </div>

  <div class="form-group">
    <label for="email">Email Address</label>
    <input id="email" type="email" bind:value={email} placeholder="player@example.com" />
  </div>

  <div class="form-row">
    <div class="form-group">
      <label for="rating">Chess Rating (Elo)</label>
      <input id="rating" type="number" bind:value={rating} min="100" max="3500" />
    </div>

    <div class="form-group">
      <label for="country">Country</label>
      <input id="country" type="text" bind:value={country} placeholder="e.g. India" />
    </div>
  </div>

  <button type="submit" class="btn-submit">Add Player</button>
</form>

<style>
  .player-form {
    background: var(--color-bg-card, #1e293b);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border, #334155);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
  }

  .player-form h3 {
    margin: 0 0 0.5rem 0;
    color: var(--color-text-primary, #f8fafc);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  label {
    font-size: 0.875rem;
    color: var(--color-text-muted, #94a3b8);
    font-weight: 500;
  }

  input {
    padding: 0.625rem;
    border-radius: 0.375rem;
    border: 1px solid var(--color-border, #475569);
    background: var(--color-bg-input, #0f172a);
    color: #fff;
    font-size: 0.9375rem;
  }

  input:focus {
    outline: none;
    border-color: var(--color-primary, #38bdf8);
  }

  .btn-submit {
    margin-top: 0.5rem;
    padding: 0.75rem;
    background-color: var(--color-primary, #0284c7);
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-submit:hover {
    background-color: var(--color-primary-hover, #0369a1);
  }
</style>