// High-level module depends directly on low-level modules and violates Dependency Inversion Principle

// Low-level modules (concrete implementations)
export class MySQLDatabase {
  connect(): void {
    console.log("Connecting to MySQL database...");
  }

  save(data: string): void {
    console.log(`Saving to MySQL: ${data}`);
  }

  find(id: string): string {
    console.log(`Finding in MySQL: ${id}`);
    return `Data from MySQL: ${id}`;
  }
}

export class SendGridEmailService {
  connect(): void {
    console.log("Connecting to SendGrid...");
  }

  send(to: string, message: string): void {
    console.log(`Sending email via SendGrid to ${to}: ${message}`);
  }
}

// High-level module depends directly on concrete implementations
export class OrderService {
  private database: MySQLDatabase; // Depends on concrete class
  private emailService: SendGridEmailService; // Depends on concrete class

  constructor() {
    // Creates dependencies internally
    this.database = new MySQLDatabase();
    this.emailService = new SendGridEmailService();
    this.database.connect();
    this.emailService.connect();
  }

  processOrder(orderId: string, customerEmail: string): void {
    console.log(`Processing order ${orderId}...`);

    // Uses concrete implementations directly
    const orderData = this.database.find(orderId);
    this.database.save(`Processed: ${orderData}`);
    this.emailService.send(customerEmail, `Your order ${orderId} has been processed`);

    console.log("Order processed successfully!");
  }
}

// Problems with this approach:
// OrderService is tightly coupled to MySQL and SendGrid
// Cannot switch to PostgreSQL or AWS SES without modifying OrderService
// Difficult to test (can't mock database or email service)
// High-level module depends on low-level modules
// Violates Dependency Inversion Principle

// Usage Example
const orderService = new OrderService();
orderService.processOrder("12345", "customer@example.com");

// What if we want to use PostgreSQL or AWS SES?
// We must modify OrderService class!
