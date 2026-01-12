// BAD EXAMPLE: Primitive obsession - using raw strings and numbers everywhere

export class BadUserService {
  createUser(email: string, age: number, salary: number): void {
    console.log("BAD: Creating user with raw primitives...");

    // Validation scattered and duplicated
    if (!email.includes("@")) {
      throw new Error("Invalid email");
    }

    if (age < 18) {
      throw new Error("User must be 18 or older");
    }

    if (salary < 0) {
      throw new Error("Salary cannot be negative");
    }

    console.log(`✓ User created: ${email}, Age: ${age}, Salary: $${salary}`);
  }

  updateEmail(userId: string, newEmail: string): void {
    // Same validation repeated
    if (!newEmail.includes("@")) {
      throw new Error("Invalid email");
    }
    console.log(`✓ Email updated for user ${userId}: ${newEmail}`);
  }

  giveRaise(userId: string, currentSalary: number, percentage: number): number {
    // Business logic scattered
    if (currentSalary < 0) {
      throw new Error("Salary cannot be negative");
    }

    const newSalary = currentSalary * (1 + percentage / 100);
    console.log(`✓ Raise given to user ${userId}: $${currentSalary} → $${newSalary}`);
    return newSalary;
  }

  sendWelcomeEmail(email: string, name: string): void {
    // No type safety - could accidentally swap parameters
    console.log(`✓ Sending welcome email to ${email} (${name})`);
  }
}

// Demo - Notice how easy it is to make mistakes
const service = new BadUserService();

try {
  // Parameters could easily be mixed up
  service.createUser("john@example.com", 25, 50000);
  service.updateEmail("USER-123", "jane@example.com");
  service.giveRaise("USER-123", 50000, 10);

  // Oops! Parameters are swapped - compiler doesn't catch it
  service.sendWelcomeEmail("John Doe", "john@example.com"); // Should be (email, name)
} catch (error) {
  console.error(`✗ Error: ${error}`);
}
