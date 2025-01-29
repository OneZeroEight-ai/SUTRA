# add_supporting_components.ps1

# Create GitHub Actions workflows directory if it doesn't exist
New-Item -Path ".github/workflows" -ItemType Directory -Force

# Create Python test workflow
@'
name: Python Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.8", "3.9", "3.10"]

    steps:
    - uses: actions/checkout@v4
    - name: Set up Python ${{ matrix.python-version }}
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install pytest pytest-cov
        pip install -e .
    
    - name: Run tests with coverage
      run: |
        pytest --cov=sutra --cov-report=xml
'@ | Out-File -FilePath ".github/workflows/python-tests.yml" -Encoding utf8

# Create issue templates directory
New-Item -Path ".github/ISSUE_TEMPLATE" -ItemType Directory -Force

# Create bug report template
@'
---
name: Bug Report
about: Create a report to help us improve SUTRA
title: "[BUG] "
labels: bug
assignees: ''

---

**Describe the Bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Initialize token with '...'
2. Call method '....'
3. See error

**Expected Behavior**
A clear description of what you expected to happen.

**Code Example**
```python
# Add minimal code example that reproduces the issue
```

**Environment:**
- Python version:
- SUTRA version:
- OS:

**Additional Context**
Add any other context about the problem here.
'@ | Out-File -FilePath ".github/ISSUE_TEMPLATE/bug_report.md" -Encoding utf8

# Create feature request template
@'
---
name: Feature Request
about: Suggest an idea for SUTRA
title: "[FEATURE] "
labels: enhancement
assignees: ''

---

**Feature Description**
A clear description of the feature you'd like to see.

**Use Case**
Describe the use case this feature would address.

**Proposed Implementation**
```python
# Optional: Example code showing how you'd like to use this feature
```

**Alternatives Considered**
Describe any alternative solutions you've considered.

**Additional Context**
Add any other context about the feature request here.
'@ | Out-File -FilePath ".github/ISSUE_TEMPLATE/feature_request.md" -Encoding utf8

# Create CONTRIBUTING.md
@'
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
'@ | Out-File -FilePath "CONTRIBUTING.md" -Encoding utf8

# Create CHANGELOG.md
@'
# Changelog

All notable changes to SUTRA will be documented in this file.

## [0.1.0] - 2025-01-28

### Added
- Initial SUTRA token implementation
- Basic token economics
- Distribution pools
- Emission schedule

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A
'@ | Out-File -FilePath "CHANGELOG.md" -Encoding utf8

# Create git commit
git add .
git commit -m "Add GitHub Actions, issue templates, and contributing guidelines"
git push origin main

Write-Host "Supporting components have been added to the repository"