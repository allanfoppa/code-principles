// New payment methods can be added without modifying existing code following Open/Closed Principle

// Interface that all payment processors must implement
export interface PaymentProcessor {
  process(amount: number): void;
}

// Each payment method is a separate class
export class CreditCardPayment implements PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
    this.validateCreditCard();
    this.chargeCreditCard(amount);
  }

  private validateCreditCard(): void {
    console.log("Validating credit card...");
  }

  private chargeCreditCard(amount: number): void {
    console.log(`Charging $${amount} to credit card`);
  }
}

export class PayPalPayment implements PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing PayPal payment of $${amount}`);
    this.validatePayPalAccount();
    this.chargePayPal(amount);
  }

  private validatePayPalAccount(): void {
    console.log("Validating PayPal account...");
  }

  private chargePayPal(amount: number): void {
    console.log(`Charging $${amount} via PayPal`);
  }
}

export class BitcoinPayment implements PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing Bitcoin payment of $${amount}`);
    this.validateBitcoinWallet();
    this.chargeBitcoin(amount);
  }

  private validateBitcoinWallet(): void {
    console.log("Validating Bitcoin wallet...");
  }

  private chargeBitcoin(amount: number): void {
    console.log(`Charging $${amount} via Bitcoin`);
  }
}

// NEW: Adding Stripe payment WITHOUT modifying existing code!
export class StripePayment implements PaymentProcessor {
  process(amount: number): void {
    console.log(`Processing Stripe payment of $${amount}`);
    this.validateStripeAccount();
    this.chargeStripe(amount);
  }

  private validateStripeAccount(): void {
    console.log("Validating Stripe account...");
  }

  private chargeStripe(amount: number): void {
    console.log(`Charging $${amount} via Stripe`);
  }
}

// Payment service that works with any PaymentProcessor
export class PaymentService {
  constructor(private processor: PaymentProcessor) {}

  processPayment(amount: number): void {
    this.processor.process(amount);
  }

  // Can switch payment processor at runtime
  setProcessor(processor: PaymentProcessor): void {
    this.processor = processor;
  }
}

// Benefits of this approach:
// New payment methods can be added without modifying existing code
// Each payment method is isolated and easy to test
// Existing payment methods remain unchanged (closed for modification)
// System is extensible (open for extension)
// Follows Open/Closed Principle

// Usage Example
console.log("--------- Setting Credit Card Processor ---------");
const paymentService = new PaymentService(new CreditCardPayment());
paymentService.processPayment(100);

console.log("--------- Setting PayPal Processor ---------");
paymentService.setProcessor(new PayPalPayment());
paymentService.processPayment(200);

console.log("--------- Setting Bitcoin Processor ---------");
paymentService.setProcessor(new BitcoinPayment());
paymentService.processPayment(300);

console.log("--------- Setting Stripe Processor ---------");
// Using the new Stripe payment - no existing code was modified!
paymentService.setProcessor(new StripePayment());
paymentService.processPayment(400);
