console.log("index.js ran");
const mainThumbnailArray = document.querySelectorAll(".thumbnail-shoe");
const mainShoe = document.querySelector(".main-image");
const carouselItem = document.querySelectorAll(".carousel-item");
const modalThumbnailArray= document.querySelectorAll(".modal-thumbnail");
const modalMain = document.querySelector(".modal-image");
const myModal = document.querySelector("#shoeModal");

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


let index = "";
document.querySelector(".carousel-control-prev").addEventListener("click", function() {
  if (myModal.classList.contains("show")) {
    currentSlideSrc=modalMain.getAttribute("src");
  } else {
    currentSlideSrc=mainShoe.getAttribute("src");
  }
  index = imageArray.findIndex( image => image.src === currentSlideSrc); 
  nextSlide(index-=1);
})

document.querySelector(".carousel-control-next").addEventListener("click", function() {
  if (myModal.classList.contains("show")) {
    currentSlideSrc=modalMain.getAttribute("src");
  } else {
    currentSlideSrc=mainShoe.getAttribute("src");
  }
  index = imageArray.findIndex( image => image.src === currentSlideSrc); 
  nextSlide(index+=1);
})

function nextSlide(newIndex) {
  let carousel = "";
  let carouselArray = "";
  if (myModal.classList.contains("show")) {
    carousel=modalMain;
    carouselArray = modalThumbnailArray;
  } else {
    carousel=mainShoe;
    carouselArray=mainThumbnailArray;
  }
  if (newIndex < 0) {
    index=3; 
  } else if (newIndex > 3) {
    index = 0; 
  } else {
    index = newIndex;
  }
  carousel.src = imageArray[index].src;
  thumbnailSrc = `../assets/images/${imageArray[index].title}-thumbnail.jpg`;

  for (let thumbnail of carouselArray) {
    thumbnail.parentElement.style.border="2px solid transparent";
    thumbnail.style.opacity="1";
    thumbnail.removeAttribute("style");
    if (thumbnail.getAttribute("src") === thumbnailSrc) {
      thumbnail.parentElement.style.border = "2px solid hsl(26, 100%, 55%)";
      thumbnail.style.opacity="0.3";
    }
  }
}


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
    thumbnail.parentElement.style.border="2px solid transparent";
    thumbnail.style.opacity="1";
    thumbnail.removeAttribute("style");
  }
  let truncatedTitle = "";
  imageArray.forEach(image => {
    if (clickedThumbnail.getAttribute("src") === image.src) {
      truncatedTitle = (image.title).substring(0, 15);
      console.log(clickedThumbnail.parentElement);
      clickedThumbnail.parentElement.style.border="2px solid hsl(26, 100%, 55%)";
      clickedThumbnail.style.opacity="0.3";
    } 
  })
  imageArray.forEach(image => {
    if (truncatedTitle === image.title) {
      highlightedShoe.src = image.src;
    }
  })
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

mainShoe.addEventListener("click", function() {
  console.log(mainShoe.getAttribute("src"));
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
      thumbnail.parentElement.style.border = "2px solid hsl(26, 100%, 55%)";
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
  for (let item of carouselItem) {
    item.classList.remove("active");
  }
  for (let divs of modalDiv) {
    divs.style.border="2px solid transparent";
  }
  for (let modal of modalThumbnailArray) {
      modal.style.opacity="1";
      modal.removeAttribute("style");
  }
})
