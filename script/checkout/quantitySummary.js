import {
  cart,
  deleteCartItem,
  totalProductsOnCart,
  updateCartQuantity,
  updateDeliveryOptionsId,
} from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryDate.js";
import { products, getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let checkoutHtml = "";
  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.id);

    //can also be done as follows
    // products.forEach((product) => {
    //   if (cartItem.id === product.id) {
    //     matchingProduct = product;
    //   }
    // });

    const matchingDeliveryOption = getDeliveryOption(
      cartItem.deliveryOptionsId
    );

    const today = dayjs();
    const deliveryDate = today.add(matchingDeliveryOption.deliveryDays, "days");
    const dateFormat = deliveryDate.format("dddd, MMMM D");

    checkoutHtml += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
                  <div class="delivery-date">
                    Delivery date: ${dateFormat}
                   </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}" alt="${
      matchingProduct.name
    }"> 

                    <div class="cart-item-details">
                     <div class="product-name">
                      ${matchingProduct.name}
                      </div>
                   <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity  cart-update-container-${
                    matchingProduct.id
                  }">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${
                      matchingProduct.id
                    }">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-cart" 
                    data-update-cart = "${matchingProduct.id}">
                    Update
                  </span>
                  <input class = "quantity-input js-quantity-input-${
                    matchingProduct.id
                  }" type = 'number' value = ${cartItem.quantity}>
                  <span class ="save-quantity link-primary" data-save-cart = "${
                    matchingProduct.id
                  }" >save</span>
                  <span  class="delete-quantity-link link-primary 
                        js-delete-cart"
                        data-delete-id = "${matchingProduct.id}"
                        >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                     </div>
                      ${deliveryOptionHtml(matchingProduct, cartItem)}
                     </div>
            </div>
          </div>`;
  });

  document.querySelector(".js-order-summary").innerHTML = checkoutHtml;

  function deliveryOptionHtml(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateFormat = deliveryDate.format("dddd, MMMM D");

      const deliveryCost =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

      html += `
        <div class="delivery-option js-delivery-option"    
                     data-product-id = "${matchingProduct.id}"
                     data-delivery-id = "${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
               
                    >
                  <div>
                  <div class="delivery-option-date">
                      ${dateFormat}
                  </div>
                  <div class="delivery-option-price">
                    ${deliveryCost} - Shipping
                  </div>
                </div>
              </div>`;
    });
    return html;
  }

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryId } = element.dataset;
      updateDeliveryOptionsId(productId, deliveryId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-cart").forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      const { updateCart } = updateLink.dataset;
      const container = document.querySelector(
        `.cart-update-container-${updateCart}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".save-quantity").forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      const { saveCart } = saveLink.dataset;
      const container = document.querySelector(
        `.cart-update-container-${saveCart}`
      );
      const quantity = Number(container.querySelector(".quantity-input").value);
      updateCartQuantity(saveCart, quantity);

      container.classList.remove("is-editing-quantity");
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delete-cart").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const { deleteId } = deleteLink.dataset;
      deleteCartItem(deleteId);
      document.querySelector(`.js-cart-item-container-${deleteId}`).remove();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();

totalProductsOnCart();
