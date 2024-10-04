const carousel = document.querySelector('.carousel');
let currentItem = 0;
let totalItems = 0;

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

// Função para buscar e exibir os psicólogos no carrossel
async function fetchPsicologos() {
  try {
    const response = await fetch('http://localhost:3005/api/psicologos');
    const data = await response.json();

    if (data.success) {
      const psicologos = data.data;
      carousel.innerHTML = ''; // Limpa o carrossel antes de adicionar novos itens
      totalItems = psicologos.length;

      psicologos.forEach(psicologo => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        carouselItem.innerHTML = `
          <div class="profile-card">
            <div class="profile-picture">
              <img src="../../loginImg.png" alt="Foto do Psicólogo ${psicologo.name}">
            </div>
            <div class="text">
              <h2 class="psychologist-name">${psicologo.name}</h2>
              <p class="psychologist-info">${psicologo.email}</p>
              <p class="psychologist-info">CPF: ${psicologo.cpf}</p>
            </div>
          </div>
        `;

        carousel.appendChild(carouselItem);
      });

      // Torna o primeiro item ativo
      updateCarousel();
    } else {
      console.error('Erro ao buscar os psicólogos:', data.message);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

// Chama a função ao carregar a página
window.onload = fetchPsicologos;

// Atualiza o carrossel ao redimensionar a janela
window.addEventListener('resize', updateCarousel);
