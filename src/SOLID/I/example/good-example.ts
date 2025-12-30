// Small, specific interfaces that clients can implement as needed and follows Interface Segregation Principle
export interface Payable {
  processPayment(amount: number): void;
}

export interface Refundable {
  processRefund(amount: number): void;
}

export interface CashbackProvider {
  processCashback(amount: number): void;
}

export interface RecurringPayment {
  processRecurringPayment(amount: number): void;
}

export interface InvoiceGenerator {
  generateInvoice(): string;
}

// CreditCardPayment implements all interfaces
export class CreditCardPayment
  implements Payable, Refundable, CashbackProvider, RecurringPayment, InvoiceGenerator
{
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

// CashPayment only implements Payable
export class CashPayment implements Payable {
  processPayment(amount: number): void {
    console.log(`Processing cash payment of $${amount}`);
  }

  // ✅ No need to implement refund, cashback, recurring, or invoice
  // ✅ Methods simply don't exist - no exceptions needed
}

// PayPalPayment implements some interfaces
export class PayPalPayment implements Payable, Refundable, InvoiceGenerator {
  processPayment(amount: number): void {
    console.log(`Processing PayPal payment of $${amount}`);
  }

  processRefund(amount: number): void {
    console.log(`Refunding PayPal payment of $${amount}`);
  }

  generateInvoice(): string {
    return "PayPal Invoice Generated";
  }

  // ✅ Doesn't implement cashback or recurring - not needed
}

// Benefits of this approach:
// Classes only implement interfaces they need
// No forced implementation of irrelevant methods
// No exceptions for unsupported operations
// Follows Interface Segregation Principle

// Usage Example
function processBasicPayment(payment: Payable, amount: number) {
  payment.processPayment(amount);
}

function processRefundablePayment(payment: Payable & Refundable, amount: number) {
  payment.processPayment(amount);
  payment.processRefund(amount / 2);
}

const creditCard = new CreditCardPayment();
const cash = new CashPayment();
const paypal = new PayPalPayment();

console.log("CreditCardPayment (full-featured):");
processBasicPayment(creditCard, 100);
creditCard.processCashback(5);
creditCard.processRecurringPayment(100);
console.log(creditCard.generateInvoice());

console.log("\nCashPayment (basic only):");
processBasicPayment(cash, 100);
// cash.processRefund(50); // ❌ TypeScript error - method doesn't exist
// cash.generateInvoice(); // ❌ TypeScript error - method doesn't exist

console.log("\nPayPalPayment (selective features):");
processRefundablePayment(paypal, 100);
console.log(paypal.generateInvoice());
// paypal.processCashback(5); // ❌ TypeScript error - method doesn't exist
