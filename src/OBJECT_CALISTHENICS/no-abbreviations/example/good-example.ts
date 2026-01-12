// GOOD EXAMPLE: Full descriptive names make code self-documenting

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  createdAt: Date;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class GoodOrderManager {
  private orders: Order[] = [];
  private users: User[] = [];

  constructor() {
    console.log("GOOD: Using full descriptive names...\n");
  }

  addUser(user: User): void {
    this.users.push(user);
    console.log(`  Added user: ${user.name} (${user.email})`);
  }

  createOrder(userId: string, items: OrderItem[]): Order {
    const order: Order = {
      id: `ORD-${this.orders.length + 1}`,
      userId: userId,
      items: items,
      createdAt: new Date(),
    };
    this.orders.push(order);
    console.log(`  Created order: ${order.id}`);
    return order;
  }

  calculateOrderTotal(orderId: string): number {
    const order = this.orders.find((currentOrder) => currentOrder.id === orderId);
    if (!order) return 0;

    const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(`  Order ${orderId} total: $${total}`);
    return total;
  }

  getUserOrders(userId: string): Order[] {
    const userOrders = this.orders.filter((order) => order.userId === userId);
    console.log(`  Found ${userOrders.length} orders for user ${userId}`);
    return userOrders;
  }

  processOrder(orderId: string): void {
    const order = this.orders.find((currentOrder) => currentOrder.id === orderId);
    if (!order) {
      console.log(`  ✗ Order ${orderId} not found`);
      return;
    }

    const total = this.calculateOrderTotal(orderId);
    console.log(`  ✓ Processing order ${orderId}: $${total}`);
  }

  generateOrderSummary(orderId: string): string {
    const order = this.orders.find((currentOrder) => currentOrder.id === orderId);
    if (!order) return "Order not found";

    const user = this.users.find((currentUser) => currentUser.id === order.userId);
    const total = this.calculateOrderTotal(orderId);

    return `Order ${orderId} for ${user?.name}: $${total} (${order.items.length} items)`;
  }
}

// Demo
const manager = new GoodOrderManager();
manager.addUser({
  id: "USR-1",
  name: "John Doe",
  email: "john@example.com",
  address: "123 Main St",
});

manager.createOrder("USR-1", [
  { id: "ITM-1", name: "Laptop", price: 1000, quantity: 1 },
  { id: "ITM-2", name: "Mouse", price: 25, quantity: 2 },
]);

manager.processOrder("ORD-1");
console.log(`\n${manager.generateOrderSummary("ORD-1")}`);
