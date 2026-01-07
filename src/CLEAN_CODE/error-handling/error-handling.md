# Error Handling

## Overview

Clean error handling separates the happy path from error processing. Errors should be handled gracefully and provide meaningful information to help diagnose and fix problems.

## Key Rules

### 1. Use Exceptions Rather Than Return Codes

- Exceptions clearly separate the happy path from error handling
- Return codes can be forgotten and ignored

### 2. Write Your Try-Catch-Finally Statement First

- Think of try-catch-finally as a transaction boundary
- Define the scope of error handling upfront

### 3. Provide Context with Exceptions

- Create informative error messages that describe:
  - What went wrong
  - Where it went wrong
  - What was expected

### 4. Define Exception Classes in Terms of Caller's Needs

- Create custom exception classes that provide meaningful information
- Group related errors under specific exception types

### 5. Define the Normal Flow

- Use the Special Case Pattern to handle special cases gracefully
- Don't force callers to deal with special cases

### 6. Don't Return Null

- Returning null forces callers to check for null
- Consider returning empty objects or throwing exceptions instead

### 7. Don't Pass Null

- Passing null to methods is bad practice
- Validate inputs and throw exceptions for invalid parameters

### 8. Fail Fast

- Detect and report errors as early as possible
- Don't let invalid data propagate through the system

## NOTE

"Clean code is readable, but it must also be robust. These are not conflicting goals."
