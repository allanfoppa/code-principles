// BAD EXAMPLE: Collection mixed with other instance variables

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class BadShoppingCart {
  private items: Product[] = [];
  private userId: string;
  private createdAt: Date;
  private discountPercentage: number = 0;

  constructor(userId: string) {
    this.userId = userId;
    this.createdAt = new Date();
    console.log("BAD: Shopping cart with mixed responsibilities...\n");
  }

  addItem(product: Product): void {
    // Collection logic mixed with other responsibilities
    const existing = this.items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.items.push({ ...product });
    }
    console.log(`  Added ${product.name} (x${product.quantity})`);
  }

  removeItem(productId: string): void {
    const index = this.items.findIndex((item) => item.id === productId);
    if (index >= 0) {
      console.log(`  Removed ${this.items[index].name}`);
      this.items.splice(index, 1);
    }
  }

  getTotal(): number {
    const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal * (1 - this.discountPercentage / 100);
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  applyDiscount(percentage: number): void {
    this.discountPercentage = percentage;
  }

  // More methods that mix collection operations with cart logic...
}

// Demo
const cart = new BadShoppingCart("USER-123");
cart.addItem({ id: "1", name: "Laptop", price: 1000, quantity: 1 });
cart.addItem({ id: "2", name: "Mouse", price: 25, quantity: 2 });
cart.applyDiscount(10);
console.log(`Total items: ${cart.getItemCount()}`);
console.log(`Total: $${cart.getTotal().toFixed(2)}\n`);
