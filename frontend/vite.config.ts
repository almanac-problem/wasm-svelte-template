import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  build: {
    // Inline ALL imported assets (incl. .wasm) as base64 data URLs. Combined
    // with kit.output.bundleStrategy = 'inline' in svelte.config.js this
    // produces a fully self-contained single HTML file.
    // https://svelte.dev/docs/kit/configuration#output
    assetsInlineLimit: Infinity,
  },
})
