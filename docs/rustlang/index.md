# Rust

## Install

To install Rust, use Rustup, which manages Rust versions and associated tools:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

This will install the Rust compiler (`rustc`), the package manager and build tool (`cargo`), and other essentials. After installation, verify it with:

```sh
rustc --version
cargo --version
```

You can update Rust anytime with:

```sh
rustup update
```

## Managing Packages and Dependencies

**Go vs. Rust Comparison Table**

| Task           | Go Command/File             | Rust Command/File            |
|----------------|----------------------------|------------------------------|
| Add dependency | `go get `         | `cargo add `        |
| Version config | `go.mod`                   | `Cargo.toml`                 |
| Update deps    | `go get -u`                | `cargo update`               |

**How it works in Rust:**

- **Add a dependency:**  
  ```sh
  cargo add 
  ```
  Or, manually add the dependency to `Cargo.toml`:
  ```toml
  [dependencies]
  serde = "1.0"
  ```
- **Lock dependency versions:**  
  Rust uses `Cargo.lock` (automatically generated) to pin versions, similar to `go.sum`.
- **Update dependencies:**  
  ```sh
  cargo update
  ```
- **List dependencies:**  
  ```sh
  cargo tree
  ```

## General File Structure for Modular Apps

Here’s a typical Rust project structure for modular applications:

```
my_project/
├── Cargo.toml           # Project metadata and dependencies
├── Cargo.lock           # Lockfile for dependency versions
├── src/
│   ├── main.rs          # Main application entry point
│   ├── lib.rs           # Library root (if your app is a lib)
│   ├── config/
│   │   └── mod.rs       # Configuration module
│   ├── telemetry/
│   │   └── mod.rs       # Telemetry module
│   ├── logger/
│   │   └── mod.rs       # Logger module
│   └── db/
│       └── mod.rs       # Database module
└── .gitignore
```

- **Modules:**  
  Each subfolder (like `config`, `telemetry`, `logger`, `db`) is a module.  
  The `mod.rs` file defines what’s exported from that module.
- **Main entry:**  
  `main.rs` is the entry point for binaries.
- **Library:**  
  `lib.rs` is used if you want to expose your code as a library.

## Compiling and Running Projects

**Go vs. Rust Comparison Table**

| Task           | Go Command           | Rust Command           |
|----------------|---------------------|------------------------|
| Build project  | `go build`          | `cargo build`          |
| Run project    | `go run main.go`    | `cargo run`            |
| Run tests      | `go test`           | `cargo test`           |
| Build release  | `go build`          | `cargo build --release`|

**How it works in Rust:**

- **Build and run:**  
  ```sh
  cargo run
  ```
- **Build only:**  
  ```sh
  cargo build
  ```
- **Build for release (optimized):**  
  ```sh
  cargo build --release
  ```
  The executable will be in `target/release/`.
- **Run executable directly:**  
  ```sh
  ./target/release/my_project
  ```
- **Run tests:**  
  ```sh
  cargo test
  ```

## Cargo.toml Example

Here’s a typical structure for a new Rust project’s `Cargo.toml`:

```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"
authors = ["Your Name "]
description = "A short description of your project"
license = "MIT"
# Optional fields:
# homepage = "https://example.com"
# repository = "https://github.com/username/my_project"
# documentation = "https://docs.rs/my_project"

[dependencies]
serde = "1.0"
tokio = { version = "1.0", features = ["full"] }
```

**Key sections and fields:**

- **`[package]`:**  
  - `name`: Your project’s name (required).
  - `version`: The version of your project (required if you publish to crates.io).
  - `edition`: The Rust edition your code uses (e.g., `"2021"`).
  - `authors`: List of authors (optional, but recommended).
  - `description`: Short description (optional, but recommended).
  - `license`: License for your project (optional, but required for publishing to crates.io).
  - Other optional fields: `homepage`, `repository`, `documentation` (for publishing).
- **`[dependencies]`:**  
  - List your dependencies and their versions or source.
  - Example: `serde = "1.0"` or `tokio = { version = "1.0", features = ["full"] }`.
  - You can specify Git repositories or custom registries if needed, but most commonly, you use versions from crates.io.

**Summary Table: Go vs. Rust**

| Go (`go.mod`)                | Rust (`Cargo.toml`)                |
|------------------------------|------------------------------------|
| `module github.com/you/proj` | `[package] name = "my_project"`    |
| `go 1.21`                    | `edition = "2021"` (Rust edition)  |
| `require github.com/...`     | `[dependencies] serde = "1.0"`     |

Rust’s tooling is robust and similar in spirit to Go’s, but with its own idioms and conventions.
