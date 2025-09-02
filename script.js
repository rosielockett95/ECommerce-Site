window.addEventListener("DOMContentLoaded", () => {
  let mediaQuery = window.matchMedia("(max-width: 800px)");
  const navBar = document.getElementById("nav");
  const hamburgerMenu = document.getElementById("nav-menu");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavMenu = document.getElementById("mobile-nav-menu");
  const closeIcon = document.getElementById("close-icon");
  const thumbs = document.querySelectorAll(".thumbnail");
  const thumbnailImages = document.getElementById("thumbnail-images");
  const popup = document.getElementById("popup");
  const popups = document.querySelectorAll(".popup");
  const popupDiv = document.querySelector(".popup-content");
  const popupImg = document.getElementById("popup-img");
  const clone = thumbnailImages.cloneNode(true);
  const clonedImages = clone.querySelectorAll("img");
  const mainImage = document.getElementById("main-image");

  if (popups) {
    popups.forEach((popup) => {
      const buttons = popup.querySelectorAll("button");

      if (buttons) {
        buttons.forEach((button) => {
          button.addEventListener("click", carouselButtonEventHandler);
        });
      }
    });
  }

  function carouselButtonEventHandler(e) {
    const { target } = e;
    const button = target.closest("button");
    const direction = button.dataset.button;

    if (direction === "prev") {
      currentIndex = (currentIndex - 1 + fullImages.length) % fullImages.length;
      popupImg.src = fullImages[currentIndex];
    } else if (direction === "next") {
      currentIndex = (currentIndex + 1) % fullImages.length;
      popupImg.src = fullImages[currentIndex];
    } else if (direction === "close") {
      popup.style.display = "none";
      thumbs.forEach((thumb) => thumb.classList.remove("active"));
    }

    if (mediaQuery.matches) {
      // mobile
      const leftImage = document.querySelector(".left-image");
      leftImage.style.opacity = "0";
      setTimeout(() => {
        document.querySelector(".left-image").style.opacity = "1";
        mainImage.src = fullImages[currentIndex];
      }, 1000);
    }
  }

  function responsiveScreenSize() {
    const leftImage = document.querySelector(".left-image-container");
    const previousButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    if (mediaQuery.matches) {
      leftImage.appendChild(previousButton);
      leftImage.appendChild(nextButton);
      mobileNav.classList.remove("hidden");
      navBar.classList.add("hidden");
      hamburgerMenu.addEventListener("click", () => {
        mobileNavMenu.classList.add("open");
        closeIcon.addEventListener("click", () => {
          mobileNavMenu.classList.remove("open");
        });
      });
    } else {
      navBar.classList.remove("hidden");
      mobileNav.classList.add("hidden");
    }
  }

  responsiveScreenSize();
  mediaQuery.addEventListener("change", responsiveScreenSize);

  let currentIndex = 0;
  let fullImages = [];

  const bigImages = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg",
  ];

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      thumb.classList.add("active");
    });
  });

  thumbs.forEach((thumb, index) => {
    fullImages.push(thumb.dataset.full);

    thumb.addEventListener("click", () => {
      currentIndex = index;
      popupImg.src = fullImages[currentIndex];
      popup.style.display = "flex";
      popupDiv.appendChild(clone);
      clone.classList.add("thumbnail-images-popup");
      clone.classList.add("thumbnail-images-popup:hover");
    });
  });

  clonedImages.forEach((clones, index) => {
    clones.addEventListener("click", () => {
      popupImg.src = bigImages[index];
    });
  });
});

const shoppingCart = document.querySelector(".cart");
const addToCartButton = document.querySelector(".cart-button");
const cartContent = document.querySelector(".cart-text-content");
const cartImage = document.querySelector(".cart-image");

let cart = [];

function addToCart() {
  const mainContainer = document.querySelector(".cart-main-container");
  if (cart.length === 0) {
    cartImage.remove();
    cartContent.innerHTML = "Your cart is empty";
  }

  addToCartButton.addEventListener("click", () => {
    cart.push("Fall Limited Edition Sneakers");
    console.log(cart);
    if (cart.length >= 1) {
      cartContent.insertAdjacentElement("beforebegin", cartImage);
      cartContent.innerHTML = `<p>Fall Limited Edition Sneakers</p><p> $125 x ${
        cart.length
      }<strong> $${cart.length * 125}</strong></p>`;
    }
  });
}

const deleteButton = document.querySelector(".delete-button");

deleteButton.addEventListener("click", () => {
  cart.length--;
  if (cart.length >= 1) {
    cartContent.innerHTML = `<p>Fall Limited Edition Sneakers</p><p> $125 x ${
      cart.length
    }<strong> $${cart.length * 125}</strong></p>`;
  } else if (cart.length === 0) {
    cartImage.remove();
    cartContent.innerHTML = "Your cart is empty";
  }
});

document
  .querySelector(".cart")
  .addEventListener("click", () =>
    document.querySelector(".mobile-cart-pop-up").classList.remove("hidden")
  );

addToCart();
