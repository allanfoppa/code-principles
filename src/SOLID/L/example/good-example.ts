// Separate optional capabilities into interfaces and follows Liskov Substitution Principle
export abstract class PaymentProcessor {
  protected transactionHistory: Array<{ amount: number; timestamp: Date }> = [];

  abstract process(amount: number): void;

  abstract validate(): boolean;

  getTransactionHistory(): Array<{ amount: number; timestamp: Date }> {
    return [...this.transactionHistory]; // Return copy to maintain invariant
  }
}

// Separate interface for refundable payments
export interface RefundablePayment {
  refund(amount: number): void;
}

// Separate interface for payments with fees
export interface FeeCalculable {
  getTransactionFee(): number;
}

export class CreditCardPayment
  extends PaymentProcessor
  implements RefundablePayment, FeeCalculable
{
  process(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
    this.transactionHistory.push({ amount, timestamp: new Date() });
  }

  validate(): boolean {
    console.log("Validating credit card...");
    return true;
  }

  // Implements RefundablePayment
  refund(amount: number): void {
    console.log(`Refunding credit card payment of $${amount}`);
    this.transactionHistory.push({ amount: -amount, timestamp: new Date() });
  }

  // Implements FeeCalculable
  getTransactionFee(): number {
    return 2.9;
  }
}

export class CashPayment extends PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing cash payment of $${amount}`);
    this.transactionHistory.push({ amount, timestamp: new Date() });
  }

  validate(): boolean {
    console.log("Validating cash payment...");
    return true;
  }

  // No refund method - doesn't claim to support refunds
  // No fee method - doesn't claim to have fees
}

export class PayPalPayment extends PaymentProcessor implements RefundablePayment, FeeCalculable {
  process(amount: number): void {
    console.log(`Processing PayPal payment of $${amount}`);
    this.transactionHistory.push({ amount, timestamp: new Date() });
  }

  validate(): boolean {
    console.log("Validating PayPal account...");
    return true;
  }

  // ✅ Implements RefundablePayment
  refund(amount: number): void {
    console.log(`Refunding PayPal payment of $${amount}`);
    this.transactionHistory.push({ amount: -amount, timestamp: new Date() });
  }

  // ✅ Implements FeeCalculable
  getTransactionFee(): number {
    return 3.5;
  }
}

// Benefits of this approach:
// All PaymentProcessor subclasses can be substituted without breaking
// Optional capabilities are in separate interfaces
// No unexpected exceptions
// Follows Liskov Substitution Principle

// Usage Example
function processWithRefund(processor: RefundablePayment & PaymentProcessor, amount: number) {
  processor.process(amount);
  processor.refund(amount / 2);
}

function processWithFees(processor: FeeCalculable & PaymentProcessor, amount: number) {
  processor.process(amount);
  const fee = processor.getTransactionFee();
  console.log(`Fee: $${fee}`);
}

function processBasic(processor: PaymentProcessor, amount: number) {
  processor.process(amount);
}

console.log("Processing with CreditCardPayment:");
const creditCard = new CreditCardPayment();
processBasic(creditCard, 100);
processWithRefund(creditCard, 100);
processWithFees(creditCard, 100);

console.log("\nProcessing with CashPayment:");
const cash = new CashPayment();
processBasic(cash, 100); // ✅ Works perfectly, no refund/fee calls

console.log("\nProcessing with PayPalPayment:");
const paypal = new PayPalPayment();
processBasic(paypal, 100);
processWithRefund(paypal, 100);
processWithFees(paypal, 100);
