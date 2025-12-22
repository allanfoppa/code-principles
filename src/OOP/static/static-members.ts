// Static Members: Properties and methods that belong to the class itself, not instances
// Shared across all instances and accessible without creating an object

console.log("=== STATIC MEMBERS ===\n");

// 1. STATIC PROPERTIES: Shared state across all instances
console.log("--- Static Properties ---\n");

class Player {
  // Static property - shared by ALL players
  private static totalPlayers: number = 0;
  private static highScore: number = 0;

  // Instance property - unique to each player
  private name: string;
  private score: number;

  constructor(name: string) {
    this.name = name;
    this.score = 0;
    Player.totalPlayers++; // Access static via class name
    console.log(`Player '${this.name}' joined the game`);
  }

  public addScore(points: number): void {
    this.score += points;
    console.log(`${this.name} scored ${points} points! Total: ${this.score}`);

    if (this.score > Player.highScore) {
      Player.highScore = this.score;
      console.log(`NEW HIGH SCORE: ${Player.highScore} by ${this.name}!`);
    }
  }

  // Static method - accessible without instance
  public static getTotalPlayers(): number {
    return Player.totalPlayers;
  }

  public static getHighScore(): number {
    return Player.highScore;
  }
}

const player1 = new Player("Alice");
const player2 = new Player("Bob");
const player3 = new Player("Charlie");

player1.addScore(100);
player2.addScore(150);
player3.addScore(200);

console.log(`\nTotal players: ${Player.getTotalPlayers()}`);
console.log(`High score: ${Player.getHighScore()}`);

// 2. UTILITY CLASS: Only static methods, no instantiation
console.log("\n--- Utility Class ---\n");

class StringHelper {
  // Constants as static properties
  public static readonly MAX_LENGTH: number = 100;

  // Utility methods - no need to create instance
  public static capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  public static reverse(text: string): string {
    return text.split("").reverse().join("");
  }

  public static truncate(text: string, maxLength: number = StringHelper.MAX_LENGTH): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  public static wordCount(text: string): number {
    return text.trim().split(/\s+/).length;
  }

  // Private constructor prevents instantiation
  private constructor() {
    throw new Error("StringHelper cannot be instantiated - use static methods only");
  }
}

// Use without creating instance
console.log(StringHelper.capitalize("hello world"));
console.log(StringHelper.reverse("typescript"));
console.log(StringHelper.truncate("This is a very long text that needs to be truncated", 20));
console.log(`Word count: ${StringHelper.wordCount("This is a test sentence")}`);

// Can't create instance
// const helper = new StringHelper(); // Error!

// 3. FACTORY PATTERN: Using static methods to create objects
console.log("\n--- Factory Pattern ---\n");

class Vehicle {
  private constructor(
    public readonly type: string,
    public readonly wheels: number,
    public readonly maxSpeed: number
  ) {}

  // Factory methods for different vehicle types
  public static createBike(): Vehicle {
    console.log("Creating a bike");
    return new Vehicle("Bike", 2, 30);
  }

  public static createCar(): Vehicle {
    console.log("Creating a car");
    return new Vehicle("Car", 4, 200);
  }

  public static createTruck(): Vehicle {
    console.log("Creating a truck");
    return new Vehicle("Truck", 6, 120);
  }

  public static createMotorcycle(): Vehicle {
    console.log("Creating a motorcycle");
    return new Vehicle("Motorcycle", 2, 180);
  }

  public display(): void {
    console.log(`  Type: ${this.type}`);
    console.log(`  Wheels: ${this.wheels}`);
    console.log(`  Max Speed: ${this.maxSpeed} km/h`);
  }
}

const bike = Vehicle.createBike();
bike.display();

console.log();
const car = Vehicle.createCar();
car.display();

console.log();
const truck = Vehicle.createTruck();
truck.display();

// 4. SINGLETON PATTERN: Ensuring single instance
console.log("\n--- Singleton Pattern ---\n");

class AppConfig {
  private static instance: AppConfig | null = null;
  private settings: Map<string, string>;

  private constructor() {
    this.settings = new Map();
    console.log("AppConfig instance created");

    // Default settings
    this.settings.set("theme", "dark");
    this.settings.set("language", "en");
    this.settings.set("version", "1.0.0");
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      console.log("Creating new AppConfig instance...");
      AppConfig.instance = new AppConfig();
    } else {
      console.log("Reusing existing AppConfig instance...");
    }
    return AppConfig.instance;
  }

  public getSetting(key: string): string | undefined {
    return this.settings.get(key);
  }

  public setSetting(key: string, value: string): void {
    this.settings.set(key, value);
    console.log(`Setting updated: ${key} = ${value}`);
  }

  public displaySettings(): void {
    console.log("Current settings:");
    this.settings.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });
  }
}

const config1 = AppConfig.getInstance();
config1.displaySettings();

console.log();
config1.setSetting("theme", "light");

console.log();
const config2 = AppConfig.getInstance();
config2.displaySettings();

console.log(`\nSame instance? ${config1 === config2}`);

// 5. STATIC VS INSTANCE comparison
console.log("\n--- Static vs Instance ---\n");

class Book {
  // Static: Belongs to class
  private static totalBooks: number = 0;
  public static readonly LIBRARY_NAME: string = "City Library";

  // Instance: Belongs to each object
  private title: string;
  private author: string;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
    Book.totalBooks++;
  }

  // Instance method - needs object
  public getInfo(): string {
    return `"${this.title}" by ${this.author}`;
  }

  // Static method - no object needed
  public static getTotalBooks(): number {
    return Book.totalBooks;
  }
}

const book1 = new Book("1984", "George Orwell");
const book2 = new Book("Brave New World", "Aldous Huxley");
const book3 = new Book("Fahrenheit 451", "Ray Bradbury");

console.log(book1.getInfo()); // Instance method
console.log(book2.getInfo()); // Instance method
console.log(book3.getInfo()); // Instance method
console.log(`\nTotal books in ${Book.LIBRARY_NAME}: ${Book.getTotalBooks()}`); // Static

// KEY POINTS:
//   STATIC MEMBERS
//      Belong to the class, not instances
//      Shared across all instances
//      Accessed via ClassName.member
//      Perfect for utilities, counters, factories, singletons
//      Can't access instance members

//   INSTANCE MEMBERS:
//      Belong to each object
//      Unique per instance
//      Accessed via objectName.member
//      Can access static members

//   USE CASES:
//      Static: Counters, utilities, factories, singletons, constants
//      Instance: Object-specific state and behavior
