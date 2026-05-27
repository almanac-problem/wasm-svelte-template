.PHONY: all build build-wasm dev install clean

all: build

install:
	cd frontend && pnpm install

build-wasm:
	wasm-pack build crates/core --target web
	@echo "WASM built → crates/core/pkg"

build: build-wasm install
	cd frontend && pnpm run build
	@echo ""
	@echo "✓ Output: frontend/build/index.html  (fully self-contained)"

dev:
	cd frontend && pnpm run dev

dev-full: build-wasm install
	cd frontend && pnpm run dev

clean:
	rm -rf frontend/node_modules frontend/dist
	rm -rf crates/core/target crates/core/pkg
