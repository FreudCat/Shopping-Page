console.log("index.js ran");
const mainThumbnailArray = document.querySelectorAll(".thumbnail-shoe");
const mainShoe = document.querySelector(".main-image");
const carouselItem = document.querySelector(".carousel-item");
const modalThumbnailArray= document.querySelectorAll(".modal-thumbnail");
const modalMain = document.querySelector(".modal-image");
const myModal = document.querySelector("#shoeModal");
const carouselPrev = document.querySelectorAll(".carousel-control-prev");
const carouselNext = document.querySelectorAll(".carousel-control-next");
let tempValue = "";
let cartAmountHolder = document.querySelector(".cart-amount-holder");
const checkoutRow = document.querySelector(".checkout-row");
const emptyCartModal = document.querySelector(".modal-body-empty");
const hasItemsCartModal = document.querySelector(".modal-body-items");
const multiplier = document.querySelector(".multiply-amount");
const cartTotal = document.querySelector(".cart-item-total");
const addCartButton = document.querySelector(".add-cart-button");

const imageArray = [
  {
    title: "image-product-1",
    alt: "A pair of tan and white sneakers with white shoelaces and flat tread"
  }, 
  {
    title: "image-product-2",
    alt: "A pair of tan and white sneakers with white shoelaces and orange back"
  }, 
  {
    title: "image-product-3",
    alt: "A right tan and white sneaker balancing on two rocks with orange background"
  }, 
  {
    title: "image-product-4",
    alt: "Side view of left tan and white sneaker with 1/2 inch heal"
  }
] 
// Elements that populate on load -> next time, place in lifecycle 
const currentPrice = parseInt(document.querySelector(".set-price").getAttribute("data-price"));
const sale = document.querySelector(".sale-tag").getAttribute("data-sale");
const previousPrice = document.querySelector(".previous-price").getAttribute("data-previous-price"); 
document.querySelector(".set-price").innerHTML = currentPrice.toFixed(2);
document.querySelector(".sale-tag").innerHTML = sale;
document.querySelector(".previous-price").innerHTML = previousPrice;
addCartButton.removeAttribute("data-bs-toggle");
mainThumbnailArray[0].classList.add("less-opaque");
mainThumbnailArray[0].parentElement.classList.add("add-orange-outline");

if (localStorage.length === 0 || (localStorage.getItem("stored-amount") == 0)) {
  checkoutRow.classList.add("display-none");
  emptyCartModal.classList.add("display-flex");
  hasItemsCartModal.classList.add("display-none");
  tempValue = 0; 
} else {  
  tempValue = parseInt(localStorage.getItem("stored-amount"));
  cartAmountHolder.classList.add("display-flex");
  cartAmountHolder.innerHTML = tempValue;
  checkoutRow.classList.add("display-flex");
  emptyCartModal.classList.add("display-none");
  hasItemsCartModal.classList.add("display-flex");
  multiplier.innerHTML= tempValue;
  cartTotal.innerHTML = `$${(tempValue * currentPrice).toFixed(2)}`;
}
// End on load events

let addToCartDisplay = document.querySelector(".number-holder");
let addToCartValue = parseInt(addToCartDisplay.innerHTML);
document.querySelector(".minus").addEventListener("click", function() {
  updateNumber(addToCartValue-=1);
})
document.querySelector(".plus").addEventListener("click", function() {
  updateNumber(addToCartValue+=1);
})
document.querySelector(".delete-button").addEventListener("click", function() {
  updateCart(-1);
})
addCartButton.addEventListener("click", function() {
  if (addToCartValue > 0) {
    addToCartDisplay.innerHTML=0;
    updateCart(addToCartValue);
    addToCartValue=0;
    addCartButton.removeAttribute("data-bs-toggle");
  } else {
    console.log("I'm 0");
  }
})

function updateNumber(value) {
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

function updateCart(changeAmount) {
  let newAmount = parseInt(cartAmountHolder.innerHTML) + changeAmount;
  if (newAmount > 0) {
    localStorage.setItem("stored-amount", newAmount); 
    cartAmountHolder.classList.add("display-flex");
    emptyCartModal.classList.add("display-none");
    checkoutRow.classList.add("display-flex");
    hasItemsCartModal.classList.add("display-flex");
    cartAmountHolder.innerHTML = newAmount;
    multiplier.innerHTML= newAmount;
    cartTotal.innerHTML = `$${(newAmount * currentPrice).toFixed(2)}`;
    console.log("update cart val with new amount and bubble is visible");  
  } else {
    localStorage.setItem("stored-amount", 0);
    checkoutRow.classList.add("display-none");
    cartAmountHolder.classList.add("display-none");
    cartAmountHolder.innerHTML = newAmount;
    emptyCartModal.classList.add("display-flex");
    hasItemsCartModal.classList.add("display-none");
  }
} 

let index = "";
for (let prevButton of carouselPrev) {
  prevButton.addEventListener("click", function() {
    currentSlideSrc = myModal.classList.contains("show") ? modalMain.getAttribute("src") : mainShoe.getAttribute("src");
    index = imageArray.findIndex( image => image.title === currentSlideSrc.substring(17, 32)); 
    nextSlide(index-=1);
  })
}

for (let nextButton of carouselNext) {
  nextButton.addEventListener("click", function() {
    currentSlideSrc = myModal.classList.contains("show") ? modalMain.getAttribute("src") : mainShoe.getAttribute("src");
    index = imageArray.findIndex( image => image.title === currentSlideSrc.substring(17, 32)); 
    nextSlide(index+=1);
  })
}

function nextSlide(newIndex) {
  let carousel = myModal.classList.contains("show") ? modalMain : mainShoe;
  let carouselArray = myModal.classList.contains("show") ? modalThumbnailArray : mainThumbnailArray;

  if (newIndex < 0) {
    index = imageArray.length - 1; 
  } else if (newIndex > imageArray.length - 1) {
    index = 0; 
  } else {
    index = newIndex;
  }
  carousel.src = `../assets/images/${imageArray[index].title}.jpg`;
  carousel.alt = imageArray[index].alt;
  thumbnailSrc = `../assets/images/${imageArray[index].title}-thumbnail.jpg`;

  for (let thumbnail of carouselArray) {
      thumbnail.parentElement.classList.add("add-clear-outline");
      thumbnail.parentElement.classList.remove("add-orange-outline");
      thumbnail.classList.remove("less-opaque");
    if (thumbnail.getAttribute("src") === thumbnailSrc) {
      thumbnail.parentElement.classList.remove("add-clear-outline");
      thumbnail.parentElement.classList.add("add-orange-outline");
      thumbnail.classList.add("less-opaque");
    }
  }
}

for (let thumbnail of mainThumbnailArray) {
  thumbnail.addEventListener("click", function() {
    highlightShoe(thumbnail);
  })
}

function highlightShoe(clickedThumbnail) {
  let highlightedShoe = myModal.classList.contains("show") ? modalMain : mainShoe;
  let targetArray = myModal.classList.contains("show") ? modalThumbnailArray : mainThumbnailArray;
  highlightedShoe.src = `${(clickedThumbnail.getAttribute("src")).substring(0, 32)}.jpg`;
  imageArray.forEach(image => {
    if (image.title === (clickedThumbnail.getAttribute("src")).substring(17, 32)) {
      highlightedShoe.alt = image.alt;
    }
  })

  for (let thumbnail of targetArray) {
    thumbnail.classList.remove("less-opaque");
    thumbnail.parentElement.classList.remove("add-orange-outline");
    thumbnail.parentElement.classList.add("add-clear-outline");
  }
  imageArray.forEach(image => {
    if (image.title === (clickedThumbnail.getAttribute("src")).substring(17, 32)) {
      clickedThumbnail.parentElement.classList.remove("add-clear-outline");
      console.log("added");
      clickedThumbnail.parentElement.classList.add("add-orange-outline");
      clickedThumbnail.classList.add("less-opaque");
    } 
  })
}

// TO DO 
// - review and delete - can we do it better? 
if(window.innerWidth < 768) {
  document.querySelector(".main-image").removeAttribute("data-bs-toggle");
}
window.addEventListener("resize", function () {
  window.innerWidth >= 768 ? document.querySelector(".main-image").setAttribute("data-bs-toggle", "modal") : document.querySelector(".main-image").removeAttribute("data-bs-toggle");
});

mainShoe.addEventListener("click", function() {
console.log(getComputedStyle(document.body).getPropertyValue("display-none"));
  shoeInModal(mainShoe);
})

function shoeInModal(clickedShoe) {
  modalMain.src = clickedShoe.getAttribute("src"); 
  let newThumbnailSrc = `../assets/images/${(clickedShoe.getAttribute("src")).substring(17, 32)}-thumbnail.jpg`;
  for (let thumbnail of modalThumbnailArray) {
    if (thumbnail.getAttribute("src") === newThumbnailSrc) {
      thumbnail.parentElement.classList.add("add-orange-outline");
      thumbnail.classList.add("less-opaque");
    }
  }
} 

for (let modalThumbnail of modalThumbnailArray ) {
  modalThumbnail.addEventListener("click", function() {
  highlightShoe(modalThumbnail);
})
}

myModal.addEventListener('hidden.bs.modal', function () {
  // carouselItem.classList.remove("active");
  for (let modal of modalThumbnailArray) {
    modal.parentElement.removeAttribute("style");
    modal.style.opacity="1";
    modal.removeAttribute("style");
  }
})
