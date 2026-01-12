// GOOD EXAMPLE: Rich domain model - "Tell, Don't Ask"

export class GoodBankAccount {
  private balance: number;
  private readonly accountHolder: string;
  private isActive: boolean;

  constructor(accountHolder: string, initialBalance: number) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
    this.isActive = true;
    console.log("🟢 GOOD: Rich domain model with behavior...\n");
  }

  // Tell what to do, don't expose data
  deposit(amount: number): void {
    this.validateAmount(amount);
    this.ensureActive();
    this.balance += amount;
  }

  withdraw(amount: number): void {
    this.validateAmount(amount);
    this.ensureActive();
    this.ensureSufficientFunds(amount);
    this.balance -= amount;
  }

  transferTo(amount: number, recipient: GoodBankAccount): void {
    console.log(
      `  Transferring $${amount} from ${this.accountHolder} to ${recipient.accountHolder}...`
    );

    this.withdraw(amount);
    recipient.deposit(amount);

    console.log(`  ✓ Transfer complete`);
  }

  deactivate(): void {
    this.isActive = false;
    console.log(`  ${this.accountHolder}'s account deactivated`);
  }

  // Format for display instead of exposing raw data
  formatBalance(): string {
    return `${this.accountHolder}: $${this.balance.toFixed(2)}`;
  }

  formatStatement(): string {
    const status = this.isActive ? "Active" : "Inactive";
    return `Account: ${this.accountHolder}\nBalance: $${this.balance}\nStatus: ${status}`;
  }

  // Private validation methods protect invariants
  private validateAmount(amount: number): void {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }
  }

  private ensureActive(): void {
    if (!this.isActive) {
      throw new Error(`Account ${this.accountHolder} is inactive`);
    }
  }

  private ensureSufficientFunds(amount: number): void {
    if (this.balance < amount) {
      throw new Error(`Insufficient funds in ${this.accountHolder}'s account`);
    }
  }
}

export class GoodBankingService {
  // Thin service layer - domain logic lives in the account
  processTransfer(from: GoodBankAccount, to: GoodBankAccount, amount: number): void {
    try {
      from.transferTo(amount, to);
      console.log(`${from.formatBalance()}`);
      console.log(`${to.formatBalance()}\n`);
    } catch (error) {
      console.log(`  ✗ Transfer failed: ${(error as Error).message}\n`);
    }
  }
}

// Demo - notice how we tell objects what to do
const alice = new GoodBankAccount("Alice", 1000);
const bob = new GoodBankAccount("Bob", 500);

const service = new GoodBankingService();
service.processTransfer(alice, bob, 200);

// Invalid operations are prevented by the domain model
try {
  alice.withdraw(-100); // Prevented by validation
} catch (error) {
  console.log(`Prevented invalid operation: ${(error as Error).message}`);
}

console.log(`\n${alice.formatStatement()}`);
