# Contributing to SUTRA

Thank you for your interest in contributing to SUTRA! This document provides guidelines and information for contributors.

## Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/SUTRA.git
cd SUTRA
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
```

3. Install dependencies:
```bash
pip install -e .
pip install pytest pytest-cov
```

## Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=sutra
```

## Code Style Guidelines

- Follow PEP 8
- Use type hints
- Include docstrings
- Write unit tests

## Pull Request Process

1. Create a feature branch
2. Make your changes
3. Add tests
4. Update documentation
5. Submit PR

## Release Process

1. Update version in setup.py
2. Update CHANGELOG.md
3. Create release notes
4. Tag version

## Questions?

- Open an issue
- Check existing issues
- Review documentation
