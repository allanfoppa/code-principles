// Getters and Setters: Controlled access to properties with validation and computed values

console.log("=== GETTERS AND SETTERS ===\n");

// 1. VALIDATION: Setters with validation rules
console.log("--- Validation on Assignment ---\n");

class Student {
  private _name: string = "";
  private _grade: number = 0;
  private _email: string = "";

  // Getter: Read access
  public get name(): string {
    return this._name;
  }

  // Setter: Write access with validation
  public set name(value: string) {
    if (value.trim().length === 0) {
      console.log("❌ Name cannot be empty");
      return;
    }
    if (value.length < 2) {
      console.log("❌ Name must be at least 2 characters");
      return;
    }
    this._name = value;
    console.log(`✅ Name set to: ${value}`);
  }

  public get grade(): number {
    return this._grade;
  }

  public set grade(value: number) {
    if (value < 0 || value > 100) {
      console.log("❌ Grade must be between 0 and 100");
      return;
    }
    this._grade = value;
    console.log(`✅ Grade set to: ${value}`);
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      console.log("❌ Invalid email format");
      return;
    }
    this._email = value;
    console.log(`✅ Email set to: ${value}`);
  }
}

const student = new Student();
student.name = "John Doe";
student.name = "X";           // Too short
student.grade = 85;
student.grade = 150;          // Out of range
student.email = "john@school.com";
student.email = "invalid";    // Invalid format

console.log(`\nStudent: ${student.name}, Grade: ${student.grade}, Email: ${student.email}`);

// 2. COMPUTED PROPERTIES: Derived values calculated on demand
console.log("\n--- Computed Properties ---\n");

class Product {
  constructor(
    private _price: number,
    private _quantity: number,
    private _taxRate: number = 0.1 // 10% tax
  ) {}

  public get price(): number {
    return this._price;
  }

  public set price(value: number) {
    if (value <= 0) {
      console.log("❌ Price must be positive");
      return;
    }
    this._price = value;
    console.log(`✅ Price set to: $${value}`);
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(value: number) {
    if (value < 0) {
      console.log("❌ Quantity cannot be negative");
      return;
    }
    this._quantity = value;
    console.log(`✅ Quantity set to: ${value}`);
  }

  // Computed properties - calculated each time
  public get subtotal(): number {
    return this._price * this._quantity;
  }

  public get tax(): number {
    return this.subtotal * this._taxRate;
  }

  public get total(): number {
    return this.subtotal + this.tax;
  }

  public get discount(): number {
    // 10% discount if quantity >= 10
    return this._quantity >= 10 ? this.subtotal * 0.1 : 0;
  }

  public get finalPrice(): number {
    return this.total - this.discount;
  }
}

const product = new Product(50, 5);
console.log(`Price: $${product.price} x ${product.quantity}`);
console.log(`Subtotal: $${product.subtotal.toFixed(2)}`);
console.log(`Tax: $${product.tax.toFixed(2)}`);
console.log(`Total: $${product.total.toFixed(2)}`);

product.quantity = 15;
console.log(`\nWith discount:`);
console.log(`Subtotal: $${product.subtotal.toFixed(2)}`);
console.log(`Discount: -$${product.discount.toFixed(2)}`);
console.log(`Final Price: $${product.finalPrice.toFixed(2)}`);

// 3. READ-ONLY PROPERTIES: Getter without setter
console.log("\n--- Read-Only Properties ---\n");

class Order {
  private _items: string[] = [];
  private _total: number = 0;
  private readonly _orderId: string;
  private readonly _orderDate: Date;

  constructor() {
    this._orderId = `ORD-${Date.now()}`;
    this._orderDate = new Date();
    console.log(`📦 Order created: ${this._orderId}`);
  }

  // Read-only: getter without setter
  public get orderId(): string {
    return this._orderId;
  }

  public get orderDate(): Date {
    return this._orderDate;
  }

  public get itemCount(): number {
    return this._items.length;
  }

  public get total(): number {
    return this._total;
  }

  public addItem(item: string, price: number): void {
    this._items.push(item);
    this._total += price;
    console.log(`✅ Added: ${item} ($${price})`);
  }

  public displayOrder(): void {
    console.log(`\nOrder ID: ${this.orderId}`);
    console.log(`Date: ${this.orderDate.toLocaleString()}`);
    console.log(`Items: ${this.itemCount}`);
    console.log(`Total: $${this.total.toFixed(2)}`);
  }
}

const order = new Order();
order.addItem("Laptop", 999.99);
order.addItem("Mouse", 29.99);
order.addItem("Keyboard", 79.99);
order.displayOrder();

// ❌ Can't modify read-only properties
// order.orderId = "123";      // Error: no setter
// order.total = 5000;         // Error: no setter

// 4. LAZY LOADING: Computed once and cached
console.log("\n--- Lazy Loading (Cached Computation) ---\n");

class Report {
  private _data: number[] = [];
  private _cachedAverage: number | null = null;
  private _cachedSorted: number[] | null = null;

  public addData(value: number): void {
    this._data.push(value);
    // Invalidate cache when data changes
    this._cachedAverage = null;
    this._cachedSorted = null;
    console.log(`Added: ${value}`);
  }

  // Lazy loading: Compute once, cache the result
  public get average(): number {
    if (this._cachedAverage === null) {
      console.log("🔄 Computing average (first time or after data change)...");
      if (this._data.length === 0) return 0;
      const sum = this._data.reduce((acc, val) => acc + val, 0);
      this._cachedAverage = sum / this._data.length;
    } else {
      console.log("⚡ Using cached average");
    }
    return this._cachedAverage;
  }

  public get sortedData(): number[] {
    if (this._cachedSorted === null) {
      console.log("🔄 Computing sorted data (first time or after data change)...");
      this._cachedSorted = [...this._data].sort((a, b) => a - b);
    } else {
      console.log("⚡ Using cached sorted data");
    }
    return this._cachedSorted;
  }

  public get median(): number {
    const sorted = this.sortedData;
    if (sorted.length === 0) return 0;
    
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }
}

const report = new Report();
report.addData(15);
report.addData(8);
report.addData(23);
report.addData(4);
report.addData(16);

console.log(`Average: ${report.average.toFixed(2)}`);
console.log(`Average again: ${report.average.toFixed(2)}`); // Uses cache
console.log(`Sorted: [${report.sortedData}]`);
console.log(`Sorted again: [${report.sortedData}]`); // Uses cache
console.log(`Median: ${report.median}`);

report.addData(50); // Cache invalidated
console.log(`New average: ${report.average.toFixed(2)}`); // Recomputes

// 5. TEMPERATURE CONVERTER: Multiple getters/setters for same data
console.log("\n--- Advanced Example: Temperature Converter ---\n");

class Thermometer {
  private _celsius: number = 0;

  // Public getter
  public get celsius(): number {
    return this._celsius;
  }

  // Private setter - internal use only
  private set celsius(value: number) {
    this._celsius = value;
  }

  public get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }

  public set fahrenheit(value: number) {
    this.celsius = (value - 32) * 5/9;
    console.log(`Set to ${value}°F = ${this._celsius.toFixed(1)}°C`);
  }

  public get kelvin(): number {
    return this._celsius + 273.15;
  }

  public set kelvin(value: number) {
    this.celsius = value - 273.15;
    console.log(`Set to ${value}K = ${this._celsius.toFixed(1)}°C`);
  }

  public displayAll(): void {
    console.log(`Temperature:`);
    console.log(`  ${this.celsius.toFixed(1)}°C`);
    console.log(`  ${this.fahrenheit.toFixed(1)}°F`);
    console.log(`  ${this.kelvin.toFixed(1)}K`);
  }
}

const temp = new Thermometer();
temp.fahrenheit = 68;
temp.displayAll();

console.log();
temp.kelvin = 300;
temp.displayAll();

// KEY BENEFITS
//  GETTERS:
//      Computed properties (area, diameter, etc.)
//      Lazy loading and caching
//      Format data on read
//      Read-only access (getter without setter)

//  SETTERS:
//      Validation before assignment
//      Side effects (logging, cache invalidation)
//      Data transformation
//      Maintain data consistency

//  BEST PRACTICES:
//      Use getters for computed/derived values
//      Use setters for validation and side effects
//      Cache expensive computations in getters
//      Invalidate cache in setters when data changes
//      Keep getters fast and side-effect free
