<script>
  import { playerStore } from '../../stores/playerStore.js';
  import { activeModal, toast } from '../../stores/uiStore.js';

  export let player = null;

  // Resolves player data either from direct component props or global activeModal store
  $: targetPlayer = player || $activeModal.data;

  function closeModal() {
    activeModal.set({ type: null, data: null });
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  function confirmDelete() {
    if (targetPlayer && targetPlayer.id) {
      playerStore.delete(targetPlayer.id);
      toast.show(`Player "${targetPlayer.name}" deleted successfully.`, 'success');
    }
    closeModal();
  }
</script>

<div class="modal-backdrop" role="dialog" aria-modal="true" tabindex="-1" on:keydown={handleKeydown} on:click|self={closeModal}>
  <div class="modal-content">
    <div class="modal-header">
      <h3>Confirm Deletion</h3>
      <button class="btn-close" on:click={closeModal} aria-label="Close modal">✕</button>
    </div>
    
    <div class="modal-body">
      <p>Are you sure you want to delete <strong>{targetPlayer?.name}</strong>?</p>
      <p class="warning-text">This action cannot be undone and will remove the player from records.</p>
    </div>

    <div class="modal-footer">
      <button class="btn btn-secondary" on:click={closeModal}>Cancel</button>
      <button class="btn btn-danger" on:click={confirmDelete}>Delete Player</button>
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(15, 23, 42, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: var(--color-bg-card, #1e293b);
    border: 1px solid var(--color-border, #334155);
    border-radius: 0.5rem;
    width: 100%;
    max-width: 400px;
    padding: 1.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .modal-header h3 {
    margin: 0;
    color: var(--color-text-primary, #f8fafc);
    font-size: 1.25rem;
  }

  .btn-close {
    background: transparent;
    border: none;
    color: var(--color-text-muted, #94a3b8);
    font-size: 1.25rem;
    cursor: pointer;
  }

  .modal-body {
    margin-bottom: 1.5rem;
    color: var(--color-text-primary, #f8fafc);
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .modal-body p {
    margin: 0 0 0.5rem 0;
  }

  .warning-text {
    font-size: 0.8125rem;
    color: var(--color-text-muted, #94a3b8);
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
  }

  .btn-secondary {
    background: var(--color-bg-input, #334155);
    color: var(--color-text-primary, #f8fafc);
  }

  .btn-secondary:hover {
    background: #475569;
  }

  .btn-danger {
    background: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background: #dc2626;
  }
</style>