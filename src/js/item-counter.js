console.log("item-counter.js ran");

export function updateNumber(value) {
  console.log(value);
  if (value < 0) {
    console.log("User clicked (-) button when value is already 0");
    addToCartValue=0;  
    addCartButton.removeAttribute("data-bs-toggle");
  }
  else {
    addToCartDisplay.innerHTML=value;
    addCartButton.setAttribute("data-bs-toggle", "modal");
  }
}

export function updateCart(changeAmount) {
  let newAmount = parseInt(cartAmountHolder.innerHTML) + changeAmount;
  if (newAmount > 0) {
    localStorage.setItem("stored-amount", newAmount); 
    cartAmountHolder.style.display="flex";
    emptyCartModal.style.display = "none";
    checkoutRow.style.display = "flex";
    hasItemsCartModal.style.display = "flex";
    cartAmountHolder.innerHTML = newAmount;
    multiplier.innerHTML= newAmount;
    cartTotal.innerHTML = `$${(newAmount * currentPrice).toFixed(2)}`;
    console.log("update cart val with new amount and bubble is visible");  
  } else {
    localStorage.setItem("stored-amount", 0);
    checkoutRow.style.display = "none";
    cartAmountHolder.style.display="none";
    cartAmountHolder.innerHTML = newAmount;
    emptyCartModal.style.display = "flex";
    hasItemsCartModal.style.display = "none";
  }
} 
