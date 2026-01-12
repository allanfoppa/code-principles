// GOOD EXAMPLE: Law of Demeter - Tell, Don't Ask

interface Product {
  getPrice(): number;
  getName(): string;
}

// Customer encapsulates payment logic
class GoodCustomer {
  constructor(
    private readonly name: string,
    private balance: number,
    private readonly address: ShippingAddress
  ) {}

  getName(): string {
    return this.name;
  }

  // Tell customer to pay, don't reach into wallet
  pay(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`✓ Payment processed: $${amount}`);
      console.log(`  New balance: $${this.balance}`);
      return true;
    }
    console.log(`✗ Insufficient funds (Balance: $${this.balance}, Required: $${amount})`);
    return false;
  }

  getBalance(): number {
    return this.balance;
  }

  // Customer provides formatted address, hiding internal structure
  getShippingInfo(): string {
    return this.address.format();
  }
}

// Address encapsulates formatting logic
class ShippingAddress {
  constructor(
    private readonly street: string,
    private readonly city: string,
    private readonly zipCode: string
  ) {}

  format(): string {
    return `${this.street}, ${this.city} ${this.zipCode}`;
  }

  getCity(): string {
    return this.city;
  }
}

export class GoodOrderProcessor {
  processOrder(customer: GoodCustomer, product: Product): void {
    console.log("🟢 GOOD: Following Law of Demeter - one dot per line...\n");

    // Only one dot - talking to direct collaborators
    const customerName = customer.getName();
    const balance = customer.getBalance();
    const shippingInfo = customer.getShippingInfo(); // Address formatted by customer
    const price = product.getPrice();

    console.log(`Customer: ${customerName}`);
    console.log(`Address: ${shippingInfo}`);
    console.log(`Balance: $${balance}`);
    console.log(`Product: ${product.getName()} - $${price}`);

    // Tell customer to pay, don't manipulate wallet directly
    const success = customer.pay(price);

    if (success) {
      console.log(`\nShipping to: ${shippingInfo}`);
    }
  }
}

// Demo
const address = new ShippingAddress("123 Main St", "New York", "10001");
const customer = new GoodCustomer("John Doe", 100, address);

const product: Product = {
  getName: () => "Laptop",
  getPrice: () => 80,
};

const processor = new GoodOrderProcessor();
processor.processOrder(customer, product);
