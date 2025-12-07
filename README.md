# waybackurls

A simple Node.js package to fetch historical URLs from the Wayback Machine. Available as both a CLI tool and a library for programmatic use.

## Installation

### Global Installation (CLI)

```bash
npm install -g waybackurls
```

### Local Installation (Library)

```bash
npm install waybackurls
```

## Usage

### CLI Usage

Fetch URLs and display to stdout:
```bash
waybackurls -d example.com
```

Save URLs to a file:
```bash
waybackurls -d example.com -o results.txt
```

Legacy syntax (still supported):
```bash
waybackurls example.com
```

### Library Usage

Import and use in your JavaScript code:

```javascript
const { fetchWaybackUrls } = require('waybackurls');

// Basic usage
(async () => {
  try {
    const urls = await fetchWaybackUrls('example.com');
    console.log(`Found ${urls.length} URLs:`);
    urls.forEach(url => console.log(url));
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
```

With options:
```javascript
const { fetchWaybackUrls } = require('waybackurls');

(async () => {
  const urls = await fetchWaybackUrls('example.com', {
    matchPrefix: true,  // Match *.example.com (default: true)
    collapse: 'urlkey'  // Deduplication strategy (default: 'urlkey')
  });
  
  // Process URLs
  const uniqueDomains = new Set(urls.map(url => new URL(url).hostname));
  console.log('Unique subdomains found:', Array.from(uniqueDomains));
})();
```

## API

### `fetchWaybackUrls(domain, options)`

Fetches historical URLs for a domain from the Wayback Machine.

**Parameters:**
- `domain` (string, required): The domain to fetch URLs for (e.g., 'example.com')
- `options` (object, optional):
  - `matchPrefix` (boolean): Match URLs with domain as prefix using `*.domain` (default: `true`)
  - `collapse` (string): CDX collapse strategy for deduplication (default: `'urlkey'`)

**Returns:** `Promise<string[]>` - Array of historical URLs

**Throws:** Error if domain is invalid or API request fails

## CLI Options

```
Usage: waybackurls -d <domain> [-o <output-file>]

Options:
  -d, --domain <domain>    Domain to fetch URLs for (required)
  -o, --output <file>      Output file (optional, defaults to stdout)
```

## How It Works

This tool queries the [Wayback Machine CDX API](https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server) to retrieve all historical URLs archived for a given domain. The CDX (Capture Index) API provides a searchable index of web archives.

## License

ISC
