// GOOD EXAMPLE: Wrapped primitives with encapsulated validation and behavior

class EmailAddress {
  private constructor(private readonly value: string) {
    this.validate();
  }

  static create(email: string): EmailAddress {
    return new EmailAddress(email);
  }

  private validate(): void {
    if (!this.value.includes("@") || !this.value.includes(".")) {
      throw new Error(`Invalid email address: ${this.value}`);
    }
  }

  getDomain(): string {
    return this.value.split("@")[1];
  }

  toString(): string {
    return this.value;
  }
}

class Age {
  private constructor(private readonly value: number) {
    this.validate();
  }

  static create(age: number): Age {
    return new Age(age);
  }

  private validate(): void {
    if (this.value < 0 || this.value > 150) {
      throw new Error(`Invalid age: ${this.value}`);
    }
  }

  isAdult(): boolean {
    return this.value >= 18;
  }

  getValue(): number {
    return this.value;
  }
}

class Salary {
  private constructor(private readonly amount: number) {
    this.validate();
  }

  static create(amount: number): Salary {
    return new Salary(amount);
  }

  private validate(): void {
    if (this.amount < 0) {
      throw new Error(`Salary cannot be negative: ${this.amount}`);
    }
  }

  giveRaise(percentage: number): Salary {
    const newAmount = this.amount * (1 + percentage / 100);
    return Salary.create(newAmount);
  }

  getValue(): number {
    return this.amount;
  }
}

class UserId {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("UserId cannot be empty");
    }
  }

  static create(id: string): UserId {
    return new UserId(id);
  }

  toString(): string {
    return this.value;
  }
}

class UserName {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("UserName cannot be empty");
    }
  }

  static create(name: string): UserName {
    return new UserName(name);
  }

  toString(): string {
    return this.value;
  }
}

export class GoodUserService {
  createUser(email: EmailAddress, age: Age, salary: Salary): void {
    console.log("GOOD: Creating user with wrapped primitives...");

    // Validation already done in constructors
    if (!age.isAdult()) {
      throw new Error("User must be 18 or older");
    }

    console.log(`✓ User created: ${email}, Age: ${age.getValue()}, Salary: $${salary.getValue()}`);
  }

  updateEmail(userId: UserId, newEmail: EmailAddress): void {
    // Type safety ensures we can't mix up userId and email
    console.log(`✓ Email updated for user ${userId}: ${newEmail}`);
  }

  giveRaise(userId: UserId, currentSalary: Salary, percentage: number): Salary {
    // Business logic encapsulated in Salary class
    const newSalary = currentSalary.giveRaise(percentage);
    console.log(
      `✓ Raise given to user ${userId}: $${currentSalary.getValue()} → $${newSalary.getValue()}`
    );
    return newSalary;
  }

  sendWelcomeEmail(email: EmailAddress, name: UserName): void {
    // Type safety prevents parameter swap
    console.log(`✓ Sending welcome email to ${email} (${name})`);
  }
}

// Demo - Type safety prevents mistakes
const service = new GoodUserService();

try {
  const email = EmailAddress.create("john@example.com");
  const age = Age.create(25);
  const salary = Salary.create(50000);
  const userId = UserId.create("USER-123");
  const userName = UserName.create("John Doe");

  service.createUser(email, age, salary);
  service.updateEmail(userId, EmailAddress.create("jane@example.com"));
  service.giveRaise(userId, salary, 10);
  service.sendWelcomeEmail(email, userName);

  // Compiler prevents mistakes like this:
  // service.sendWelcomeEmail(userName, email); // Type error!

  console.log(`\n✓ Domain of email: ${email.getDomain()}`);
  console.log(`✓ Is adult: ${age.isAdult()}`);
} catch (error) {
  console.error(`✗ Error: ${error}`);
}
