// Cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

//Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

//Cart Working JS

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

// Making Function
function ready(){
    //Remove Item from Cart
    let removeCartButton = document.getElementsByClassName('cart-remove');
    console.log(removeCartButton);
    for (let i = 0; i < removeCartButton.length; i++) {
        let button = removeCartButton[i];
        button.addEventListener('click', removeCartItem)
        
    }

    //Quantity Changes
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to Cart
    let addCart = document.getElementsByClassName('add-cart')
    for  (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    // Buy Button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// Buy Button 
function  buyButtonClicked(){
  alert('Your Order has been Placed');
  let cartContent = document.getElementsByClassName('cart-content')[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal()
}

 //Remove Item from Cart

 function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal()
 }

 //Quantity Changes
 function quantityChanged(event) {
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
 }

 //Add to Cart
 function addCartClicked(event){
     let button = event.target;
     let shopProducts = button.parentElement;
     let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
     let prices = shopProducts.getElementsByClassName('price')[0].innerText;
     let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
     addProductToCart(title, prices, productImg);
     updateTotal();
 }

 //Add Products to Cart
 function   addProductToCart(title, prices, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems  = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert('You have already added Item to Cart');
            return; 
        }
      
    }

    let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title"> ${title}</div>
                            <div class="cart-price">${prices}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--Remove Cart-->
                        <i class='bx bx-trash cart-remove'></i>`;


        cartShopBox.innerHTML = cartBoxContent ;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
 }

 

 //Update Total
function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = document.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++){
      let cartBox = cartBoxes[i];
      let priceElement = cartBox.getElementsByClassName('cart-price')[0];
      let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
      let price = parseFloat(priceElement.innerText.replace('₦', ''));
      let quantity = quantityElement.value;
      total = total + (price * quantity);
    }
      //If Price contains cents
      total = Math.round(total * 100) / 100;

      document.getElementsByClassName('total-price')[0].innerText = '₦' + total;
    
} 