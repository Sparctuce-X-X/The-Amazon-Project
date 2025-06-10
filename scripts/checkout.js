import { cart , removeFromCart, updateCartQuantity , updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let cartSummaryHtml = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    })
    cartSummaryHtml += 
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input">
                  <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                  save
                  </span>
                  <span class="js-span">
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
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
                  <input type="radio" checked class="delivery-option-input"
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
                  <input type="radio" class="delivery-option-input"
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
          </div>
    
    `;
})

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const {productId} = link.dataset ;
            console.log(productId);
            removeFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
        })
    })

updateCartQuantity();

document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
        const {productId} = link.dataset ;
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
        })
    })

document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {productId}  = link.dataset ;
        const inputElement = document.querySelector('.js-quantity-input');
        const value = inputElement.value;
        let newQuantity = Number(value) ;
        updateQuantity(productId,newQuantity);

        if(newQuantity >= 0  && newQuantity < 1000) {
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.querySelector('.quantity-label').textContent = newQuantity;
        }else{
          alert('Quantity not correct');
        }
        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
      })      // ...existing code...
      
      document.querySelectorAll('.js-quantity-input')
        .forEach((input) => {
          input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              const container = input.closest('.cart-item-container');
              const productId = container.className.match(/js-cart-item-container-([^\s]+)/)[1];
              const value = input.value;
              let newQuantity = Number(value);
              updateQuantity(productId, newQuantity);
      
              if (newQuantity >= 0 && newQuantity < 1000) {
                container.querySelector('.quantity-label').textContent = newQuantity;
              } else {
                alert('Quantity not correct');
              }
              container.classList.remove('is-editing-quantity');
            }
          });
        });
      
      // ...existing code...
    });