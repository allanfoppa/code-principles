// ❌ BAD EXAMPLE: Large, complex functions doing multiple things

class OrderProcessor {
  // This function is doing WAY too many things!
  processOrder(
    customerId: number,
    items: any[],
    paymentMethod: string,
    discountCode: string,
    shippingAddress: any,
    billingAddress: any,
    isGift: boolean,
    giftMessage: string
  ): any {
    // Validate customer
    if (!customerId) {
      throw new Error("Invalid customer");
    }

    // Calculate total
    let total = 0;
    let tax = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].price <= 0) {
        throw new Error("Invalid price");
      }
      total += items[i].price * items[i].quantity;
      if (items[i].category === "electronics") {
        tax += items[i].price * items[i].quantity * 0.08;
      } else if (items[i].category === "books") {
        tax += items[i].price * items[i].quantity * 0.05;
      } else {
        tax += items[i].price * items[i].quantity * 0.07;
      }
    }

    // Apply discount
    if (discountCode) {
      if (discountCode === "SAVE10") {
        total = total * 0.9;
      } else if (discountCode === "SAVE20") {
        total = total * 0.8;
      } else if (discountCode === "FIRSTTIME") {
        total = total * 0.85;
      }
    }

    total += tax;

    // Calculate shipping
    let shipping = 0;
    if (shippingAddress.country === "US") {
      if (total > 50) {
        shipping = 0;
      } else {
        shipping = 5.99;
      }
    } else {
      shipping = 15.99;
    }

    total += shipping;

    // Process payment
    if (paymentMethod === "credit") {
      // Credit card processing logic
      console.log("Processing credit card...");
    } else if (paymentMethod === "paypal") {
      // PayPal processing logic
      console.log("Processing PayPal...");
    } else if (paymentMethod === "crypto") {
      // Crypto processing logic
      console.log("Processing cryptocurrency...");
    }

    // Create order record
    const order = {
      id: Math.random(),
      customerId: customerId,
      items: items,
      total: total,
      tax: tax,
      shipping: shipping,
      status: "processing",
      createdAt: new Date(),
    };

    // Send emails
    if (isGift) {
      console.log("Sending gift notification...");
      console.log("Gift message: " + giftMessage);
    }
    console.log("Sending order confirmation...");

    // Update inventory
    for (const item of items) {
      console.log(`Updating inventory for ${item.name}`);
    }

    return order;
  }
}
