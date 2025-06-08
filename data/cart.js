export let cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2
},
{
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1
}];

export let timeoutId;

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

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })

    cart = newCart;

}