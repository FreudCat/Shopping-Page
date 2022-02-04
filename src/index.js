console.log("index.js ran");
const shoeDivArray = document.querySelectorAll(".thumbnail-shoe-div");
const shoeArray = document.querySelectorAll(".thumbnail-shoe");
const mainShoe = document.querySelector(".main-image");
const largeImageArray = ["../assets/images/image-product-1.jpg", "../assets/images/image-product-2.jpg", "../assets/images/image-product-3.jpg", "../assets/images/image-product-4.jpg"];

for (let index=0; index<shoeArray.length; index++) {
  shoeArray[index].addEventListener("click", function() {
    highlightShoe(index);
  })
}

function highlightShoe(activeShoeIndex) {
  mainShoe.src=largeImageArray[activeShoeIndex];
  for (let index=0; index < shoeDivArray.length; index++) {
    if (index===activeShoeIndex) {
      shoeDivArray[index].style.border="2px solid hsl(26, 100%, 55%)";
      shoeArray[index].style.opacity="0.3";
    } else {
      shoeDivArray[index].style.border="2px solid transparent";
      shoeArray[index].style.opacity="1";
      shoeArray[index].removeAttribute("style");
    }
  }
}


let currentCartAmount = parseInt(document.querySelector(".cart-amount-holder").innerHTML);
let amountToAdd = parseInt(document.querySelector(".number-holder").innerHTML);


document.querySelector(".minus").addEventListener("click", function() {
  updateNumber(amountToAdd-=1);
})
document.querySelector(".plus").addEventListener("click", function() {
  updateNumber(amountToAdd+=1);
})
document.querySelector(".add-cart-button").addEventListener("click", function() {
  updateCart(amountToAdd);
})

function updateNumber(value) {
  console.log(value);
  if (value < 0) {
    console.log("User clicked (-) button when value is already 0");
    amountToAdd=0;
  }
  else {
    document.querySelector(".number-holder").innerHTML=value;
  }
}

function updateCart(value) {
  if (value === 0) {
    document.querySelector(".cart-amount-holder").style.display="none";
    console.log("cart updated with value of 0 and orange bubble removed");
  } else {
    document.querySelector(".cart-amount-holder").style.display="flex";
    document.querySelector(".cart-amount-holder").innerHTML = value;
    console.log("update cart val with new amount and bubble is visible");
  }
} 



if(window.innerWidth < 700){
  console.log("innderwidth");
  document.querySelector(".main-image").removeAttribute("data-bs-toggle");
}
window.addEventListener("resize", function () {
  if (window.innerWidth > 700) {
    document.querySelector(".main-image").setAttribute("data-bs-toggle", "modal");
  } else {
    document.querySelector(".main-image").removeAttribute("data-bs-toggle");
}
});

document.querySelector(".main-image").addEventListener("click", function() {
  document.querySelector(".modal-image").src=document.querySelector(".main-image").src;

  })
