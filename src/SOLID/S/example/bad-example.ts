// This class has too many responsibilities and violates Single Responsibility Principle:
// 1. User data management
// 2. Database operations
// 3. Email sending
// 4. Report generation

export class User {
  constructor(
    public name: string,
    public email: string
  ) {}

  // Responsibility 1: Data validation
  validate(): boolean {
    return this.email.includes("@") && this.name.length > 0;
  }

  // Responsibility 2: Database operations
  saveToDatabase(): void {
    console.log(`Saving user ${this.name} to database...`);
    // Database logic here
  }

  // Responsibility 3: Email operations
  sendWelcomeEmail(): void {
    console.log(`Sending welcome email to ${this.email}...`);
    // Email sending logic here
  }

  // Responsibility 4: Report generation
  generateReport(): string {
    return `User Report: ${this.name} (${this.email})`;
  }
}

// Problems with this approach:
// If email service changes, User class must change
// If database changes, User class must change
// If report format changes, User class must change
// Hard to test individual responsibilities
// Class has multiple reasons to change (violates SRP)

// Usage Example
const user = new User("Allan Foppa", "allanfoppa@example.com");

if (user.validate()) {
  user.saveToDatabase();
  user.sendWelcomeEmail();
  const report = user.generateReport();
  console.log(report);
}
