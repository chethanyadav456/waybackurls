// Example: Using waybackurls as a library in your Node.js application

const { fetchWaybackUrls } = require('waybackurls');
const fs = require('fs');

// Example 1: Basic usage
async function basicExample() {
  console.log('=== Basic Example ===');
  try {
    const urls = await fetchWaybackUrls('example.com');
    console.log(`Found ${urls.length} URLs for example.com`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 2: Process and filter results
async function filterExample() {
  console.log('\n=== Filter Example ===');
  try {
    const urls = await fetchWaybackUrls('github.com');
    
    // Filter for specific file types
    const jsFiles = urls.filter(url => url.endsWith('.js'));
    const cssFiles = urls.filter(url => url.endsWith('.css'));
    
    console.log(`Total URLs: ${urls.length}`);
    console.log(`JavaScript files: ${jsFiles.length}`);
    console.log(`CSS files: ${cssFiles.length}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 3: Extract unique subdomains
async function subdomainExample() {
  console.log('\n=== Subdomain Analysis ===');
  try {
    const urls = await fetchWaybackUrls('example.com');
    
    const subdomains = new Set();
    urls.forEach(url => {
      try {
        const hostname = new URL(url).hostname;
        subdomains.add(hostname);
      } catch (e) {
        // Skip invalid URLs
      }
    });
    
    console.log('Unique subdomains found:');
    Array.from(subdomains).sort().forEach(domain => {
      console.log(`  - ${domain}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 4: Save results with custom formatting
async function saveFormattedResults() {
  console.log('\n=== Save Formatted Results ===');
  try {
    const urls = await fetchWaybackUrls('example.com');
    
    const report = {
      domain: 'example.com',
      fetchDate: new Date().toISOString(),
      totalUrls: urls.length,
      urls: urls
    };
    
    fs.writeFileSync('wayback-report.json', JSON.stringify(report, null, 2));
    console.log('✓ Saved formatted report to wayback-report.json');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Example 5: Using options
async function optionsExample() {
  console.log('\n=== Options Example ===');
  try {
    // Fetch URLs without subdomain matching
    const urls = await fetchWaybackUrls('example.com', {
      matchPrefix: false,  // Don't match *.example.com
      collapse: 'urlkey'   // Deduplication strategy
    });
    
    console.log(`Found ${urls.length} URLs (without subdomains)`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run all examples
async function runExamples() {
  await basicExample();
  // Uncomment to run other examples:
  // await filterExample();
  // await subdomainExample();
  // await saveFormattedResults();
  // await optionsExample();
}

runExamples();
