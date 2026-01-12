// GOOD EXAMPLE: Maximum two instance variables per class - high cohesion

// Value object with 2 related fields
class FullName {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string
  ) {}

  toString(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getFirstName(): string {
    return this.firstName;
  }
}

// Value object with 2 related fields
class EmailAddress {
  constructor(private readonly value: string) {
    if (!value.includes("@")) {
      throw new Error("Invalid email");
    }
  }

  toString(): string {
    return this.value;
  }
}

// Composite with 2 instance variables (both value objects)
class PersonalInfo {
  constructor(
    private readonly name: FullName,
    private readonly email: EmailAddress
  ) {}

  sendEmail(message: string): void {
    console.log(`  Sending email to ${this.name} (${this.email})`);
    console.log(`  Message: ${message}`);
  }

  toString(): string {
    return `${this.name} (${this.email})`;
  }
}

// Value object with 2 related fields
export class Address {
  constructor(
    private readonly street: string,
    private readonly city: string
  ) {}

  toString(): string {
    return `${this.street}, ${this.city}`;
  }
}

// Value object with 2 related fields
class Compensation {
  constructor(
    private readonly salary: number,
    private readonly department: string
  ) {}

  calculateBonus(): number {
    const bonus = this.salary * 0.1;
    console.log(`  ${this.department} bonus: $${bonus}`);
    return bonus;
  }

  getSalary(): number {
    return this.salary;
  }

  getDepartment(): string {
    return this.department;
  }
}

// Main class with only 2 instance variables
export class GoodEmployee {
  constructor(
    private readonly info: PersonalInfo,
    private readonly compensation: Compensation
  ) {
    console.log("🟢 GOOD: Employee decomposed with max 2 variables per class...\n");
  }

  sendWelcomeEmail(): void {
    this.info.sendEmail("Welcome aboard!");
  }

  calculateBonus(): number {
    return this.compensation.calculateBonus();
  }

  printInfo(): void {
    console.log(`Employee: ${this.info}`);
    console.log(`Salary: $${this.compensation.getSalary()}`);
    console.log(`Department: ${this.compensation.getDepartment()}\n`);
  }
}

// Demo - notice how we build from small value objects
const name = new FullName("John", "Doe");
const email = new EmailAddress("john@example.com");
const personalInfo = new PersonalInfo(name, email);

const compensation = new Compensation(50000, "Engineering");

const employee = new GoodEmployee(personalInfo, compensation);

employee.printInfo();
employee.sendWelcomeEmail();
employee.calculateBonus();
