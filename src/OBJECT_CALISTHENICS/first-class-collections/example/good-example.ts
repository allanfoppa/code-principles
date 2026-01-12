// GOOD EXAMPLE: First class collection - isolated collection behavior

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// First Class Collection - contains ONLY the collection and its operations
class ProductCollection {
  private readonly items: Product[] = [];

  add(product: Product): void {
    const existing = this.findById(product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.items.push({ ...product });
    }
    console.log(`  Added ${product.name} (x${product.quantity})`);
  }

  remove(productId: string): void {
    const index = this.items.findIndex((item) => item.id === productId);
    if (index >= 0) {
      console.log(`  Removed ${this.items[index].name}`);
      this.items.splice(index, 1);
    }
  }

  private findById(id: string): Product | undefined {
    return this.items.find((item) => item.id === id);
  }

  getSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotalQuantity(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  contains(productId: string): boolean {
    return this.items.some((item) => item.id === productId);
  }

  forEach(callback: (product: Product) => void): void {
    this.items.forEach(callback);
  }
}

// Another First Class Collection for discount rules
class DiscountRate {
  private readonly rate: number;

  constructor(percentage: number) {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Discount must be between 0 and 100");
    }
    this.rate = percentage;
  }

  apply(amount: number): number {
    return amount * (1 - this.rate / 100);
  }

  getPercentage(): number {
    return this.rate;
  }
}

// Main class now delegates to first class collections
export class GoodShoppingCart {
  private readonly products: ProductCollection;
  private readonly userId: string;
  private discount: DiscountRate;

  constructor(userId: string) {
    this.products = new ProductCollection();
    this.userId = userId;
    this.discount = new DiscountRate(0);
    console.log("GOOD: Shopping cart with first class collections...\n");
  }

  addItem(product: Product): void {
    this.products.add(product);
  }

  removeItem(productId: string): void {
    this.products.remove(productId);
  }

  getTotal(): number {
    const subtotal = this.products.getSubtotal();
    return this.discount.apply(subtotal);
  }

  getItemCount(): number {
    return this.products.getTotalQuantity();
  }

  applyDiscount(percentage: number): void {
    this.discount = new DiscountRate(percentage);
  }

  getUserId(): string {
    return this.userId;
  }
}

// Demo
const cart = new GoodShoppingCart("USER-123");
cart.addItem({ id: "1", name: "Laptop", price: 1000, quantity: 1 });
cart.addItem({ id: "2", name: "Mouse", price: 25, quantity: 2 });
cart.applyDiscount(10);
console.log(`Total items: ${cart.getItemCount()}`);
console.log(`Total: $${cart.getTotal().toFixed(2)}\n`);
