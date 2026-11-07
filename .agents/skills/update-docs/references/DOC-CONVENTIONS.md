# node-zugferd Documentation Conventions

Complete reference for frontmatter schema, code block formatting, and MDX component usage.

## Frontmatter Schema

All MDX files must start with YAML frontmatter enclosed in `---` delimiters.

### Required Fields

| Field         | Description                                      | Example                                                            |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| `title`       | Page title for SEO and headings (max. 2-3 words) | `title: Basic Usage`                                               |
| `description` | Brief description (1-2 sentences)                | `description: Learn how to use node-zugferd to generate invoices.` |

### Optional Fields

| Field                | Description                 | Example      |
| -------------------- | --------------------------- | ------------ |
| `icon` (recommended) | Icon name from Lucide React | `icon: Book` |

## Code Block Conventions

### Basic Syntax

````
```language
code here
```
````

### Optional Attributes

| Attribute   | Description              | Example                                   |
| ----------- | ------------------------ | ----------------------------------------- |
| `title`     | Title of the code block  | `title="index.ts"`                        |
| `tab`       | Tab group name           | `tab="Tab 1"`                             |
| `tab-group` | Tab group persistence ID | `tab="Tab 1" tab-group="my-custom-group"` |

### Terminal Commands

For package related commands use the `package-install` language:

````
# Install node-zugferd
```package-install
node-zugferd
```

# CLI Commands
```package-install
npx @node-zugferd/cli init
```
````

Otherwise use the `bash` language:

````
```bash
echo "Hello, world!"
```
````

### Shiki Transformers

````
```tsx
// highlight a line
<div>Hello World</div> // [!code highlight]
// highlight a word
// [!code word:Fumadocs]
<div>Fumadocs</div>
// diff styles
console.log('hewwo'); // [!code --]
console.log('hello'); // [!code ++]
// focus
return new ResizeObserver(() => {}) // [!code focus]
```
````

### Tab Groups

````
```ts tab="Tab 1"
console.log('A');
```
```ts tab="Tab 2"
console.log('B');
```
````

## MDX Components

### Callout Component

Useful for adding tips/warnings. You can specify the type of the callout:

- `info` (default)
- `warn`/`warning`
- `error`
- `success`
- `idea`

```mdx
<Callout>Hello World</Callout>

<Callout title="Title" type="warn">
    Hello World
</Callout>

<Callout title="Title" type="error">
    Hello World
</Callout>

<Callout title="Title" type="idea">
    Hello World
</Callout>
```

### Steps Component

Using Tag:

```mdx
# Heading 1 [step]

## Sub Heading 1 [step]

## Sub Heading 2 [step]

# Heading 2 [step]
```

Using Number:

```mdx
# 1. Heading 1

## 1. Sub Heading 1

## 2. Sub Heading 2

# 2. Heading 2
```

### Cards Component

Useful for adding links.

```mdx
import { HomeIcon } from 'lucide-react';
<Cards>
  <Card href="/docs" title="Documentation">
    Browse the full documentation.
  </Card>
  <Card title="href is optional">Cards can hold plain content too.</Card>
  <Card icon={<HomeIcon />} href="/" title="Home">
    You can include icons too.
  </Card>
</Cards>
```
