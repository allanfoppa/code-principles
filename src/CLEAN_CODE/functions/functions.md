# Functions

## Overview

Functions are the first line of organization in any program. Clean functions should be small, do one thing well, and have descriptive names.

## Key Rules

### 1. Small Functions

- Functions should be small (ideally 20 lines or fewer)
- If you can extract another function from a function, then the function is too large

### 2. Do One Thing

- Functions should do one thing, do it well, and do it only
- One level of abstraction per function

### 3. Function Names

- Function names should be descriptive verbs
- The name should tell you exactly what the function does

### 4. Function Arguments

- Ideal number of arguments: 0 (niladic)
- Avoid more than 3 arguments (triadic)
- Use objects to reduce argument count

### 5. No Side Effects

- Functions should not have hidden side effects
- If a function changes state, it should be obvious from the name

### 6. Command Query Separation

- Functions should either do something or answer something, not both
- Commands: change state, return void
- Queries: return information, don't change state

## NOTE

"The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that."
