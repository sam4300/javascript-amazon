import {
  cart,
  deleteCartItem,
  totalProductsOnCart,
  updateCartQuantity,
} from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryDate.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";

let checkoutHtml = "";
cart.forEach((cartItem) => {
  let matchingProduct = products.find((product) => product.id === cartItem.id);

  //can also be done as follows
  // products.forEach((product) => {
  //   if (cartItem.id === product.id) {
  //     matchingProduct = product;
  //   }
  // });

  let matchingDeliveryOption = deliveryOptions.find((option) => {
    return option.id === cartItem.deliveryOptionsId;
  });

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
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
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
                  }" type = 'number'>
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
        <div class="delivery-option">
                  <input type="radio"
                  ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
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

document.querySelector(".js-order-summary").innerHTML = checkoutHtml;

document
  .querySelector(".js-order-summary")
  .addEventListener("click", (event) => {
    const target = event.target;
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
  });
});

document.querySelectorAll(".js-delete-cart").forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const { deleteId } = deleteLink.dataset;
    deleteCartItem(deleteId);
    document.querySelector(`.js-cart-item-container-${deleteId}`).remove();
  });
});

totalProductsOnCart();
