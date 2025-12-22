// Abstraction: Hiding complex implementation details and showing only essential features

// Abstract class - cannot be instantiated directly, only extended
abstract class DatabaseConnection {
  protected host: string;
  protected port: number;
  protected isConnected: boolean = false;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  // Abstract methods - must be implemented by subclasses
  abstract connect(): void;
  abstract disconnect(): void;
  abstract executeQuery(query: string): void;

  // Concrete method - shared by all subclasses
  public getConnectionStatus(): string {
    return this.isConnected
      ? `Connected to ${this.host}:${this.port}`
      : `Disconnected`;
  }
}

// MySQL implementation
class MySQLConnection extends DatabaseConnection {
  public connect(): void {
    console.log(`🔌 Connecting to MySQL at ${this.host}:${this.port}...`);
    // Complex MySQL connection logic hidden here
    this.isConnected = true;
    console.log("MySQL connected");
  }

  public disconnect(): void {
    console.log("🔌 Disconnecting from MySQL...");
    // Complex MySQL disconnection logic
    this.isConnected = false;
    console.log("MySQL disconnected");
  }

  public executeQuery(query: string): void {
    if (!this.isConnected) {
      console.log("Not connected to database");
      return;
    }
    console.log(`MySQL executing: ${query}`);
    // MySQL-specific query execution
  }
}

// PostgreSQL implementation
class PostgreSQLConnection extends DatabaseConnection {
  public connect(): void {
    console.log(`🔌 Connecting to PostgreSQL at ${this.host}:${this.port}...`);
    // Complex PostgreSQL connection logic hidden here
    this.isConnected = true;
    console.log("PostgreSQL connected");
  }

  public disconnect(): void {
    console.log("🔌 Disconnecting from PostgreSQL...");
    // Complex PostgreSQL disconnection logic
    this.isConnected = false;
    console.log("PostgreSQL disconnected");
  }

  public executeQuery(query: string): void {
    if (!this.isConnected) {
      console.log("Not connected to database");
      return;
    }
    console.log(`PostgreSQL executing: ${query}`);
    // PostgreSQL-specific query execution
  }
}

// MongoDB implementation
class MongoDBConnection extends DatabaseConnection {
  public connect(): void {
    console.log(`Connecting to MongoDB at ${this.host}:${this.port}...`);
    // Complex MongoDB connection logic hidden here
    this.isConnected = true;
    console.log("MongoDB connected");
  }

  public disconnect(): void {
    console.log("Disconnecting from MongoDB...");
    // Complex MongoDB disconnection logic
    this.isConnected = false;
    console.log("MongoDB disconnected");
  }

  public executeQuery(query: string): void {
    if (!this.isConnected) {
      console.log("Not connected to database");
      return;
    }
    console.log(`MongoDB executing: ${query}`);
    // MongoDB-specific query execution
  }
}

// High-level function that works with ANY database
// It doesn't need to know HOW each database connects or executes queries
function performDatabaseOperations(db: DatabaseConnection): void {
  console.log(db.getConnectionStatus());
  db.connect();
  console.log(db.getConnectionStatus());
  db.executeQuery("SELECT * FROM users");
  db.disconnect();
  console.log(db.getConnectionStatus());
}

console.log("--- Working with MySQL ---");
const mysql = new MySQLConnection("localhost", 3306);
performDatabaseOperations(mysql);

console.log("\n--- Working with PostgreSQL ---");
const postgres = new PostgreSQLConnection("localhost", 5432);
performDatabaseOperations(postgres);

console.log("\n--- Working with MongoDB ---");
const mongo = new MongoDBConnection("localhost", 27017);
performDatabaseOperations(mongo);

// Cannot instantiate abstract class (uncomment to see error):
// const db = new DatabaseConnection("localhost", 3306); // Error!
