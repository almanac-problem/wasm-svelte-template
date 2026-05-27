<script lang="ts">
    import { onMount } from "svelte";
    import { initWasm, greet, fibonacci } from "$lib/wasm";
    import { Button } from "$lib/components/ui/button";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
    } from "$lib/components/ui/card";

    let wasmReady = $state(false);
    let wasmError = $state("");

    let name = $state("World");
    let greeting = $state("");

    let fibN = $state(10);
    let fibResult = $state("");

    onMount(async () => {
        try {
            await initWasm();
            wasmReady = true;
            greeting = greet(name);
            fibResult = fibonacci(fibN);
        } catch (e) {
            wasmError = String(e);
        }
    });
</script>

<main class="min-h-screen bg-background">
    <div class="container mx-auto max-w-2xl px-4 py-12">
        <div class="mb-10 space-y-1">
            <h1 class="text-3xl font-bold tracking-tight">
                Rust + WASM + SvelteKit
            </h1>
            <p class="text-muted-foreground">
                Single-file app — everything inlined, zero server required.
            </p>
        </div>

        {#if wasmError}
            <Card class="border-destructive">
                <CardContent class="pt-6">
                    <p class="text-sm text-destructive">{wasmError}</p>
                </CardContent>
            </Card>
        {:else if !wasmReady}
            <p class="text-muted-foreground text-sm">
                Initializing WebAssembly…
            </p>
        {:else}
            <div class="space-y-6">
                <Card class="border-dashed border-2">
                    <CardHeader>
                        <CardTitle>Greet</CardTitle>
                        <CardDescription
                            >Calls a Rust function that formats a greeting
                            string.</CardDescription
                        >
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="flex gap-2">
                            <input
                                bind:value={name}
                                placeholder="Enter your name"
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <Button onclick={() => (greeting = greet(name))}
                                >Greet</Button
                            >
                        </div>
                        {#if greeting}
                            <p
                                class="rounded-md bg-muted px-3 py-2 text-sm font-mono"
                            >
                                {greeting}
                            </p>
                        {/if}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Fibonacci</CardTitle>
                        <CardDescription>
                            Computes F(n) in Rust. Returns as a string to avoid
                            JS BigInt handling.
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="flex gap-2">
                            <input
                                type="number"
                                bind:value={fibN}
                                min="0"
                                max="93"
                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <Button
                                onclick={() => (fibResult = fibonacci(fibN))}
                                >Calculate</Button
                            >
                        </div>
                        {#if fibResult}
                            <p
                                class="rounded-md bg-muted px-3 py-2 text-sm font-mono"
                            >
                                F({fibN}) = {fibResult}
                            </p>
                        {/if}
                    </CardContent>
                </Card>

                <div
                    class="flex items-center gap-2 text-xs text-muted-foreground"
                >
                    <span
                        class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold"
                    >
                        🦀 Rust
                    </span>
                    <span
                        class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold"
                    >
                        ⚡ WASM
                    </span>
                    <span
                        class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold"
                    >
                        🔶 SvelteKit
                    </span>
                    <span
                        class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold"
                    >
                        📦 Single File
                    </span>
                </div>
            </div>
        {/if}
    </div>
</main>
