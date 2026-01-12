// BAD EXAMPLE: Too many instance variables - low cohesion

export class BadEmployee {
  // 8 instance variables - very low cohesion
  private firstName: string;
  private lastName: string;
  private email: string;
  private street: string;
  private city: string;
  private zipCode: string;
  private salary: number;
  private department: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    city: string,
    zipCode: string,
    salary: number,
    department: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;
    this.salary = salary;
    this.department = department;

    console.log("🔴 BAD: Employee with 8 instance variables...\n");
  }

  // Low cohesion: this method only uses name and email
  sendEmail(message: string): void {
    console.log(`  Sending email to ${this.firstName} ${this.lastName} (${this.email})`);
    console.log(`  Message: ${message}`);
  }

  // This method only uses address fields
  getShippingAddress(): string {
    return `${this.street}, ${this.city} ${this.zipCode}`;
  }

  // This method only uses salary and department
  calculateBonus(): number {
    const bonus = this.salary * 0.1;
    console.log(`  ${this.department} bonus: $${bonus}`);
    return bonus;
  }

  printInfo(): void {
    console.log(`Employee: ${this.firstName} ${this.lastName}`);
    console.log(`Email: ${this.email}`);
    console.log(`Address: ${this.getShippingAddress()}`);
    console.log(`Salary: $${this.salary}`);
    console.log(`Department: ${this.department}\n`);
  }
}

// Demo
const employee = new BadEmployee(
  "John",
  "Doe",
  "john@example.com",
  "123 Main St",
  "New York",
  "10001",
  50000,
  "Engineering"
);

employee.printInfo();
employee.sendEmail("Welcome aboard!");
employee.calculateBonus();
