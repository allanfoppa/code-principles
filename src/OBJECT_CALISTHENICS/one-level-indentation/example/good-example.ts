// GOOD EXAMPLE: Each method has only one level of indentation

interface Order {
  id: string;
  isValid: boolean;
  items: OrderItem[];
  customer: Customer;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  quantity: number;
}

interface Customer {
  id: string;
  email: string;
  hasValidPaymentMethod: boolean;
}

export class GoodOrderProcessor {
  processOrders(orders: Order[]): void {
    console.log("🟢 GOOD: Processing orders with single indentation level...\n");

    for (const order of orders) {
      // Level 1 only
      this.processOrder(order);
    }
  }

  private processOrder(order: Order): void {
    if (!order.isValid) return; // Level 1 only

    const total = this.calculateOrderTotal(order);
    this.finalizeOrder(order, total);
  }

  private calculateOrderTotal(order: Order): number {
    let total = 0;

    for (const item of order.items) {
      // Level 1 only
      total += this.calculateItemTotal(item);
    }

    return total;
  }

  private calculateItemTotal(item: OrderItem): number {
    if (!item.inStock) return 0; // Level 1 only

    const itemTotal = item.price * item.quantity;
    console.log(`  Processing: ${item.name} - $${itemTotal}`);

    return this.applyDiscountIfNeeded(item, itemTotal);
  }

  private applyDiscountIfNeeded(item: OrderItem, total: number): number {
    if (item.quantity <= 10) return total; // Level 1 only

    console.log(`    Large order discount applied!`);
    return total * 0.9;
  }

  private finalizeOrder(order: Order, total: number): void {
    if (!this.canProcessPayment(order, total)) return; // Level 1 only

    console.log(`✓ Order ${order.id} processed: $${total.toFixed(2)}`);
  }

  private canProcessPayment(order: Order, total: number): boolean {
    if (!order.customer.hasValidPaymentMethod) {
      // Level 1 only
      console.log(`✗ Order ${order.id} failed: Invalid payment method`);
      return false;
    }

    if (total <= 0) {
      // Level 1 only
      return false;
    }

    return true;
  }
}

// Demo
const orders: Order[] = [
  {
    id: "ORD-001",
    isValid: true,
    items: [
      { id: "1", name: "Laptop", price: 1000, inStock: true, quantity: 2 },
      { id: "2", name: "Mouse", price: 25, inStock: true, quantity: 15 },
    ],
    customer: { id: "CUST-001", email: "john@example.com", hasValidPaymentMethod: true },
  },
];

const processor = new GoodOrderProcessor();
processor.processOrders(orders);
