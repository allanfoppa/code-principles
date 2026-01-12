// BAD EXAMPLE: Using ELSE creates complex nested logic

interface Customer {
  name: string;
  isPremium: boolean;
  yearsActive: number;
}

export class BadDiscountCalculator {
  calculateDiscount(customer: Customer, amount: number): number {
    console.log(`BAD: Calculating discount for ${customer.name}...`);

    if (customer.isPremium) {
      if (customer.yearsActive > 5) {
        if (amount > 1000) {
          return amount * 0.25;
        } else {
          return amount * 0.15;
        }
      } else {
        if (amount > 1000) {
          return amount * 0.2;
        } else {
          return amount * 0.1;
        }
      }
    } else {
      if (customer.yearsActive > 5) {
        if (amount > 1000) {
          return amount * 0.1;
        } else {
          return amount * 0.05;
        }
      } else {
        if (amount > 1000) {
          return amount * 0.05;
        } else {
          return 0;
        }
      }
    }
  }

  getCustomerStatus(customer: Customer): string {
    if (customer.isPremium) {
      if (customer.yearsActive > 5) {
        return "Gold Member";
      } else {
        return "Silver Member";
      }
    } else {
      if (customer.yearsActive > 5) {
        return "Loyal Customer";
      } else {
        return "Regular Customer";
      }
    }
  }
}

// Demo
const customers: Customer[] = [
  { name: "Alice", isPremium: true, yearsActive: 6 },
  { name: "Bob", isPremium: false, yearsActive: 3 },
];

const calculator = new BadDiscountCalculator();
customers.forEach((customer) => {
  const discount = calculator.calculateDiscount(customer, 1200);
  const status = calculator.getCustomerStatus(customer);
  console.log(`  ${customer.name} (${status}): $${discount.toFixed(2)} discount\n`);
});
