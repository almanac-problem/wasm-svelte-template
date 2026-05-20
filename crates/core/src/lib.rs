use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! From Rust + WASM 🦀", name)
}

/// Returns fibonacci(n) as a string to avoid BigInt on the JS side.
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> String {
    match n {
        0 => return "0".to_string(),
        1 => return "1".to_string(),
        _ => {}
    }
    let mut a: u64 = 0;
    let mut b: u64 = 1;
    for _ in 2..=n {
        // saturate rather than panic on overflow (safe up to ~fib(93))
        let c = a.saturating_add(b);
        a = b;
        b = c;
    }
    b.to_string()
}
