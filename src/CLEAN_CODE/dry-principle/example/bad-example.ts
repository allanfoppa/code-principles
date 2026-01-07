/* eslint-disable @typescript-eslint/no-explicit-any */

// ❌ BAD EXAMPLE: Lots of code duplication and magic numbers

export class UserService {
  // Duplicate validation logic
  createUser(name: string, email: string, age: number): any {
    // Validation duplicated in multiple places
    if (!name || name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (name.length < 2 || name.length > 50) {
      throw new Error("Name must be between 2 and 50 characters");
    }
    if (!email || email.trim().length === 0) {
      throw new Error("Email is required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email format");
    }
    if (!age || age < 18 || age > 120) {
      throw new Error("Age must be between 18 and 120");
    }

    return {
      id: Math.random() * 1000000, // Magic number
      name: name.trim(),
      email: email.toLowerCase(),
      age: age,
      status: "active", // Magic string
      createdAt: new Date(),
    };
  }

  // Same validation logic repeated again!
  updateUser(id: number, name: string, email: string, age: number): any {
    if (!name || name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (name.length < 2 || name.length > 50) {
      throw new Error("Name must be between 2 and 50 characters");
    }
    if (!email || email.trim().length === 0) {
      throw new Error("Email is required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email format");
    }
    if (!age || age < 18 || age > 120) {
      throw new Error("Age must be between 18 and 120");
    }

    return {
      id: id,
      name: name.trim(),
      email: email.toLowerCase(),
      age: age,
      status: "active", // Same magic string
      updatedAt: new Date(),
    };
  }
}

export class ProductService {
  // Duplicate validation patterns
  createProduct(name: string, price: number, category: string): any {
    // Similar validation pattern repeated
    if (!name || name.trim().length === 0) {
      throw new Error("Product name is required");
    }
    if (name.length < 2 || name.length > 100) {
      // Different magic numbers
      throw new Error("Product name must be between 2 and 100 characters");
    }
    if (!price || price <= 0 || price > 10000) {
      // Magic numbers again
      throw new Error("Price must be between 0 and 10000");
    }
    if (!category || category.trim().length === 0) {
      throw new Error("Category is required");
    }

    return {
      id: Math.random() * 1000000, // Same random ID generation
      name: name.trim(),
      price: price,
      category: category.toLowerCase(),
      status: "active", // Same magic string
      createdAt: new Date(),
    };
  }

  updateProduct(id: number, name: string, price: number, category: string): any {
    // Validation repeated AGAIN
    if (!name || name.trim().length === 0) {
      throw new Error("Product name is required");
    }
    if (name.length < 2 || name.length > 100) {
      throw new Error("Product name must be between 2 and 100 characters");
    }
    if (!price || price <= 0 || price > 10000) {
      throw new Error("Price must be between 0 and 10000");
    }
    if (!category || category.trim().length === 0) {
      throw new Error("Category is required");
    }

    return {
      id: id,
      name: name.trim(),
      price: price,
      category: category.toLowerCase(),
      status: "active",
      updatedAt: new Date(),
    };
  }
}

export class OrderService {
  // More duplicate logic
  calculateShipping(country: string, weight: number): number {
    if (country === "US") {
      if (weight <= 1) {
        return 5.99; // Magic numbers everywhere
      } else if (weight <= 5) {
        return 9.99;
      } else {
        return 15.99;
      }
    } else if (country === "CA") {
      if (weight <= 1) {
        return 7.99;
      } else if (weight <= 5) {
        return 12.99;
      } else {
        return 19.99;
      }
    } else {
      if (weight <= 1) {
        return 15.99;
      } else if (weight <= 5) {
        return 25.99;
      } else {
        return 35.99;
      }
    }
  }

  // Similar shipping calculation with slight differences
  calculateExpressShipping(country: string, weight: number): number {
    if (country === "US") {
      if (weight <= 1) {
        return 12.99; // Different magic numbers
      } else if (weight <= 5) {
        return 18.99;
      } else {
        return 25.99;
      }
    } else if (country === "CA") {
      if (weight <= 1) {
        return 15.99;
      } else if (weight <= 5) {
        return 22.99;
      } else {
        return 29.99;
      }
    } else {
      if (weight <= 1) {
        return 25.99;
      } else if (weight <= 5) {
        return 35.99;
      } else {
        return 45.99;
      }
    }
  }

  // Tax calculation duplicated
  calculateTax(amount: number, country: string): number {
    if (country === "US") {
      return amount * 0.08; // Magic tax rates
    } else if (country === "CA") {
      return amount * 0.13;
    } else if (country === "UK") {
      return amount * 0.2;
    } else {
      return amount * 0.15;
    }
  }

  // Similar tax calculation for different purpose
  calculateImportTax(amount: number, country: string): number {
    if (country === "US") {
      return amount * 0.05; // Different rates but same pattern
    } else if (country === "CA") {
      return amount * 0.08;
    } else if (country === "UK") {
      return amount * 0.12;
    } else {
      return amount * 0.1;
    }
  }
}
