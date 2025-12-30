# Dependency Inversion Principle (DIP)

> Depend on abstractions, not concretions.

## Bad - High-level depends on Low-level

```mermaid
graph TD
    A[OrderService<br/>High-level] -->|directly depends on| B[MySQLDatabase<br/>Low-level]
    A -->|directly depends on| C[EmailSender<br/>Low-level]

    style A stroke:#ff6b6b,stroke-width:3px
    style B stroke:#ff6b6b,stroke-width:3px
    style C stroke:#ff6b6b,stroke-width:3px

    note1[Hard to test and change!]

    A -.-> note1
```

## Good - Both depend on Abstractions

```mermaid
classDiagram
    class OrderService {
        <<High-level>>
        -IDatabase db
        -IEmailService email
        +processOrder()
    }

    class IDatabase {
        <<interface>>
        +save()
        +find()
    }

    class IEmailService {
        <<interface>>
        +send()
    }

    class MySQLDatabase {
        +save()
        +find()
    }

    class PostgreSQLDatabase {
        +save()
        +find()
    }

    class SendGridEmail {
        +send()
    }

    class AWSEmailService {
        +send()
    }

    OrderService --> IDatabase : depends on
    OrderService --> IEmailService : depends on
    IDatabase <|.. MySQLDatabase : implements
    IDatabase <|.. PostgreSQLDatabase : implements
    IEmailService <|.. SendGridEmail : implements
    IEmailService <|.. AWSEmailService : implements

    note for OrderService "Easy to test and <br /> swap implementations!"
```

## Key Takeaway

High-level modules should not depend on low-level modules. Both should depend on **abstractions** (interfaces). This makes the code flexible, testable, and easy to change.
