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

const currentPrice = parseInt(document.querySelector(".set-price").getAttribute("data-price"));
const sale = document.querySelector(".sale-tag").getAttribute("data-sale");
const previousPrice = document.querySelector(".previous-price").getAttribute("data-previous-price"); 
document.querySelector(".set-price").innerHTML = currentPrice.toFixed(2);
document.querySelector(".sale-tag").innerHTML = sale;
document.querySelector(".previous-price").innerHTML = previousPrice;
addCartButton.removeAttribute("data-bs-toggle");

if (localStorage.length === 0 || (localStorage.getItem("stored-amount") == 0)) {
  checkoutRow.style.display = "none";
  emptyCartModal.style.display = "flex";
  hasItemsCartModal.style.display = "none";
  tempValue = 0; 
} else {  
  tempValue = parseInt(localStorage.getItem("stored-amount"));
  cartAmountHolder.style.display="flex";
  cartAmountHolder.innerHTML = tempValue;
  checkoutRow.style.display = "flex";
  emptyCartModal.style.display = "none";
  hasItemsCartModal.style.display = "flex";
  multiplier.innerHTML= tempValue;
  cartTotal.innerHTML = `$${(tempValue * currentPrice).toFixed(2)}`;
}

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

function updateCart(changeAmount) {
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
  thumbnailSrc = `../assets/images/${imageArray[index].title}-thumbnail.jpg`;

  for (let thumbnail of carouselArray) {
    if (myModal.classList.contains("show")) {
      thumbnail.parentElement.classList.add("add-clear-outline");
      thumbnail.parentElement.classList.remove("add-orange-outline");
    } 
    thumbnail.classList.add("opaque");
    thumbnail.removeAttribute("style");
    if (thumbnail.getAttribute("src") === thumbnailSrc) {
      thumbnail.parentElement.classList.add("add-orange-outline");
      thumbnail.classList.remove("opaque");
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

  for (let thumbnail of targetArray) {
    if (myModal.classList.contains("show")) {
      thumbnail.parentElement.classList.remove("less-opaque");
    } else {
      thumbnail.parentElement.style.outline="2px solid transparent";
    }
    thumbnail.style.opacity="1";
    thumbnail.removeAttribute("style");
  }
  let truncatedTitle = "";
  imageArray.forEach(image => {
    if (clickedThumbnail.getAttribute("src") === image.src) {
      truncatedTitle = (image.title).substring(0, 15);
      console.log(clickedThumbnail.parentElement);
      clickedThumbnail.parentElement.style.outline="2px solid hsl(26, 100%, 55%)";
      clickedThumbnail.style.opacity="0.3";
    } 
  })
}

// TO DO 
// - review and delete - can we do it better? 
if(window.innerWidth < 700) {
  document.querySelector(".main-image").removeAttribute("data-bs-toggle");
}
window.addEventListener("resize", function () {
  if (window.innerWidth > 700) {
    document.querySelector(".main-image").setAttribute("data-bs-toggle", "modal");
  } else {
    document.querySelector(".main-image").removeAttribute("data-bs-toggle");
  }
});

mainShoe.addEventListener("click", function() {
  shoeInModal(mainShoe);
})

function shoeInModal(clickedShoe) {
  modalMain.src = clickedShoe.getAttribute("src") 
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
  carouselItem.classList.remove("active");
  for (let modal of modalThumbnailArray) {
    modal.parentElement.removeAttribute("style");
    modal.style.opacity="1";
    modal.removeAttribute("style");
  }
})


