export var cart = JSON.parse(localStorage.getItem("cartItems")) ?? [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 4,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 5,
  },
];

function saveToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cart));
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
    cart.push({ id: productId, quantity });
  }

  console.log(cart);
  saveToLocalStorage();
}

export function deleteCartItem(cartId) {
  cart = cart.filter((cart) => {
    return cart.id !== cartId;
  });
  saveToLocalStorage();
}
