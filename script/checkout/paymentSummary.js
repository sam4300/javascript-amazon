import { cart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryDate.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let totalCost = 0;
  let totalDeliveryCost = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);
    totalCost += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
    totalDeliveryCost += deliveryOption.priceCents;
  });
  const totalBeforeTax = totalCost + totalDeliveryCost;
  const taxAmount = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + taxAmount;

  const paymentSummaryHtml = `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCost
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalDeliveryCost
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxAmount
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              orderTotal
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(".payment-summary").innerHTML = paymentSummaryHtml;
}
