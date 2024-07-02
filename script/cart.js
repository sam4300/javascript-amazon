export const carts = [];

export function addToCart(productId) {
  let matchingItem;
  carts.forEach((cartItem) => {
    if (productId === cartItem.productId) {
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
    carts.push({ productId, quantity });
  }
}
