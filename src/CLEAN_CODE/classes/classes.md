# Classes

## Overview

Clean classes are small, have a single responsibility, and are organized to minimize coupling and maximize cohesion.

## Key Rules

### 1. Class Organization

- Public static constants first
- Private static variables
- Private instance variables
- Public functions
- Private utilities called by public functions

### 2. Classes Should Be Small

- Small in terms of responsibilities, not lines of code
- A class should have one reason to change (Single Responsibility Principle)

### 3. Single Responsibility Principle (SRP)

- A class should have only one responsibility
- A class should have only one reason to change
- If you can describe a class responsibility with "and" or "or", it's probably too large

### 4. Cohesion

- Classes should have a small number of instance variables
- Methods should manipulate one or more of those variables
- High cohesion means methods and variables are co-dependent

### 5. Maintaining Cohesion Results in Small Classes

- When classes lose cohesion, split them
- Extract smaller classes from larger ones

### 6. Organizing for Change

- Classes should be open for extension but closed for modification
- Use interfaces and abstract classes to minimize coupling
- Isolate volatility behind interfaces

### 7. Encapsulation

- Keep variables and utility functions private
- Expose only what's necessary through public interface
- Use getters/setters judiciously

## NOTE

"Classes should be small. The first rule of classes is that they should be small. The second rule of classes is that they should be smaller than that."
