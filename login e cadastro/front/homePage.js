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

async function fetchPsychologists() {
  try {
    const response = await fetch('/psychologists'); // Fazendo a requisição à rota
    const psychologists = await response.json();

    const listElement = document.getElementById('psychologist-list');
    listElement.innerHTML = ''; // Limpa o conteúdo da lista antes de exibir os dados

    psychologists.forEach((psychologist) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${psychologist.name} - ${psychologist.specialty}`;
      listElement.appendChild(listItem);
    });
  } catch (error) {
    console.error('Erro ao buscar psicólogos:', error);
  }
}

// Chama a função ao carregar a página
window.onload = fetchPsychologists;


// Certifique-se de que o carrossel seja atualizado ao carregar a página
updateCarousel();

// Atualiza o carrossel ao redimensionar a janela
window.addEventListener('resize', updateCarousel);

// Função para buscar e exibir os psicólogos no carrossel
async function fetchPsicologos() {
  try {
      // Fazendo a requisição para a API que retorna os psicólogos
      const response = await fetch('http://localhost:3005/api/psicologos');
      const data = await response.json();

      if (data.success) {
          const psicologos = data.data; // Lista de psicólogos
          const carousel = document.getElementById('carousel');

          // Limpa o carrossel antes de adicionar novos itens
          carousel.innerHTML = '';

          // Itera sobre os psicólogos e cria os elementos HTML dinamicamente
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
          if (carousel.firstChild) {
              carousel.firstChild.classList.add('active');
          }
      } else {
          console.error("Erro ao buscar os psicólogos:", data.message);
      }
  } catch (error) {
      console.error("Erro na requisição:", error);
  }
}

// Chama a função ao carregar a página
window.onload = fetchPsicologos;
