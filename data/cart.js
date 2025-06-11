export let cart = JSON.parse(localStorage.getItem('cart')) ||
[{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    deliveryOptionId : '1'
},
{
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliveryOptionId : '2'
}];

export let timeoutId;

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

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
          quantity,
          deliveryOptionId : '1'
        });
      }

      saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })

    cart.length = 0;
    cart = newCart;

    saveToStorage();
}

export  function updateCartQuantity(){
        let cartQuantity = 0;

      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
      
       localStorage.setItem('cartQuantity', cartQuantity);
}


export function updateQuantity(productId,newQuantity) {
    cart.forEach((cartItem) => {
        if(newQuantity >= 0  && newQuantity < 1000) {
           if(productId === cartItem.productId){
          cartItem.quantity = newQuantity;
        }
        }
    })
    
    updateCartQuantity();

    saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
   let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}