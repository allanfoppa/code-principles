// BAD EXAMPLE: Large class with long methods (violates small entities rule)

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

export class BadUserService {
  private users: User[] = [];

  constructor() {
    console.log("🔴 BAD: Large class with long methods...\n");
  }

  // Method too long (>10 lines)
  createUserWithValidation(name: string, email: string, age: number): User | null {
    // Validation logic
    if (!name || name.trim().length === 0) {
      console.log("  ✗ Invalid name");
      return null;
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      console.log("  ✗ Invalid email");
      return null;
    }
    if (age < 18 || age > 120) {
      console.log("  ✗ Invalid age");
      return null;
    }

    // Check duplicates
    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      console.log("  ✗ Email already exists");
      return null;
    }

    // Create user
    const user: User = {
      id: `USR-${this.users.length + 1}`,
      name: name.trim(),
      email: email.toLowerCase(),
      age: age,
      isActive: true,
    };

    this.users.push(user);
    console.log(`  ✓ Created user: ${user.name} (${user.email})`);

    // Send welcome email (more logic...)
    console.log(`  ✓ Sending welcome email to ${user.email}`);

    return user;
  }

  // Another long method
  generateUserReportWithStatistics(): string {
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter((u) => u.isActive).length;
    const averageAge = this.users.reduce((sum, u) => sum + u.age, 0) / totalUsers;

    const report = `
User Statistics Report
=======================
Total Users: ${totalUsers}
Active Users: ${activeUsers}
Inactive Users: ${totalUsers - activeUsers}
Average Age: ${averageAge.toFixed(1)}
    `;

    console.log(report);
    return report;
  }

  // More methods that make the class too large...
  updateUserProfile(userId: string, updates: Partial<User>): void {
    /* ... */
  }
  deleteUser(userId: string): void {
    /* ... */
  }
  sendEmailToUser(userId: string, message: string): void {
    /* ... */
  }
}

// Demo
const service = new BadUserService();
service.createUserWithValidation("John Doe", "john@example.com", 25);
service.generateUserReportWithStatistics();
