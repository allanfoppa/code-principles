# Open/Closed Principle (OCP)

> Open for extension, closed for modification.

## Bad - Modifying Existing Code

```mermaid
graph LR
    A[PaymentProcessor] -->|if credit card| B[Process Credit Card]
    A -->|if paypal| C[Process PayPal]
    A -->|if bitcoin?| D[Modify existing code!]

    style D stroke:#ff6b6b,stroke-width:3px
```

## Good - Extending with New Classes

```mermaid
classDiagram
    class PaymentService {
        <<High-level>>
        +process()
    }

    class PaymentProcessor {
        <<interface>>
        +process(amount)
    }

    class CreditCardPayment {
        +process(amount)
    }

    class PayPalPayment {
        +process(amount)
    }

    class BitcoinPayment {
        +process(amount)
    }

    class StripePayment {
        +process(amount)
    }

    PaymentService   --> PaymentProcessor : depends on
    CreditCardPayment ..|> PaymentProcessor : implements
    PayPalPayment ..|> PaymentProcessor : implements
    BitcoinPayment ..|> PaymentProcessor : implements
    StripePayment ..|> PaymentProcessor : implements

    note for PaymentProcessor "Add new payment methods <br/> without modifying existing code!"
```

## Key Takeaway

Software entities should be **open for extension** (add new functionality) but **closed for modification** (don't change existing code). Use interfaces and abstractions to allow new behaviors without altering existing implementations.
