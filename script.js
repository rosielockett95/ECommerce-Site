const thumbs = document.querySelectorAll(".thumbnail");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let fullImages = [];

thumbs.forEach((thumb, index) => {
  fullImages.push(thumb.dataset.full);

  thumb.addEventListener("click", () => {
    currentIndex = index;
    popupImg.src = fullImages[currentIndex];
    popup.style.display = "flex";
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
});
