<script>
  export let title = '';
  export let description = '';
</script>

<div class="page-header">
  <h2>{title}</h2>
  {#if description}
    <p>{description}</p>
  {/if}
</div>

<style>
  .page-header {
    margin-bottom: 1.5rem;
  }

  .page-header h2 {
    font-size: 1.75rem;
    color: var(--color-text-primary, #f8fafc);
    margin: 0 0 0.375rem 0;
  }

  .page-header p {
    color: var(--color-text-muted, #94a3b8);
    margin: 0;
    font-size: 0.9375rem;
  }
</style>