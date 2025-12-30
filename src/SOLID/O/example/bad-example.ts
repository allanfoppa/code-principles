// This class must be modified every time we add a new payment method this violates Open/Closed Principle

export class PaymentProcessor {
  processPayment(method: string, amount: number): void {
    if (method === "credit-card") {
      console.log(`Processing credit card payment of $${amount}`);
      // Credit card specific logic
      this.validateCreditCard();
      this.chargeCreditCard(amount);
    } else if (method === "paypal") {
      console.log(`Processing PayPal payment of $${amount}`);
      // PayPal specific logic
      this.validatePayPalAccount();
      this.chargePayPal(amount);
    } else if (method === "bitcoin") {
      console.log(`Processing Bitcoin payment of $${amount}`);
      // Bitcoin specific logic
      this.validateBitcoinWallet();
      this.chargeBitcoin(amount);
    } else {
      throw new Error(`Payment method ${method} not supported`);
    }
  }

  private validateCreditCard(): void {
    console.log("Validating credit card...");
  }

  private chargeCreditCard(amount: number): void {
    console.log(`Charging $${amount} to credit card`);
  }

  private validatePayPalAccount(): void {
    console.log("Validating PayPal account...");
  }

  private chargePayPal(amount: number): void {
    console.log(`Charging $${amount} via PayPal`);
  }

  private validateBitcoinWallet(): void {
    console.log("Validating Bitcoin wallet...");
  }

  private chargeBitcoin(amount: number): void {
    console.log(`Charging $${amount} via Bitcoin`);
  }
}

// Problems with this approach:
// Adding a new payment method requires modifying the existing class
// The class grows larger with each new payment method
// High risk of breaking existing functionality when adding new features
// Difficult to test individual payment methods
// Violates Open/Closed Principle (not open for extension, requires modification)

// Usage Example
const processor = new PaymentProcessor();

console.log("--------- Setting Credit Card Processor ---------");
processor.processPayment("credit-card", 100);

console.log("--------- Setting PayPal Processor ---------");
processor.processPayment("paypal", 200);

console.log("--------- Setting Bitcoin Processor ---------");
processor.processPayment("bitcoin", 300);

// What happens when we need to add Stripe?
// We must modify PaymentProcessor class and add another if-else block!
