#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

try {
  // Find existing waybackurls in PATH
  const whichResult = execSync('which waybackurls 2>/dev/null', { encoding: 'utf8' }).trim();
  
  if (whichResult) {
    const npmGlobalBin = execSync('npm bin -g 2>/dev/null', { encoding: 'utf8' }).trim();
    const expectedPath = require('path').join(npmGlobalBin, 'waybackurls');
    
    // Only remove if it's not already our npm package
    if (whichResult !== expectedPath && fs.existsSync(whichResult)) {
      console.log(`\nRemoving conflicting waybackurls from: ${whichResult}`);
      
      try {
        execSync(`rm -f "${whichResult}"`, { stdio: 'inherit' });
        console.log('✓ Successfully removed conflicting version\n');
      } catch (error) {
        console.warn(`⚠️  Could not remove ${whichResult} - may require sudo permissions`);
        console.warn('You may need to run: sudo npm install -g waybackurls\n');
      }
    }
  }
} catch (error) {
  // Silently continue if checks fail
}
