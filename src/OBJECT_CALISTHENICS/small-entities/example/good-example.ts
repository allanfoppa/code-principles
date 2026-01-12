// GOOD EXAMPLE: Small focused classes with short methods (<50 lines per class, <10 lines per method)

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

// Small class #1: User validation (< 50 lines)
class UserValidator {
  validate(name: string, email: string, age: number): boolean {
    return this.isValidName(name) && this.isValidEmail(email) && this.isValidAge(age);
  }

  private isValidName(name: string): boolean {
    return !!name && name.trim().length > 0;
  }

  private isValidEmail(email: string): boolean {
    return !!email && email.includes("@") && email.includes(".");
  }

  private isValidAge(age: number): boolean {
    return age >= 18 && age <= 120;
  }
}

// Small class #2: User creation (< 50 lines)
class UserFactory {
  private nextId = 1;

  create(name: string, email: string, age: number): User {
    return {
      id: `USR-${this.nextId++}`,
      name: name.trim(),
      email: email.toLowerCase(),
      age: age,
      isActive: true,
    };
  }
}

// Small class #3: User repository (< 50 lines)
class UserRepository {
  private users: User[] = [];

  add(user: User): void {
    this.users.push(user);
  }

  exists(email: string): boolean {
    return this.users.some((u) => u.email === email);
  }

  getAll(): User[] {
    return [...this.users];
  }

  getActive(): User[] {
    return this.users.filter((u) => u.isActive);
  }
}

// Small class #4: Email service (< 50 lines)
class EmailService {
  sendWelcome(user: User): void {
    console.log(`  ✓ Sending welcome email to ${user.email}`);
  }
}

// Small class #5: Report generator (< 50 lines)
class UserReportGenerator {
  generate(users: User[]): string {
    const stats = this.calculateStatistics(users);
    return this.formatReport(stats);
  }

  private calculateStatistics(users: User[]) {
    const total = users.length;
    const active = users.filter((u) => u.isActive).length;
    const avgAge = users.reduce((sum, u) => sum + u.age, 0) / total;

    return { total, active, avgAge };
  }

  private formatReport(stats: { total: number; active: number; avgAge: number }): string {
    return `
User Statistics Report
=======================
Total Users: ${stats.total}
Active Users: ${stats.active}
Average Age: ${stats.avgAge.toFixed(1)}
    `;
  }
}

// Small coordinator class (< 50 lines)
export class GoodUserService {
  private validator = new UserValidator();
  private factory = new UserFactory();
  private repository = new UserRepository();
  private emailService = new EmailService();
  private reportGenerator = new UserReportGenerator();

  constructor() {
    console.log("🟢 GOOD: Small focused classes with short methods...\n");
  }

  createUser(name: string, email: string, age: number): User | null {
    if (!this.validator.validate(name, email, age)) {
      console.log("  ✗ Validation failed");
      return null;
    }

    if (this.repository.exists(email)) {
      console.log("  ✗ Email already exists");
      return null;
    }

    const user = this.factory.create(name, email, age);
    this.repository.add(user);
    this.emailService.sendWelcome(user);

    console.log(`  ✓ Created user: ${user.name} (${user.email})`);
    return user;
  }

  generateReport(): string {
    const users = this.repository.getAll();
    const report = this.reportGenerator.generate(users);
    console.log(report);
    return report;
  }
}

// Demo
const service = new GoodUserService();
service.createUser("John Doe", "john@example.com", 25);
service.generateReport();
