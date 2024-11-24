const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let interval;

// Update the slider position
function updateSlider(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
  updateDots(index);
}

// Update active dot
function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Show next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider(currentIndex);
}

// Show previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider(currentIndex);
}

// Handle dot click
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    currentIndex = parseInt(e.target.dataset.index);
    updateSlider(currentIndex);
  });
});

// Automatic slide transition
function startAutoSlide() {
  interval = setInterval(nextSlide, 3000);
}

// Pause on hover
slider.addEventListener('mouseenter', () => clearInterval(interval));
slider.addEventListener('mouseleave', startAutoSlide);

// Button click events
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Initialize
updateSlider(currentIndex);
startAutoSlide();

// Swipe functionality for touch devices
let startX = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) nextSlide();
  if (endX > startX + 50) prevSlide();
});
