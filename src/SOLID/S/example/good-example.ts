// Each class has ONE reason to change that's why it follows Single Responsibility Principle

export class User {
  constructor(
    public name: string,
    public email: string
  ) {}

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }
}

export class UserValidator {
  validate(user: User): boolean {
    return user.getEmail().includes("@") && user.getName().length > 0;
  }

  isEmailValid(email: string): boolean {
    return email.includes("@") && email.length > 3;
  }
}

export class UserRepository {
  save(user: User): void {
    console.log(`Saving user ${user.getName()} to database...`);
    // Database logic here
  }

  find(email: string): User | null {
    console.log(`Finding user with email ${email}...`);
    // Database query logic here
    return null;
  }

  delete(email: string): void {
    console.log(`Deleting user with email ${email}...`);
    // Database deletion logic here
  }
}

export class EmailService {
  sendWelcomeEmail(user: User): void {
    console.log(`Sending welcome email to ${user.getEmail()}...`);
    // Email sending logic here
  }

  sendPasswordResetEmail(user: User): void {
    console.log(`Sending password reset email to ${user.getEmail()}...`);
    // Email sending logic here
  }
}

export class UserReportGenerator {
  generateReport(user: User): string {
    return `User Report: ${user.getName()} (${user.getEmail()})`;
  }

  generateDetailedReport(user: User): string {
    return `
=== User Report ===
Name: ${user.getName()}
Email: ${user.getEmail()}
===================
		`;
  }
}

// Benefits of this approach:
// Each class has ONE responsibility
// Easy to test each class independently
// Changes to email don't affect database logic
// Changes to reports don't affect validation
// Each class has only ONE reason to change (follows SRP)

// Usage Example
const user = new User("Allan Foppa", "allanfoppa@example.com");
const validator = new UserValidator();
const repository = new UserRepository();
const emailService = new EmailService();
const reportGenerator = new UserReportGenerator();

if (validator.validate(user)) {
  repository.save(user);
  emailService.sendWelcomeEmail(user);
  const report = reportGenerator.generateDetailedReport(user);
  console.log(report);
}
