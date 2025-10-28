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

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;

      const distance = Math.abs(carouselCenter - itemCenter);
      const threshold = itemRect.width / 1.2;

      if (distance < threshold) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  carousel.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveItems);
  });

  // inicializar al cargar
  updateActiveItems();
});