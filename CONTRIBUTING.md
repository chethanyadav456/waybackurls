# Contributing to waybackurls

Thank you for your interest in contributing to waybackurls. This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment.

## How to Contribute

### Reporting Bugs

Before creating a bug report:
- Check the issue tracker to avoid duplicates
- Collect relevant information (Node.js version, OS, error messages)

Include in your bug report:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- System information

### Suggesting Enhancements

Enhancement suggestions are welcome. Include:
- Clear description of the proposed feature
- Use cases and benefits
- Potential implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit with clear messages (`git commit -m 'Add feature: description'`)
6. Push to your fork (`git push origin feature/your-feature`)
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/waybackurls.git
cd waybackurls

# Install dependencies
npm install

# Test CLI locally
node bin/waybackurls -d example.com

# Test library
node -e "const { fetchWaybackUrls } = require('./index'); fetchWaybackUrls('example.com').then(console.log);"
```

## Coding Standards

- Use CommonJS module format
- Follow existing code style
- Add comments for complex logic
- Keep functions focused and modular
- Handle errors appropriately

## Testing

Before submitting:
- Test CLI with various domains and flags
- Test library API in different scenarios
- Verify error handling works correctly
- Test on your target platform

## Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep first line under 72 characters
- Reference issues and PRs when relevant

## Questions

For questions about contributing, open an issue with the "question" label.
