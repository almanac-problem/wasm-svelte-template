import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    // No `fallback` — adapter-static was overwriting the prerendered `/`
    // route (= index.html) with a 404 fallback shell, which is what was
    // showing "Not Found" when opening the file.
    adapter: adapter(),
    output: {
      // Inline all JS and CSS into the HTML. The result is usable without a
      // server — you can open the file directly in a browser.
      // https://svelte.dev/docs/kit/configuration#output
      bundleStrategy: 'inline',
    },
  },
}
