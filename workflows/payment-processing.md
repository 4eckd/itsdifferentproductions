# Payment Processing Workflow with NOW Payments

## Overview

This document outlines the process for handling cryptocurrency payments on the Its Different Productions platform using NOW Payments. The workflow covers payment initiation, processing, verification, and order fulfillment.

## Actors

- **Customer** - The user making a purchase
- **System** - The Its Different Productions platform
- **NOW Payments** - The cryptocurrency payment processor
- **Admin** - Platform administrators (for handling exceptions)

## Preconditions

- Customer has items in their cart
- Customer is authenticated or providing shipping information
- NOW Payments API is properly configured
- Supported cryptocurrencies are defined

## Steps

### 1. Checkout Initiation

- Customer reviews items in cart and proceeds to checkout
- System calculates total amount including:
  - Product prices
  - Applicable taxes
  - Shipping costs (for physical items)
  - Discounts (if applicable)
- Customer selects cryptocurrency payment option
- System displays available cryptocurrency options

### 2. Payment Request Creation

- Customer selects preferred cryptocurrency
- System creates a payment request to NOW Payments API with:
  - Order ID
  - Amount in fiat currency (USD)
  - Selected cryptocurrency
  - IPN callback URL
  - Success/failure redirect URLs
- NOW Payments returns payment details:
  - Payment ID
  - Payment address
  - Payment amount in cryptocurrency
  - Exchange rate used
  - Payment status

### 3. Payment Display

- System displays payment information to customer:
  - Cryptocurrency amount to send
  - Payment address (with QR code)
  - Exchange rate
  - Time limit for payment (if applicable)
- System creates a pending order record
- System starts monitoring payment status

### 4. Payment Monitoring

- Customer sends cryptocurrency to the provided address
- NOW Payments monitors the blockchain for the transaction
- System periodically checks payment status via NOW Payments API
- System updates the order status based on payment status

### 5. Payment Confirmation

- When payment is detected on the blockchain:
  - NOW Payments sends an IPN (Instant Payment Notification)
  - System verifies the IPN authenticity
  - System updates the order status to "paid"
  - System records the transaction details

### 6. Order Processing

- For digital products (beats, NFTs):
  - System immediately grants access to purchased content
  - System sends download links or access instructions
- For physical products (merchandise):
  - System creates a fulfillment request
  - System updates inventory
  - System notifies shipping department

### 7. Receipt and Confirmation

- System generates a receipt with:
  - Order details
  - Payment information
  - Transaction ID
  - Download links (for digital products)
  - Shipping information (for physical products)
- System sends confirmation email to customer
- System displays confirmation page with order details

## Postconditions

- Payment is processed and verified
- Order is recorded in the database
- Customer has access to purchased digital products
- Physical products are queued for shipping
- Transaction records are maintained for accounting

## Error Handling

### Payment Timeout

- If payment is not received within the time limit:
  - System marks the order as "expired"
  - Customer is notified and can retry payment
  - Reserved inventory is released (for physical products)

### Partial Payment

- If customer sends less than the required amount:
  - System marks the order as "partially paid"
  - Customer is notified of the remaining amount
  - Order remains on hold until full payment

### Overpayment

- If customer sends more than the required amount:
  - System processes the order normally
  - Excess amount is recorded
  - Admin is notified to handle the refund

### Network Issues

- If NOW Payments API is unavailable:
  - System queues the payment request for retry
  - Customer is notified of the temporary issue
  - System attempts to recover gracefully

## Security Considerations

- All API communications use HTTPS
- IPN verification uses HMAC signatures
- Payment addresses are unique per transaction
- Sensitive payment data is not stored
- Transaction records are encrypted

## Technical Implementation

### NOW Payments Integration

```typescript
// Example code for creating a payment
async function createPayment(orderId: string, amount: number, currency: string) {
  const response = await fetch('https://api.nowpayments.io/v1/payment', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NOW_PAYMENTS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price_amount: amount,
      price_currency: currency,
      order_id: orderId,
      order_description: `Order #${orderId} on Its Different Productions`,
      ipn_callback_url: `${process.env.SITE_URL}/api/payment-webhook`,
      success_url: `${process.env.SITE_URL}/order/success?id=${orderId}`,
      cancel_url: `${process.env.SITE_URL}/order/cancel?id=${orderId}`,
    }),
  });
  
  return await response.json();
}
```

### IPN Verification

```typescript
// Example code for verifying IPN
function verifyIpn(ipnData: any, signature: string) {
  const hmac = crypto.createHmac('sha512', process.env.NOW_PAYMENTS_IPN_SECRET);
  const calculatedSignature = hmac.update(JSON.stringify(ipnData)).digest('hex');
  
  return calculatedSignature === signature;
}
```

## Related Workflows

- [Shopping Cart](./shopping-cart.md)
- [Order Processing](./order-processing.md)
- [Digital Product Delivery](./digital-product-delivery.md)
- [Merchandise Fulfillment](./merchandise-fulfillment.md)
