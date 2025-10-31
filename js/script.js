const hamburguesa = document.getElementById("hamb");
const nav = document.getElementById("nav");
const visCel = document.getElementById("vis-cel");

hamburguesa.addEventListener("click", () => {
  nav.classList.toggle("active");
});

visCel.addEventListener("click", () => {
  visCel.classList.toggle("active");
})

const carousels = document.querySelectorAll('.carrusel-animes');

carousels.forEach(carousel => {
  const items = carousel.querySelectorAll('.articulo-anime');

  function updateActiveItems() {
    const rect = carousel.getBoundingClientRect();
    const carouselCenter = rect.left + rect.width / 2;

    // Calculamos la distancia de cada item al centro
    const distances = Array.from(items).map(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(carouselCenter - itemCenter);
      return { item, distance };
    });

    // Ordenamos por distancia y tomamos los 6 más cercanos
    distances.sort((a, b) => a.distance - b.distance);
    const activeItems = distances.slice(0, 6).map(d => d.item);

    // Aplicamos clases
    items.forEach(item => {
      if (activeItems.includes(item)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  carousel.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveItems);
  });

  window.addEventListener('resize', updateActiveItems);
  updateActiveItems();
});

const carousel = document.querySelector('.container-music-videos');
const slides = document.querySelectorAll('.music-slide');

function updateActiveSlides() {
  const rect = carousel.getBoundingClientRect();

  slides.forEach(slide => {
    const slideRect = slide.getBoundingClientRect();
    const slideCenter = slideRect.left + slideRect.width / 2;
    const carouselCenter = rect.left + rect.width / 2;

    const distance = Math.abs(carouselCenter - slideCenter);
    const threshold = slideRect.width / 2;

    if (distance < threshold) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

carousel.addEventListener('scroll', () => {
  requestAnimationFrame(updateActiveSlides);
});
updateActiveSlides();