
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

