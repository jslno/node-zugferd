# Contributing to node-zugferd

We really appreciate your interest in contributing to node-zugferd. Thi guide will help you get started.
Your contributions make node-zugferd even better for everyone. Before you start, please take a moment to review the following guidelines.

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Development Setup

> [!WARNING]
> Make sure you have [NodeJS](https://nodejs.org/en/download) installed, preferably on LTS.

### 1. Fork the repository

Click on the "Fork" button in the top right corner to create a copy of this repository under your GitHub account.

### 2. Clone your fork

Clone the forked repository to your local machine using the following command:

```bash
# Replace YOUR-USERNAME with your GitHub username
git clone https://github.com/YOUR-USERNAME/node-zugferd.git
cd node-zugferd
```

### 3. Install dependencies

Make sure you have [pnpm](https://pnpm.io/installation) and [Java JDK](https://www.oracle.com/java/technologies/downloads) installed!

```bash
pnpm install
```

## Making Changes

Once you have an idea of what you want to contribute, you can start making changes. Here are some steps to get started:

### 1. Create a new branch

```bash
# Add upstream remote (if not already added)
git remote add upstream https://github.com/jslno/node-zugferd.git

# Make sure you're on main
git checkout main

# Pull latest changes
git pull upstream main

# Create and switch to a new branch
git checkout -b feat/your-feature-name
```

### 2. Start development server

```bash
pnpm dev
```

To start the docs server:

```bash
pnpm -F docs dev
```

### 3. Make your changes

- Make your changes to the codebase.
- Write tests if needed. (Read more about [testing](#testing))
- Update documentation. (Read more about [documenting](#documentation))

## Documentation

- Fix typos and errors
- Add examples and clarify existing content
- Ensure documentation is up to date with code changes

## Testing

We use Vitest for testing. Place test files next to the source files they test:

```ts
import { describe, it, expect } from "vitest";

describe("Feature", () => {
	it("should work as expected", async () => {
		// Test code here
		expect(result).toBeDefined();
	});
});
```

## Best Practices

- Write clear commit messages
- Update documentation to reflect your changes
- Add tests for new features
- Follow our coding standards
- Keep pull requests focused on a single change

## Need Help?

Feel free to ask for help! You can always open an [issue](https://github.com/jslno/node-zugferd/issues) with questions.

Thank you for contributing to node-zugferd!
