// Encapsulation: Hiding internal state and requiring all interaction through methods

class BankAccount {
  // Private properties - cannot be accessed directly from outside
  private balance: number;
  private accountNumber: string;
  private pin: string;
  private transactionHistory: string[] = [];

  constructor(accountNumber: string, initialBalance: number, pin: string) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.pin = pin;
    this.logTransaction(`Account created with balance: $${initialBalance}`);
  }

  // Public methods - the ONLY way to interact with the account
  public deposit(amount: number, enteredPin: string): boolean {
    if (!this.validatePin(enteredPin)) {
      console.log("Invalid PIN");
      return false;
    }

    if (amount <= 0) {
      console.log("Deposit amount must be positive");
      return false;
    }

    this.balance += amount;
    this.logTransaction(`Deposited: $${amount}`);
    console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    return true;
  }

  public withdraw(amount: number, enteredPin: string): boolean {
    if (!this.validatePin(enteredPin)) {
      console.log("Invalid PIN");
      return false;
    }

    if (amount <= 0) {
      console.log("Withdrawal amount must be positive");
      return false;
    }

    if (amount > this.balance) {
      console.log("Insufficient funds");
      return false;
    }

    this.balance -= amount;
    this.logTransaction(`Withdrew: $${amount}`);
    console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
    return true;
  }

  public getBalance(enteredPin: string): number | null {
    if (!this.validatePin(enteredPin)) {
      console.log("Invalid PIN");
      return null;
    }

    return this.balance;
  }

  public getTransactionHistory(enteredPin: string): string[] | null {
    if (!this.validatePin(enteredPin)) {
      console.log("Invalid PIN");
      return null;
    }

    return [...this.transactionHistory]; // Return a copy, not the original array
  }

  public changePin(oldPin: string, newPin: string): boolean {
    if (!this.validatePin(oldPin)) {
      console.log("Invalid current PIN");
      return false;
    }

    if (newPin.length < 4) {
      console.log("PIN must be at least 4 characters");
      return false;
    }

    this.pin = newPin;
    this.logTransaction("PIN changed");
    console.log("PIN changed successfully");
    return true;
  }

  // Private helper methods - internal implementation details
  private validatePin(enteredPin: string): boolean {
    return this.pin === enteredPin;
  }

  private logTransaction(message: string): void {
    const timestamp = new Date().toISOString();
    this.transactionHistory.push(`[${timestamp}] ${message}`);
  }

  // Public getter for account number (read-only access)
  public getAccountNumber(): string {
    return this.accountNumber;
  }
}

const myAccount = new BankAccount("ACC-12345", 1000, "1234");

// Using public methods
console.log("\n--- Attempting deposit ---");
myAccount.deposit(500, "1234");

console.log("\n--- Attempting withdrawal with wrong PIN ---");
myAccount.withdraw(100, "9999");

console.log("\n--- Attempting withdrawal with correct PIN ---");
myAccount.withdraw(200, "1234");

console.log("\n--- Checking balance ---");
const balance = myAccount.getBalance("1234");
console.log(`Current balance: $${balance}`);

console.log("\n--- Changing PIN ---");
myAccount.changePin("1234", "5678");

console.log("\n--- Testing new PIN ---");
myAccount.deposit(100, "5678");

console.log("\n--- Transaction history ---");
const history = myAccount.getTransactionHistory("5678");
history?.forEach(transaction => console.log(transaction));

// These would cause TypeScript errors:
// console.log(myAccount.balance);// Error: Property 'balance' is private
// myAccount.balance = 999999; // Error: Cannot access private property
// myAccount.pin = "0000"; // Error: Cannot access private property
// myAccount.validatePin("test"); // Error: Method 'validatePin' is private
