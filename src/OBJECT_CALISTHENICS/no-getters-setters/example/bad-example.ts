// BAD EXAMPLE: Anemic domain model with getters/setters - "Ask, Don't Tell"

export class BadBankAccount {
  private balance: number;
  private accountHolder: string;
  private isActive: boolean;

  constructor(accountHolder: string, initialBalance: number) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
    this.isActive = true;
    console.log("🔴 BAD: Anemic domain model with getters/setters...\n");
  }

  // Exposing internal state
  getBalance(): number {
    return this.balance;
  }

  setBalance(amount: number): void {
    this.balance = amount;
  }

  getAccountHolder(): string {
    return this.accountHolder;
  }

  setAccountHolder(name: string): void {
    this.accountHolder = name;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  setIsActive(active: boolean): void {
    this.isActive = active;
  }
}

// Business logic leaks into client code
export class BadBankingService {
  transfer(from: BadBankAccount, to: BadBankAccount, amount: number): void {
    console.log(`Transferring $${amount}...`);

    // Asking for data and manipulating it externally
    if (!from.getIsActive() || !to.getIsActive()) {
      console.log("  ✗ One or both accounts inactive");
      return;
    }

    if (from.getBalance() < amount) {
      console.log("  ✗ Insufficient funds");
      return;
    }

    // Business rules scattered in client code
    const newFromBalance = from.getBalance() - amount;
    const newToBalance = to.getBalance() + amount;

    from.setBalance(newFromBalance);
    to.setBalance(newToBalance);

    console.log(`  ✓ Transfer complete`);
    console.log(`    ${from.getAccountHolder()}: $${from.getBalance()}`);
    console.log(`    ${to.getAccountHolder()}: $${to.getBalance()}\n`);
  }
}

// Demo - notice how client manipulates account state
const alice = new BadBankAccount("Alice", 1000);
const bob = new BadBankAccount("Bob", 500);

const service = new BadBankingService();
service.transfer(alice, bob, 200);

// Nothing prevents invalid operations
alice.setBalance(-100); // Whoops! Negative balance
console.log(`Alice balance after invalid operation: $${alice.getBalance()}`);
