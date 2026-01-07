// ✅ GOOD EXAMPLE: DRY principle applied with proper abstraction

// Constants to eliminate magic numbers and strings
const CONSTANTS = {
  USER: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 50,
    MIN_AGE: 18,
    MAX_AGE: 120,
  },
  PRODUCT: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_PRICE: 0,
    MAX_PRICE: 10000,
  },
  STATUS: {
    ACTIVE: "active",
    INACTIVE: "inactive",
  },
  ID: {
    MAX_RANDOM: 1000000,
  },
  SHIPPING: {
    WEIGHT_TIERS: {
      LIGHT: 1,
      MEDIUM: 5,
    },
  },
} as const;

// Tax rates configuration
const TAX_RATES = {
  STANDARD: {
    US: 0.08,
    CA: 0.13,
    UK: 0.2,
    DEFAULT: 0.15,
  },
  IMPORT: {
    US: 0.05,
    CA: 0.08,
    UK: 0.12,
    DEFAULT: 0.1,
  },
} as const;

// Shipping rates configuration
const SHIPPING_RATES = {
  STANDARD: {
    US: { light: 5.99, medium: 9.99, heavy: 15.99 },
    CA: { light: 7.99, medium: 12.99, heavy: 19.99 },
    DEFAULT: { light: 15.99, medium: 25.99, heavy: 35.99 },
  },
  EXPRESS: {
    US: { light: 12.99, medium: 18.99, heavy: 25.99 },
    CA: { light: 15.99, medium: 22.99, heavy: 29.99 },
    DEFAULT: { light: 25.99, medium: 35.99, heavy: 45.99 },
  },
} as const;

// Shared validation utilities
class ValidationUtils {
  static validateRequired(value: string, fieldName: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error(`${fieldName} is required`);
    }
  }

  static validateLength(
    value: string,
    fieldName: string,
    minLength: number,
    maxLength: number
  ): void {
    if (value.length < minLength || value.length > maxLength) {
      throw new Error(`${fieldName} must be between ${minLength} and ${maxLength} characters`);
    }
  }

  static validateRange(value: number, fieldName: string, min: number, max: number): void {
    if (!value || value < min || value > max) {
      throw new Error(`${fieldName} must be between ${min} and ${max}`);
    }
  }

  static validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }
}

// Shared utility functions
class CommonUtils {
  static generateId(): number {
    return Math.floor(Math.random() * CONSTANTS.ID.MAX_RANDOM);
  }

  static normalizeString(value: string): string {
    return value.trim().toLowerCase();
  }

  static createBaseEntity(id?: number): {
    id: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
  } {
    return {
      id: id || this.generateId(),
      status: CONSTANTS.STATUS.ACTIVE,
      ...(id ? { updatedAt: new Date() } : { createdAt: new Date() }),
    };
  }
}

// Base validator class to eliminate repeated validation patterns
abstract class BaseValidator<T> {
  abstract validate(data: T): void;

  protected validateName(
    name: string,
    fieldName: string,
    minLength: number,
    maxLength: number
  ): void {
    ValidationUtils.validateRequired(name, fieldName);
    ValidationUtils.validateLength(name, fieldName, minLength, maxLength);
  }
}

// User-specific validation
class UserValidator extends BaseValidator<{ name: string; email: string; age: number }> {
  validate(data: { name: string; email: string; age: number }): void {
    this.validateName(
      data.name,
      "Name",
      CONSTANTS.USER.MIN_NAME_LENGTH,
      CONSTANTS.USER.MAX_NAME_LENGTH
    );

    ValidationUtils.validateRequired(data.email, "Email");
    ValidationUtils.validateEmail(data.email);

    ValidationUtils.validateRange(data.age, "Age", CONSTANTS.USER.MIN_AGE, CONSTANTS.USER.MAX_AGE);
  }
}

// Product-specific validation
class ProductValidator extends BaseValidator<{ name: string; price: number; category: string }> {
  validate(data: { name: string; price: number; category: string }): void {
    this.validateName(
      data.name,
      "Product name",
      CONSTANTS.PRODUCT.MIN_NAME_LENGTH,
      CONSTANTS.PRODUCT.MAX_NAME_LENGTH
    );

    ValidationUtils.validateRange(
      data.price,
      "Price",
      CONSTANTS.PRODUCT.MIN_PRICE,
      CONSTANTS.PRODUCT.MAX_PRICE
    );

    ValidationUtils.validateRequired(data.category, "Category");
  }
}

// Services using shared validation and utilities
class UserService {
  private validator = new UserValidator();

  createUser(name: string, email: string, age: number): any {
    const userData = { name, email, age };
    this.validator.validate(userData);

    return {
      ...CommonUtils.createBaseEntity(),
      name: name.trim(),
      email: CommonUtils.normalizeString(email),
      age: age,
    };
  }

  updateUser(id: number, name: string, email: string, age: number): any {
    const userData = { name, email, age };
    this.validator.validate(userData);

    return {
      ...CommonUtils.createBaseEntity(id),
      name: name.trim(),
      email: CommonUtils.normalizeString(email),
      age: age,
    };
  }
}

class ProductService {
  private validator = new ProductValidator();

  createProduct(name: string, price: number, category: string): any {
    const productData = { name, price, category };
    this.validator.validate(productData);

    return {
      ...CommonUtils.createBaseEntity(),
      name: name.trim(),
      price: price,
      category: CommonUtils.normalizeString(category),
    };
  }

  updateProduct(id: number, name: string, price: number, category: string): any {
    const productData = { name, price, category };
    this.validator.validate(productData);

    return {
      ...CommonUtils.createBaseEntity(id),
      name: name.trim(),
      price: price,
      category: CommonUtils.normalizeString(category),
    };
  }
}

// Centralized calculation services
class TaxCalculationService {
  static calculate(
    amount: number,
    country: string,
    taxType: "STANDARD" | "IMPORT" = "STANDARD"
  ): number {
    const rates = TAX_RATES[taxType];
    const rate = rates[country as keyof typeof rates] || rates.DEFAULT;
    return amount * rate;
  }
}

class ShippingCalculationService {
  static calculate(
    country: string,
    weight: number,
    shippingType: "STANDARD" | "EXPRESS" = "STANDARD"
  ): number {
    const rates = SHIPPING_RATES[shippingType];
    const countryRates = rates[country as keyof typeof rates] || rates.DEFAULT;

    return this.getRateByWeight(weight, countryRates);
  }

  private static getRateByWeight(
    weight: number,
    rates: { light: number; medium: number; heavy: number }
  ): number {
    if (weight <= CONSTANTS.SHIPPING.WEIGHT_TIERS.LIGHT) {
      return rates.light;
    } else if (weight <= CONSTANTS.SHIPPING.WEIGHT_TIERS.MEDIUM) {
      return rates.medium;
    } else {
      return rates.heavy;
    }
  }
}

class OrderService {
  calculateShipping(country: string, weight: number): number {
    return ShippingCalculationService.calculate(country, weight, "STANDARD");
  }

  calculateExpressShipping(country: string, weight: number): number {
    return ShippingCalculationService.calculate(country, weight, "EXPRESS");
  }

  calculateTax(amount: number, country: string): number {
    return TaxCalculationService.calculate(amount, country, "STANDARD");
  }

  calculateImportTax(amount: number, country: string): number {
    return TaxCalculationService.calculate(amount, country, "IMPORT");
  }
}
