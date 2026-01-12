// BAD EXAMPLE: Violating Law of Demeter - too many dots, reaching through objects

interface Wallet {
  getBalance(): number;
  deduct(amount: number): void;
}

interface Address {
  getStreet(): string;
  getCity(): string;
  getZipCode(): string;
}

interface Customer {
  getName(): string;
  getWallet(): Wallet;
  getAddress(): Address;
}

interface Product {
  getPrice(): number;
  getName(): string;
}

export class BadOrderProcessor {
  processOrder(customer: Customer, product: Product): void {
    console.log("🔴 BAD: Violating Law of Demeter with multiple dots...\n");

    // Too many dots - reaching deep into object structure
    const customerName = customer.getName();
    const balance = customer.getWallet().getBalance();
    const street = customer.getAddress().getStreet();
    const city = customer.getAddress().getCity();
    const price = product.getPrice();

    console.log(`Customer: ${customerName}`);
    console.log(`Address: ${street}, ${city}`);
    console.log(`Balance: $${balance}`);
    console.log(`Product: ${product.getName()} - $${price}`);

    // Reaching into customer's wallet internals
    if (customer.getWallet().getBalance() >= product.getPrice()) {
      customer.getWallet().deduct(product.getPrice());
      console.log(`✓ Payment processed: $${price}`);
      console.log(`  New balance: $${customer.getWallet().getBalance()}`);
    } else {
      console.log(`✗ Insufficient funds`);
    }

    // Building address string by reaching into Address object
    const fullAddress = `${customer.getAddress().getStreet()}, ${customer.getAddress().getCity()} ${customer.getAddress().getZipCode()}`;
    console.log(`\nShipping to: ${fullAddress}`);
  }
}

// Demo
const customer: Customer = {
  getName: () => "John Doe",
  getWallet: () => ({
    getBalance: () => 100,
    deduct: (amount: number) => console.log(`  Deducting $${amount}`),
  }),
  getAddress: () => ({
    getStreet: () => "123 Main St",
    getCity: () => "New York",
    getZipCode: () => "10001",
  }),
};

const product: Product = {
  getName: () => "Laptop",
  getPrice: () => 80,
};

const processor = new BadOrderProcessor();
processor.processOrder(customer, product);
