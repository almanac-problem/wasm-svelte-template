<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/utils'

  interface Props {
    class?: string
    children?: Snippet
  }

  let { class: className, children }: Props = $props()
</script>

<div class={cn('rounded-lg border border-dashed bg-card text-card-foreground shadow-sm', className)}>
  {#if children}
    {@render children()}
  {/if}
</div>
