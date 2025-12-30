// CashPayment breaks the contract defined by PaymentProcessor violating Liskov Substitution Principle
export abstract class PaymentProcessor {
  protected transactionHistory: Array<{ amount: number; timestamp: Date }> = [];

  abstract process(amount: number): void;

  // Parent expects: all subclasses can refund
  refund(amount: number): void {
    console.log(`Refunding $${amount}...`);
    this.transactionHistory.push({
      amount: -amount,
      timestamp: new Date(),
    });
  }

  // Parent expects: all subclasses can calculate fees
  getTransactionFee(): number {
    return 2.5; // Default fee
  }

  getTransactionHistory(): Array<{ amount: number; timestamp: Date }> {
    return this.transactionHistory;
  }
}

export class CreditCardPayment extends PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
    this.transactionHistory.push({ amount, timestamp: new Date() });
  }

  // Can refund
  refund(amount: number): void {
    console.log(`Refunding credit card payment of $${amount}`);
    super.refund(amount);
  }

  // Has transaction fees
  getTransactionFee(): number {
    return 2.9; // Credit card fee
  }
}

export class CashPayment extends PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing cash payment of $${amount}`);
    this.transactionHistory.push({ amount, timestamp: new Date() });
  }

  // BREAKS LSP: Throws exception instead of refunding
  refund(amount: number): void {
    throw new Error("Cannot refund cash payments!");
  }

  // BREAKS LSP: Throws exception instead of calculating fees
  getTransactionFee(): number {
    throw new Error("Cash payments don't have fees!");
  }
}

// Problems with this approach:
// CashPayment cannot be substituted for PaymentProcessor
// Code that works with PaymentProcessor breaks with CashPayment
// Throws unexpected exceptions
// Violates Liskov Substitution Principle

// Usage Example - Shows how LSP is violated

function processPaymentAndRefund(processor: PaymentProcessor, amount: number) {
  processor.process(amount);
  console.log(`Transaction fee: $${processor.getTransactionFee()}`);

  // This works fine for CreditCard...
  // But BREAKS for CashPayment!
  try {
    processor.refund(amount / 2);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }

  console.log();
}

const creditCard = new CreditCardPayment();
const cash = new CashPayment();

console.log("Processing with CreditCardPayment:");
processPaymentAndRefund(creditCard, 100);

console.log("Processing with CashPayment:");
processPaymentAndRefund(cash, 100); // ❌ THROWS EXCEPTION!
