# Git Branching Strategy

## Overview
This document outlines the Git branching strategy for the FloodSpy project. We follow a modified GitFlow workflow to ensure code quality and streamline our development process.

## Branch Structure

### Main Branches
- `main` - Production-ready code. All releases are deployed from this branch.
- `develop` - Integration branch for features. This branch contains the latest delivered development changes.

### Supporting Branches
- `feature/*` - Feature branches for new functionality (e.g., `feature/user-authentication`)
- `bugfix/*` - Branches for fixing bugs
- `hotfix/*` - Emergency fixes for production issues
- `release/*` - Branches for preparing releases

## Workflow

### Feature Development
1. Create a feature branch from `develop`:
   ```
   git checkout develop
   git pull
   git checkout -b feature/feature-name
   ```
2. Develop and commit changes to your feature branch
3. When complete, create a pull request to merge into `develop`
4. After code review, merge the feature branch into `develop`

### Bug Fixes
1. Create a bugfix branch from `develop`:
   ```
   git checkout develop
   git pull
   git checkout -b bugfix/bug-description
   ```
2. Fix the bug and commit changes
3. Create a pull request to merge into `develop`

### Hotfixes
1. Create a hotfix branch from `main`:
   ```
   git checkout main
   git pull
   git checkout -b hotfix/issue-description
   ```
2. Fix the issue and commit changes
3. Create pull requests to merge into both `main` and `develop`

### Releases
1. Create a release branch from `develop`:
   ```
   git checkout develop
   git pull
   git checkout -b release/v1.0.0
   ```
2. Make final adjustments and version bumps
3. Create pull requests to merge into both `main` and `develop`
4. Tag the release in `main`:
   ```
   git checkout main
   git pull
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

## Commit Message Guidelines
- Use present tense ("Add feature" not "Added feature")
- First line is a summary (50 chars or less)
- Reference issues and pull requests where appropriate
- Consider using conventional commits format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `refactor:` for code refactoring
  - `test:` for adding tests
  - `chore:` for maintenance tasks
