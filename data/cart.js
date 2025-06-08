export const cart = [];

export function addToCart (productId){
    const selectInput = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selectInput.value);
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

    addedMessage.classList.add('added');

    clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
          addedMessage.classList.remove('added');
      },2000)

    let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          productId,
          quantity
        });
      }
}