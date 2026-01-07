// ✅ GOOD EXAMPLE: Small, focused functions doing one thing each

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface Address {
  country: string;
  state: string;
  city: string;
  zip: string;
}

interface OrderDetails {
  customerId: number;
  items: OrderItem[];
  paymentMethod: string;
  discountCode?: string;
  shippingAddress: Address;
  isGift: boolean;
  giftMessage?: string;
}

class CleanOrderProcessor {
  processOrder(orderDetails: OrderDetails): any {
    this.validateCustomer(orderDetails.customerId);
    this.validateItems(orderDetails.items);

    const subtotal = this.calculateSubtotal(orderDetails.items);
    const tax = this.calculateTax(orderDetails.items);
    const discountAmount = this.calculateDiscount(subtotal, orderDetails.discountCode);
    const shipping = this.calculateShipping(
      subtotal - discountAmount,
      orderDetails.shippingAddress
    );
    const total = subtotal + tax - discountAmount + shipping;

    this.processPayment(orderDetails.paymentMethod, total);

    const order = this.createOrderRecord(
      orderDetails,
      subtotal,
      tax,
      discountAmount,
      shipping,
      total
    );

    this.sendNotifications(order, orderDetails.isGift, orderDetails.giftMessage);
    this.updateInventory(orderDetails.items);

    return order;
  }

  private validateCustomer(customerId: number): void {
    if (!customerId || customerId <= 0) {
      throw new Error("Invalid customer ID");
    }
  }

  private validateItems(items: OrderItem[]): void {
    for (const item of items) {
      if (item.price <= 0) {
        throw new Error(`Invalid price for item: ${item.name}`);
      }
      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for item: ${item.name}`);
      }
    }
  }

  private calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private calculateTax(items: OrderItem[]): number {
    return items.reduce((totalTax, item) => {
      const itemTotal = item.price * item.quantity;
      const taxRate = this.getTaxRateForCategory(item.category);
      return totalTax + itemTotal * taxRate;
    }, 0);
  }

  private getTaxRateForCategory(category: string): number {
    const taxRates: { [key: string]: number } = {
      electronics: 0.08,
      books: 0.05,
    };
    return taxRates[category] || 0.07;
  }

  private calculateDiscount(subtotal: number, discountCode?: string): number {
    if (!discountCode) return 0;

    const discountRates: { [key: string]: number } = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      FIRSTTIME: 0.15,
    };

    const discountRate = discountRates[discountCode] || 0;
    return subtotal * discountRate;
  }

  private calculateShipping(orderAmount: number, address: Address): number {
    if (this.isEligibleForFreeShipping(orderAmount, address)) {
      return 0;
    }

    return this.isInternationalShipping(address) ? 15.99 : 5.99;
  }

  private isEligibleForFreeShipping(orderAmount: number, address: Address): boolean {
    return address.country === "US" && orderAmount > 50;
  }

  private isInternationalShipping(address: Address): boolean {
    return address.country !== "US";
  }

  private processPayment(paymentMethod: string, amount: number): void {
    const paymentProcessors: { [key: string]: () => void } = {
      credit: () => console.log(`Processing $${amount} via credit card`),
      paypal: () => console.log(`Processing $${amount} via PayPal`),
      crypto: () => console.log(`Processing $${amount} via cryptocurrency`),
    };

    const processor = paymentProcessors[paymentMethod];
    if (!processor) {
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }

    processor();
  }

  private createOrderRecord(
    orderDetails: OrderDetails,
    subtotal: number,
    tax: number,
    discount: number,
    shipping: number,
    total: number
  ): any {
    return {
      id: this.generateOrderId(),
      customerId: orderDetails.customerId,
      items: orderDetails.items,
      subtotal,
      tax,
      discount,
      shipping,
      total,
      status: "processing",
      createdAt: new Date(),
    };
  }

  private generateOrderId(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private sendNotifications(order: any, isGift: boolean, giftMessage?: string): void {
    if (isGift && giftMessage) {
      this.sendGiftNotification(order, giftMessage);
    }
    this.sendOrderConfirmation(order);
  }

  private sendGiftNotification(order: any, giftMessage: string): void {
    console.log(`Sending gift notification for order ${order.id}`);
    console.log(`Gift message: ${giftMessage}`);
  }

  private sendOrderConfirmation(order: any): void {
    console.log(`Sending order confirmation for order ${order.id}`);
  }

  private updateInventory(items: OrderItem[]): void {
    items.forEach((item) => {
      console.log(`Updating inventory for ${item.name}: -${item.quantity}`);
    });
  }
}
