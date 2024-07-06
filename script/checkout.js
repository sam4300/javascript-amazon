import { cart, deleteCartItem } from "../data/cart.js";
import { products } from "../data/products.js";

let checkoutHtml = "";
cart.forEach((cartItem) => {
  let matchingProduct = products.find((product) => product.id === cartItem.id);

  //can also be done as follows
  // products.forEach((product) => {
  //   if (cartItem.id === product.id) {
  //     matchingProduct = product;
  //   }
  // });
  checkoutHtml += `<div class="cart-item-container cart-update-container-${
    matchingProduct.id
  }">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});

document.querySelector(".js-order-summary").innerHTML = checkoutHtml;

document.querySelectorAll(".js-delete-cart").forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const { deleteId } = deleteLink.dataset;
    deleteCartItem(deleteId);
    document.querySelector(`.cart-update-container-${deleteId}`).remove();
    console.log(deleteId);
  });
});
