const axios = require('axios');

/**
 * Fetches historical URLs for a domain from the Wayback Machine CDX API
 * @param {string} domain - The domain to fetch URLs for (e.g., 'example.com')
 * @param {Object} options - Optional configuration
 * @param {boolean} options.matchPrefix - Match URLs with domain as prefix (default: true)
 * @param {string} options.collapse - Collapse strategy for deduplication (default: 'urlkey')
 * @returns {Promise<string[]>} Array of historical URLs
 */
async function fetchWaybackUrls(domain, options = {}) {
  if (!domain || typeof domain !== 'string') {
    throw new Error('Domain is required and must be a string');
  }

  const matchPrefix = options.matchPrefix !== false ? '*.' : '';
  const collapse = options.collapse || 'urlkey';
  
  const url = `http://web.archive.org/cdx/search/cdx?url=${matchPrefix}${domain}/*&output=json&fl=original&collapse=${collapse}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    
    // First row is header, skip it and extract URLs
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }
    
    return data.slice(1).map(row => row[0]);
  } catch (error) {
    throw new Error(`Failed to fetch URLs from Wayback Machine: ${error.message}`);
  }
}

module.exports = { fetchWaybackUrls };
