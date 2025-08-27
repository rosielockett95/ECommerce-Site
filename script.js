let mediaQuery = window.matchMedia("(max-width: 800px)");
const navBar = document.getElementById("nav");
const hamburgerMenu = document.getElementById("nav-menu");
const mobileNavMenu = document.getElementById("mobile-nav-menu");
const closeIcon = document.getElementById("close-icon");

if (mediaQuery.matches) {
  navBar.classList.add("hidden");
} else {
  navBar.classList.remove("hidden");
}

if (mediaQuery.matches) {
  hamburgerMenu.addEventListener("click", () => {
    mobileNavMenu.classList.remove("hidden");
  });
}

if (mediaQuery.matches) {
  closeIcon.addEventListener("click", () => {
    mobileNavMenu.classList.add("hidden");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const thumbs = document.querySelectorAll(".thumbnail");
  const thumbnailImages = document.getElementById("thumbnail-images");
  const popup = document.getElementById("popup");
  const popupDiv = document.querySelector(".popup-content");
  const popupImg = document.getElementById("popup-img");
  const closeBtn = document.getElementById("close");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const clone = thumbnailImages.cloneNode(true);
  const clonedImages = clone.querySelectorAll("img");

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
      closeBtn.addEventListener("click", () => {
        thumb.classList.remove("active");
      });
    });
  });

  thumbs.forEach((thumb, index) => {
    fullImages.push(thumb.dataset.full);

    thumb.addEventListener("click", () => {
      currentIndex = index;
      popupImg.src = fullImages[currentIndex];
      popup.style.display = "flex";
      popup.appendChild(clone);
      clone.classList.add("thumbnail-images-popup");
      clone.classList.add("thumbnail-images-popup:hover");
    });
  });

  clonedImages.forEach((clones, index) => {
    clones.addEventListener("click", () => {
      popupImg.src = bigImages[index];
    });
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + fullImages.length) % fullImages.length;
    popupImg.src = fullImages[currentIndex];
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % fullImages.length;
    popupImg.src = fullImages[currentIndex];
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    clone.classList.remove("thumbnail-images-popup");
    clone.classList.remove("thumbnail-images-popup:hover");
  });
});
