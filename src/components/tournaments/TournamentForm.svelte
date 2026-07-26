<script>
  import { tournamentStore } from '../../stores/tournamentStore.js';
  import { toast } from '../../stores/uiStore.js';

  let title = '';
  let startDate = new Date().toISOString().split('T')[0];

  function handleSubmit() {
    if (!title.trim()) {
      toast.show('Please enter a tournament title', 'error');
      return;
    }

    tournamentStore.create({
      title: title.trim(),
      startDate
    });

    toast.show('Tournament created successfully!', 'success');
    title = '';
    startDate = new Date().toISOString().split('T')[0];
  }
</script>

<form class="tournament-form" on:submit|preventDefault={handleSubmit}>
  <h3>Create New Tournament</h3>
  
  <div class="form-group">
    <label for="title">Tournament Title *</label>
    <input id="title" type="text" bind:value={title} placeholder="e.g. Winter Chess Grand Prix" required />
  </div>

  <div class="form-group">
    <label for="startDate">Start Date</label>
    <input id="startDate" type="date" bind:value={startDate} />
  </div>

  <button type="submit" class="btn-submit">Create Tournament</button>
</form>

<style>
  .tournament-form {
    background: var(--color-bg-card, #1e293b);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border, #334155);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
  }

  .tournament-form h3 {
    margin: 0 0 0.5rem 0;
    color: var(--color-text-primary, #f8fafc);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
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