// Interfaces vs Abstract Classes
// When to use each and how they differ

// INTERFACES: Pure contracts - no implementation
console.log("--- INTERFACES: Pure Contracts ---\n");

interface Printable {
  print(): void;
}

interface Scannable {
  scan(): void;
}

interface Faxable {
  fax(number: string): void;
}

// ✅ Can implement MULTIPLE interfaces
class MultiFunctionPrinter implements Printable, Scannable, Faxable {
  public print(): void {
    console.log("🖨️ Printing document...");
  }

  public scan(): void {
    console.log("📄 Scanning document...");
  }

  public fax(number: string): void {
    console.log(`📠 Faxing to ${number}...`);
  }
}

// Simple printer implements only what it needs
class SimplePrinter implements Printable {
  public print(): void {
    console.log("🖨️ Simple printer: Printing...");
  }
}

const allInOne = new MultiFunctionPrinter();
allInOne.print();
allInOne.scan();
allInOne.fax("+1-555-0100");

const basic = new SimplePrinter();
basic.print();

// ABSTRACT CLASSES: Shared implementation + contracts
console.log("\n--- ABSTRACT CLASSES: Shared Implementation ---\n");

abstract class Shape {
  // Shared state
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  // Concrete method - shared by all shapes
  public getColor(): string {
    return this.color;
  }

  public describe(): void {
    console.log(`This is a ${this.color} ${this.getName()}`);
  }

  // Abstract methods - must be implemented by subclasses
  abstract getArea(): number;
  abstract getPerimeter(): number;
  abstract getName(): string;
}

class Circle extends Shape {
  constructor(
    color: string,
    private radius: number
  ) {
    super(color);
  }

  public getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  public getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  public getName(): string {
    return "Circle";
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    private width: number,
    private height: number
  ) {
    super(color);
  }

  public getArea(): number {
    return this.width * this.height;
  }

  public getPerimeter(): number {
    return 2 * (this.width + this.height);
  }

  public getName(): string {
    return "Rectangle";
  }
}

const circle = new Circle("red", 5);
circle.describe();
console.log(`Area: ${circle.getArea().toFixed(2)}`);
console.log(`Perimeter: ${circle.getPerimeter().toFixed(2)}`);

const rectangle = new Rectangle("blue", 4, 6);
rectangle.describe();
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);

// COMBINING BOTH: Abstract class + Interfaces
console.log("\n--- COMBINING: Abstract Class + Interfaces ---\n");

interface Drawable {
  draw(): void;
}

interface Resizable {
  resize(scale: number): void;
}

// Abstract class provides base implementation
abstract class GraphicElement {
  protected x: number;
  protected y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
    console.log(`Moved to (${x}, ${y})`);
  }

  abstract getType(): string;
}

// Combine abstract class with multiple interfaces
class Button extends GraphicElement implements Drawable, Resizable {
  private scale: number = 1;

  constructor(
    x: number,
    y: number,
    private label: string
  ) {
    super(x, y);
  }

  public getType(): string {
    return "Button";
  }

  public draw(): void {
    console.log(
      `🎨 Drawing ${this.label} button at (${this.x}, ${this.y}) - Scale: ${this.scale}x`
    );
  }

  public resize(scale: number): void {
    this.scale = scale;
    console.log(`🔍 Resized to ${scale}x`);
  }

  public click(): void {
    console.log(`🖱️ ${this.label} button clicked!`);
  }
}

const submitButton = new Button(100, 200, "Submit");
submitButton.draw();
submitButton.resize(1.5);
submitButton.draw();
submitButton.moveTo(150, 250);
submitButton.click();

// KEY DIFFERENCES:
//  INTERFACES:
//      Can implement multiple
//      No implementation code
//      Pure contracts
//      All members are public
//      No constructor

//  ABSTRACT CLASSES:
//      Can only extend one
//      Can have implementation code
//      Can have state (properties)
//      Can have access modifiers (private, protected)
//      Can have constructor
//      Mix abstract and concrete methods

// WHEN TO USE:
//      Interface: When defining capabilities/contracts
//      Abstract Class: When sharing common implementation
//      Both: For maximum flexibility!
