const items = document.querySelectorAll('.carousel-item');
const carousel = document.querySelector('.carousel');
let currentItem = 0;
const totalItems = items.length;

document.querySelector('.carousel-prev').addEventListener('click', () => {
  currentItem = (currentItem > 0) ? currentItem - 1 : totalItems - 1;
  updateCarousel();
});

document.querySelector('.carousel-next').addEventListener('click', () => {
  currentItem = (currentItem + 1) % totalItems;
  updateCarousel();
});

function updateCarousel() {
  const width = document.querySelector('.carousel-wrapper').offsetWidth;
  carousel.style.transform = `translateX(-${currentItem * width}px)`;
}

// Certifique-se de que o carrossel seja atualizado ao carregar a página
updateCarousel();

// Atualiza o carrossel ao redimensionar a janela
window.addEventListener('resize', updateCarousel);
