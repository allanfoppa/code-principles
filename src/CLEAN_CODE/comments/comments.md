# Comments

## Overview

Comments should explain "why" not "what". Good code is self-documenting and should be written so clearly that comments are often unnecessary.

## Key Rules

### 1. Comments Don't Make Up for Bad Code

- Clean and expressive code with few comments is better than cluttered and complex code with lots of comments
- Rather than spend time writing comments that explain bad code, spend it cleaning that code

### 2. Explain Yourself in Code

- Create a function that says the same thing as the comment you want to write
- Use meaningful names instead of comments

### 3. Good Comments

#### Legal Comments

```typescript
// Copyright (c) 2024 Company Name. All rights reserved.
```

#### Informative Comments

```typescript
// Returns an instance of the Responder being tested
```

#### Warning of Consequences

```typescript
// Don't run unless you have some time to kill
public static void _testWithReallyBigFile() {
```

#### TODO Comments

```typescript
// TODO: These are not needed anymore. Remove when v2 is released
```

#### Amplification

```typescript
// The trim is really important. It removes the starting spaces
const trimmedString = someString.trim();
```

### 4. Bad Comments

#### Mumbling

```typescript
// Check to see if the employee is eligible for full benefits
```

#### Redundant Comments

```typescript
// The day of the month
private dayOfMonth: number;
```

#### Misleading Comments

```typescript
// Utility method that returns when this function started loading
// NOTE: Returns loading time in milliseconds since epoch
```

#### Noise Comments

```typescript
// Default constructor
constructor() {
}
```

## NOTE

"Don't comment bad code—rewrite it."
