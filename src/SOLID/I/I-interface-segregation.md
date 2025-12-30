# Interface Segregation Principle (ISP)

> Many specific interfaces are better than one general interface.

## Bad - Fat Interface

```mermaid
classDiagram
    class PaymentGateway {
        <<interface>>
        +processPayment(amount)
        +processRefund(amount)
        +processCashback(amount)
        +processRecurringPayment(amount)
        +generateInvoice()
    }

    class CreditCardPayment {
        +processPayment(amount) ✅
        +processRefund(amount) ✅
        +processCashback(amount) ✅
        +processRecurringPayment(amount) ✅
        +generateInvoice() ✅
    }

    class CashPayment {
        +processPayment(amount) ✅
        +processRefund(amount) ❌ Can't refund cash!
        +processCashback(amount) ❌ No cashback!
        +processRecurringPayment(amount) ❌ Can't recur!
        +generateInvoice() ❌ No invoices!
    }

    PaymentGateway <|.. CreditCardPayment : implements
    PaymentGateway <|.. CashPayment : implements

    note for CashPayment "Forced to implement <br/> irrelevant methods!"
```

## Good - Segregated Interfaces

```mermaid
classDiagram
    class Payable {
        <<interface>>
        +processPayment(amount)
    }

    class Refundable {
        <<interface>>
        +processRefund(amount)
    }

    class CashbackProvider {
        <<interface>>
        +processCashback(amount)
    }

    class RecurringPayment {
        <<interface>>
        +processRecurringPayment(amount)
    }

    class InvoiceGenerator {
        <<interface>>
        +generateInvoice()
    }

    class CreditCardPayment {
        +processPayment(amount)
        +processRefund(amount)
        +processCashback(amount)
        +processRecurringPayment(amount)
        +generateInvoice()
    }

    class CashPayment {
        +processPayment(amount)
    }

    Payable <|.. CreditCardPayment
    Refundable <|.. CreditCardPayment
    CashbackProvider <|.. CreditCardPayment
    RecurringPayment <|.. CreditCardPayment
    InvoiceGenerator <|.. CreditCardPayment
    Payable <|.. CashPayment

    note for CreditCardPayment "Implements only <br/> what it needs!"
    note for CashPayment "Only implements <br/> payment processing!"
```

## Key Takeaway

Clients should not be forced to depend on interfaces they don't use. Create **small, specific interfaces** rather than one large, general-purpose interface.
