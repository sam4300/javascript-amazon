import * as cartFile from "../script/cart.js";
import { products } from "../data/products.js";

let productHtml = "";

products.forEach((product) => {
  productHtml += `
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src='${product.image}'>
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents / 100}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productHtml;

function increaseCartQunatity() {
  let cartQuantity = 0;
  cartFile.carts.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function showAddedText(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("added-to-cart-visible");

  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);

  addedMessageTimeouts[productId] = timeoutId;
}

const addedMessageTimeouts = {};

document.querySelectorAll(".js-add-to-cart").forEach((cartButton) => {
  cartButton.addEventListener("click", () => {
    //destructured form
    const { productId } = cartButton.dataset;

    //normal form
    // const productId = cartButton.dataset.productId;
    cartFile.addToCart(productId);
    increaseCartQunatity();
    showAddedText(productId);
  });
});
