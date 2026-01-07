# DRY - Don't Repeat Yourself

## Overview

The DRY principle states that "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system." It's about eliminating duplication in logic, not just code.

## Key Rules

### 1. Avoid Code Duplication

- Extract common functionality into functions or classes
- Don't copy and paste code
- Look for patterns in your code

### 2. Eliminate Magic Numbers and Strings

- Use named constants instead of hardcoded values
- Create configuration files for repeated values
- Use enums for repeated string literals

### 3. Centralize Business Logic

- Keep business rules in one place
- Avoid duplicating validation logic
- Create shared utility functions

### 4. Don't Repeat Configuration

- Use configuration files or environment variables
- Avoid hardcoding URLs, API keys, or settings
- Create shared configuration modules

### 5. Avoid Duplicate Data Structures

- Use shared interfaces and types
- Normalize data structures
- Avoid maintaining the same data in multiple places

### 6. Extract Common Patterns

- Identify repeated code patterns
- Create reusable components
- Use design patterns to eliminate duplication

### 7. Be Careful with DRY

- Don't abstract too early
- Sometimes duplication is better than wrong abstraction
- Focus on knowledge duplication, not just code similarity

## Common Violations

- ❌ Copy-paste programming
- ❌ Magic numbers throughout the codebase
- ❌ Repeated validation logic
- ❌ Duplicate API endpoints
- ❌ Similar functions with slight variations
- ❌ Repeated configuration values

## NOTE

"Don't repeat yourself, but also don't abstract too early. Focus on eliminating knowledge duplication, not just code duplication."
