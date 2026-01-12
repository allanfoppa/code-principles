// GOOD EXAMPLE: No ELSE - using guard clauses and polymorphism

interface Customer {
  name: string;
  isPremium: boolean;
  yearsActive: number;
}

// Strategy Pattern - Replace conditionals with polymorphism
interface DiscountStrategy {
  calculate(amount: number): number;
  getStatus(): string;
}

class GoldMemberStrategy implements DiscountStrategy {
  calculate(amount: number): number {
    if (amount > 1000) return amount * 0.25;
    return amount * 0.15;
  }

  getStatus(): string {
    return "Gold Member";
  }
}

class SilverMemberStrategy implements DiscountStrategy {
  calculate(amount: number): number {
    if (amount > 1000) return amount * 0.2;
    return amount * 0.1;
  }

  getStatus(): string {
    return "Silver Member";
  }
}

class LoyalCustomerStrategy implements DiscountStrategy {
  calculate(amount: number): number {
    if (amount > 1000) return amount * 0.1;
    return amount * 0.05;
  }

  getStatus(): string {
    return "Loyal Customer";
  }
}

class RegularCustomerStrategy implements DiscountStrategy {
  calculate(amount: number): number {
    if (amount <= 1000) return 0;
    return amount * 0.05;
  }

  getStatus(): string {
    return "Regular Customer";
  }
}

export class GoodDiscountCalculator {
  private getStrategy(customer: Customer): DiscountStrategy {
    if (customer.isPremium && customer.yearsActive > 5) {
      return new GoldMemberStrategy();
    }

    if (customer.isPremium) {
      return new SilverMemberStrategy();
    }

    if (customer.yearsActive > 5) {
      return new LoyalCustomerStrategy();
    }

    return new RegularCustomerStrategy();
  }

  calculateDiscount(customer: Customer, amount: number): number {
    console.log(`GOOD: Calculating discount for ${customer.name}...`);
    const strategy = this.getStrategy(customer);
    return strategy.calculate(amount);
  }

  getCustomerStatus(customer: Customer): string {
    const strategy = this.getStrategy(customer);
    return strategy.getStatus();
  }
}

// Demo
const customers: Customer[] = [
  { name: "Alice", isPremium: true, yearsActive: 6 },
  { name: "Bob", isPremium: false, yearsActive: 3 },
];

const calculator = new GoodDiscountCalculator();
customers.forEach((customer) => {
  const discount = calculator.calculateDiscount(customer, 1200);
  const status = calculator.getCustomerStatus(customer);
  console.log(`  ${customer.name} (${status}): $${discount.toFixed(2)} discount\n`);
});
