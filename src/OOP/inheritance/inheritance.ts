class Parent {
  // Attributes (properties)
  protected name: string; // Private to the outside world, but shared within the family (inheritance chain)
  private age: number; // Accessible only within the same class in this case Parent, and not be inherited by Child
  public sex: string; // Accessible everywhere (inside class, child classes, outside)

  constructor(name: string, age: number, sex: string) {
    this.name = name;
    this.age = age;
    this.sex = sex;
  }

  // Methods
  public greet(): void {
    console.log(`Hello, I'm ${this.name}`);
  }

  protected calculate(): number {
    return this.age * 2;
  }
}

class Child extends Parent {
  // Child inherits:
  // ✓ name (accessible because it's protected)
  // ✗ age (NOT accessible because it's private)
  // ✓ greet() method (accessible because it's public)
  // ✓ calculate() method (accessible because it's protected)

  public introduce(): void {
    this.greet(); // Can use inherited method
    // console.log(this.name); // Can access inherited protected attribute
    // console.log(this.age); // ERROR: private members are not inherited
  }
}

// Example usage
const greeting = new Child("Allan", 39, 'male');
greeting.introduce();

// const parent = new Parent("Some name", 48, 'female');
// parent.name = "Test"; // ERROR: Property 'name' is protected and only accessible within class 'Parent' and its subclasses.
