# Single Responsibility Principle (SRP)

> A class should have only one reason to change.

## Bad - Multiple Responsibilities

```mermaid
classDiagram
    class User {
        +string name
        +string email
        +saveToDatabase()
        +sendEmail()
        +generateReport()
        +validateData()
    }

    note for User "Too many responsibilities! <br/> - Data management <br/> - Database operations <br/> - Email handling <br/> - Report generation <br/> - Validation"
```

## Good - Single Responsibility

```mermaid
classDiagram
    class User {
        +string name
        +string email
        +getName()
        +getEmail()
    }

    class UserRepository {
        +save(user)
        +find(id)
        +delete(id)
    }

    class EmailService {
        +sendEmail(user)
        +sendWelcomeEmail(user)
    }

    class ReportGenerator {
        +generateUserReport(user)
    }

    class UserValidator {
        +validate(user)
        +isValid()
    }

    User --> UserRepository : uses
    User --> EmailService : uses
    User --> ReportGenerator : uses
    User --> UserValidator : uses
```

## Key Takeaway

Each class should have **only one reason to change**. Separate concerns into different classes to improve maintainability and testability.
