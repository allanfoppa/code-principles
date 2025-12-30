// Both high-level and low-level modules depend on abstractions and follows Dependency Inversion Principle

// Abstractions (interfaces)
export interface IDatabase {
  connect(): void;
  save(data: string): void;
  find(id: string): string;
}

export interface IEmailService {
  connect(): void;
  send(to: string, message: string): void;
}

// Low-level modules (concrete implementations)
export class MySQLDatabase implements IDatabase {
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

export class PostgreSQLDatabase implements IDatabase {
  connect(): void {
    console.log("Connecting to PostgreSQL database...");
  }

  save(data: string): void {
    console.log(`Saving to PostgreSQL: ${data}`);
  }

  find(id: string): string {
    console.log(`Finding in PostgreSQL: ${id}`);
    return `Data from PostgreSQL: ${id}`;
  }
}

export class SendGridEmailService implements IEmailService {
  connect(): void {
    console.log("Connecting to SendGrid...");
  }

  send(to: string, message: string): void {
    console.log(`Sending email via SendGrid to ${to}: ${message}`);
  }
}

export class AWSEmailService implements IEmailService {
  connect(): void {
    console.log("Connecting to AWS SES...");
  }

  send(to: string, message: string): void {
    console.log(`Sending email via AWS SES to ${to}: ${message}`);
  }
}

// High-level module depends on abstractions
export class OrderService {
  // Depends on interfaces, not concrete classes
  constructor(
    private database: IDatabase,
    private emailService: IEmailService
  ) {
    // Dependencies injected from outside
    this.database.connect();
    this.emailService.connect();
  }

  processOrder(orderId: string, customerEmail: string): void {
    console.log(`Processing order ${orderId}...`);

    // Uses abstractions
    const orderData = this.database.find(orderId);
    this.database.save(`Processed: ${orderData}`);
    this.emailService.send(customerEmail, `Your order ${orderId} has been processed`);

    console.log("Order processed successfully!");
  }
}

// Benefits of this approach:
// OrderService depends on abstractions (IDatabase, IEmailService)
// Can easily swap implementations without modifying OrderService
// Easy to test (can inject mock implementations)
// Both high-level and low-level modules depend on abstractions
// Follows Dependency Inversion Principle

// Usage Example

// Using MySQL and SendGrid
console.log("Configuration 1: MySQL + SendGrid");
const mysqlDb = new MySQLDatabase();
const sendgridEmail = new SendGridEmailService();
const orderService1 = new OrderService(mysqlDb, sendgridEmail);
orderService1.processOrder("12345", "customer@example.com");

console.log("\n" + "=".repeat(50) + "\n");

// Using PostgreSQL and AWS SES - no changes to OrderService!
console.log("Configuration 2: PostgreSQL + AWS SES");
const postgresDb = new PostgreSQLDatabase();
const awsEmail = new AWSEmailService();
const orderService2 = new OrderService(postgresDb, awsEmail);
orderService2.processOrder("67890", "another@example.com");

console.log("\n" + "=".repeat(50) + "\n");

// Using Mock implementations for testing
console.log("Configuration 3: Mock for Testing");
class MockDatabase implements IDatabase {
  connect(): void {
    console.log("Mock database connected (no real connection)");
  }
  save(data: string): void {
    console.log(`Mock save: ${data}`);
  }
  find(id: string): string {
    return `Mock data for ${id}`;
  }
}

class MockEmailService implements IEmailService {
  connect(): void {
    console.log("Mock email service connected (no real connection)");
  }
  send(to: string, message: string): void {
    console.log(`Mock email to ${to}: ${message}`);
  }
}

const mockDb = new MockDatabase();
const mockEmail = new MockEmailService();
const orderService3 = new OrderService(mockDb, mockEmail);
orderService3.processOrder("TEST-123", "test@example.com");
