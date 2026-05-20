import initWasmModule, { greet, fibonacci } from 'core-wasm'

let initialized = false

/**
 * Initializes the WASM module. Safe to call multiple times.
 *
 * wasm-pack (--target web) generates an init() that fetches the .wasm file
 * via `new URL('core_bg.wasm', import.meta.url)`. With Vite's
 * `assetsInlineLimit: Infinity`, that URL is rewritten to an inline
 * `data:application/wasm;base64,...` URL at build time — so init() works
 * with no arguments and no external request.
 */
export async function initWasm(): Promise<void> {
  if (initialized) return
  await initWasmModule()
  initialized = true
}

export { greet, fibonacci }
