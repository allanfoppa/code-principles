// Base class defines the contract
abstract class PaymentMethod {
  protected amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  // If a method is abstract, the child MUST implement it - no exceptions! This is the "contract" that abstract classes enforce.
  abstract processPayment(): void;

  // Concrete method - shared behavior
  public logTransaction(): void {
    console.log(`Transaction of $${this.amount} recorded`);
  }
}

// Different implementations of the same interface
class CreditCardPayment extends PaymentMethod {
  private cardNumber: string;

  constructor(amount: number, cardNumber: string) {
    super(amount);
    this.cardNumber = cardNumber;
  }

  public processPayment(): void {
    console.log(`Processing credit card payment: $${this.amount}`);
    console.log(`Card ending in: ${this.cardNumber.slice(-4)}`);
    // Credit card specific logic...
  }
}

class PayPalPayment extends PaymentMethod {
  private email: string;

  constructor(amount: number, email: string) {
    super(amount);
    this.email = email;
  }

  public processPayment(): void {
    console.log(`Processing PayPal payment: $${this.amount}`);
    console.log(`PayPal account: ${this.email}`);
    // PayPal specific logic...
  }
}

class CryptoPayment extends PaymentMethod {
  private walletAddress: string;

  constructor(amount: number, walletAddress: string) {
    super(amount);
    this.walletAddress = walletAddress;
  }

  public processPayment(): void {
    console.log(`Processing crypto payment: $${this.amount}`);
    console.log(`Wallet: ${this.walletAddress}`);
    // Crypto specific logic...
  }
}

// ✨ POLYMORPHISM IN ACTION ✨
// This function works with ANY payment method!
function executePayment(payment: PaymentMethod): void {
  payment.processPayment(); // Different behavior based on actual type
  payment.logTransaction(); // Same behavior for all
}

// Usage - same function, different behaviors
const creditCard = new CreditCardPayment(100, "1234567890123456");
const paypal = new PayPalPayment(50, "user@example.com");
const cryptoPayment = new CryptoPayment(200, "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");

executePayment(creditCard); // Credit card behavior
executePayment(paypal); // PayPal behavior
executePayment(cryptoPayment); // Crypto behavior

// Can store different types in same array!
const payments: PaymentMethod[] = [creditCard, paypal, cryptoPayment];
payments.forEach((payment) => executePayment(payment));

// NOTES:
// - There are different ways to achieve polymorphism in TypeScript, including interfaces and method overriding.
// - The abstract class enforces a contract that all payment methods must implement the processPayment method.
