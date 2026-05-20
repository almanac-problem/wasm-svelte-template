// Prerender at build time. SSR is on (default) so the rendered DOM is baked
// into index.html — the file opens to visible content via file:// instead of
// a blank page. WASM still loads client-side in onMount.
export const prerender = true
