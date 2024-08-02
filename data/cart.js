export var cart = JSON.parse(localStorage.getItem("cartItems")) ?? [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 4,
    deliveryOptionsId: "1",
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 5,
    deliveryOptionsId: "2",
  },
];

function saveToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

export function totalProductsOnCart() {
  document.querySelector(
    ".js-cart-total-items"
  ).innerHTML = `${cart.length} products`;
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  //to get the selected quantity of the dropdown menu
  const quantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity, deliveryOptionsId: "1" });
  }

  saveToLocalStorage();
}

export function updateCartQuantity(cartId, updateItem) {
  let matchingItem = cart.find((cartItem) => cartItem.id === cartId);
  matchingItem.quantity = updateItem;
  document.querySelector(`.js-quantity-label-${cartId}`).innerHTML = updateItem;
  saveToLocalStorage();
  totalProductsOnCart();
}

export function deleteCartItem(cartId) {
  const deleteIndex = cart.findIndex((item) => item.id === cartId);
  cart.splice(deleteIndex, 1);
  //above deletion can also be done as follows where filter returns a new array of cart
  // cart = cart.filter((item) => item.id !== cartId);
  saveToLocalStorage();
  totalProductsOnCart();
}

export function updateDeliveryOptionsId(productId, deliveryOptionsId) {
  let matchingCartItem = cart.find((cartItem) => productId === cartItem.id);

  matchingCartItem.deliveryOptionsId = deliveryOptionsId;
  saveToLocalStorage();
}
