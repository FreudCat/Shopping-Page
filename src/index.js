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

// TODO 
// - find way to reuse the shortened titles and - maybe not even src or even the array itself since the images are already labeled as 1 - 4.   
const imageArray = [
  {
    title: "image-product-1",
    src: "../assets/images/image-product-1.jpg"
  }, 
  {
    title: "image-product-2",
    src: "../assets/images/image-product-2.jpg"
  }, 
  {
    title: "image-product-3",
    src: "../assets/images/image-product-3.jpg"
  }, 
  {
    title: "image-product-4",
    src: "../assets/images/image-product-4.jpg"
  }, 
  {
    title: "image-product-1-thumbnail",
    src: "../assets/images/image-product-1-thumbnail.jpg"
  }, 
  {
    title: "image-product-2-thumbnail",
    src: "../assets/images/image-product-2-thumbnail.jpg"
  }, 
  {
    title: "image-product-3-thumbnail",
    src: "../assets/images/image-product-3-thumbnail.jpg"
  }, 
  {
    title: "image-product-4-thumbnail",
    src: "../assets/images/image-product-4-thumbnail.jpg"
  }
];

// localStorage.clear();

// Items populated on page load 
// better to use Int than floats in JS since there's room for error, unless it's specific for the calcluations. If decimals are needed for display, add the decimals there. 
const currentPrice = 125.00; 
document.querySelector(".set-price").innerHTML = currentPrice.toFixed(2);
const sale = "50%";
document.querySelector(".sale-tag").innerHTML = sale;
const previousPrice = `$250.00`; 
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
    if (myModal.classList.contains("show")) {
      currentSlideSrc=modalMain.getAttribute("src");
    } else {
      currentSlideSrc=mainShoe.getAttribute("src");
    }
    index = imageArray.findIndex( image => image.src === currentSlideSrc); 
    nextSlide(index-=1);
  })
}

for (let nextButton of carouselNext) {
  nextButton.addEventListener("click", function() {
    if (myModal.classList.contains("show")) {
      currentSlideSrc=modalMain.getAttribute("src");
    } else {
      currentSlideSrc=mainShoe.getAttribute("src");
    }
    index = imageArray.findIndex( image => image.src === currentSlideSrc); 
    nextSlide(index+=1);
  })
}

// use ternary operator for the if/else here 
function nextSlide(newIndex) {
  let carousel = "";
  let carouselArray = "";
  if (myModal.classList.contains("show")) {
    carousel = modalMain;
    carouselArray = modalThumbnailArray;
  } else {
    carousel = mainShoe;
    carouselArray=mainThumbnailArray;
  }
  // rule - no "magic numbers" - ex. where did this "3" come from? 
  if (newIndex < 0) {
    index = 3; 
  } else if (newIndex > 3) {
    index = 0; 
  } else {
    index = newIndex;
  }
  carousel.src = imageArray[index].src;
  thumbnailSrc = `../assets/images/${imageArray[index].title}-thumbnail.jpg`;

  for (let thumbnail of carouselArray) {
    if (myModal.classList.contains("show")) {
      thumbnail.parentElement.removeAttribute("style");
    } else {
      thumbnail.parentElement.style.ouline="2px solid transparent";
    }
    thumbnail.style.opacity="1";
    thumbnail.removeAttribute("style");
    if (thumbnail.getAttribute("src") === thumbnailSrc) {
      thumbnail.parentElement.style.outline = "2px solid hsl(26, 100%, 55%)";
      thumbnail.style.opacity="0.3";
    }
  }
}

// TODO
// - remove the .style.whatever and use classList and classes from the SCSS - separates them out so that you can change the scss and it will still work in the functionjs without having to rebuild the js. At that point if you just change the SCSS then it changes without the rebuild. 


for (let thumbnail of mainThumbnailArray) {
  thumbnail.addEventListener("click", function() {
    highlightShoe(thumbnail);
  })
}

function highlightShoe(clickedThumbnail) {
  let highlightedShoe = "";
  let targetArray = [];
  if (myModal.classList.contains("show")) {
    highlightedShoe = modalMain; 
    targetArray = modalThumbnailArray;
  } else {
    targetArray = mainThumbnailArray;
    highlightedShoe = mainShoe;
  }

  for (let thumbnail of targetArray) {
    if (myModal.classList.contains("show")) {
      thumbnail.parentElement.removeAttribute("style");
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
  imageArray.forEach(image => {
    if (truncatedTitle === image.title) {
      highlightedShoe.src = image.src;
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
  let newThumbnailSrc = "";
  imageArray.forEach(image => {
    if (clickedShoe.getAttribute("src") === image.src) {
      modalMain.parentElement.classList.add("active");
      modalMain.src = image.src;
      newThumbnailSrc = `../assets/images/${image.title}-thumbnail.jpg`;
    }
  })
  for (let thumbnail of modalThumbnailArray) {
    if (thumbnail.getAttribute("src") === newThumbnailSrc) {
      thumbnail.parentElement.style.outline = "2px solid hsl(26, 100%, 55%)";
      thumbnail.style.opacity="0.3";
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


