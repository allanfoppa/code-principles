// BAD EXAMPLE: Multiple levels of indentation make the code hard to read and maintain

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

export class BadOrderProcessor {
  processOrders(orders: Order[]): void {
    console.log("BAD: Processing orders with deep nesting...\n");

    for (const order of orders) {
      // Level 1
      if (order.isValid) {
        // Level 2
        if (order.items.length > 0) {
          // Level 3
          let orderTotal = 0;
          for (const item of order.items) {
            // Level 4
            if (item.inStock) {
              // Level 5
              const itemTotal = item.price * item.quantity;
              orderTotal += itemTotal;
              console.log(`  Processing: ${item.name} - $${itemTotal}`);

              if (item.quantity > 10) {
                // Level 6
                console.log(`    Large order discount applied!`);
                orderTotal *= 0.9;
              }
            }
          }

          if (order.customer.hasValidPaymentMethod) {
            // Level 3
            if (orderTotal > 0) {
              // Level 4
              console.log(`✓ Order ${order.id} processed: $${orderTotal.toFixed(2)}`);
            }
          } else {
            console.log(`✗ Order ${order.id} failed: Invalid payment method`);
          }
        }
      }
    }
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

const processor = new BadOrderProcessor();
processor.processOrders(orders);
