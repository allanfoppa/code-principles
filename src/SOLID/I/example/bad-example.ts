// Fat interface forces classes to implement methods they don't need violating Interface Segregation Principle
export interface PaymentGateway {
  processPayment(amount: number): void;
  processRefund(amount: number): void;
  processCashback(amount: number): void;
  processRecurringPayment(amount: number): void;
  generateInvoice(): string;
}

export class CreditCardPayment implements PaymentGateway {
  processPayment(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
  }

  processRefund(amount: number): void {
    console.log(`Refunding credit card payment of $${amount}`);
  }

  processCashback(amount: number): void {
    console.log(`Processing cashback of $${amount}`);
  }

  processRecurringPayment(amount: number): void {
    console.log(`Setting up recurring payment of $${amount}`);
  }

  generateInvoice(): string {
    return "Credit Card Invoice Generated";
  }
}

export class CashPayment implements PaymentGateway {
  processPayment(amount: number): void {
    console.log(`Processing cash payment of $${amount}`);
  }

  // Forced to implement even though cash can't be refunded
  processRefund(amount: number): void {
    throw new Error("Cannot refund cash payments!");
  }

  // Forced to implement even though cash doesn't have cashback
  processCashback(amount: number): void {
    throw new Error("Cash payments don't support cashback!");
  }

  // Forced to implement even though cash can't be recurring
  processRecurringPayment(amount: number): void {
    throw new Error("Cash payments can't be recurring!");
  }

  // Forced to implement even though cash doesn't generate invoices
  generateInvoice(): string {
    throw new Error("Cash payments don't generate invoices!");
  }
}

// Problems with this approach:
// CashPayment forced to implement methods it doesn't support
// Methods throw exceptions instead of not existing
// Interface is too large and not cohesive
// Violates Interface Segregation Principle

// Usage Example
const creditCard = new CreditCardPayment();
const cash = new CashPayment();

console.log("CreditCardPayment (all methods work):");
creditCard.processPayment(100);
creditCard.processRefund(50);
creditCard.processCashback(5);
creditCard.processRecurringPayment(100);
console.log(creditCard.generateInvoice());

console.log("\nCashPayment (most methods throw exceptions):");
cash.processPayment(100);

try {
  cash.processRefund(50); // Throws exception
} catch (error) {
  console.error(`Error: ${(error as Error).message}`);
}

try {
  cash.processCashback(5); // Throws exception
} catch (error) {
  console.error(`Error: ${(error as Error).message}`);
}

try {
  cash.generateInvoice(); // Throws exception
} catch (error) {
  console.error(`Error: ${(error as Error).message}`);
}
