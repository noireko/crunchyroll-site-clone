const hamburguesa = document.getElementById("hamb");
const nav = document.getElementById("nav");
const visCel = document.getElementById("vis-cel");

hamburguesa.addEventListener("click", () => {
  nav.classList.toggle("active");
});

visCel.addEventListener("click", () => {
  visCel.classList.toggle("active");
})

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carrusel-animes');

  carousels.forEach(carousel => {
    const items = carousel.querySelectorAll('.articulo-anime');
    const seccion = carousel.closest('.seccion-genero-carru');
    if (!seccion) return;

    const btnPrev = seccion.querySelector('.btn-prev');
    const btnNext = seccion.querySelector('.btn-next');
    if (!btnPrev || !btnNext) return;

    // ----------------------------
    // FUNCIONES AUXILIARES
    // ----------------------------

    function updateActiveItems() {
      const rect = carousel.getBoundingClientRect();
      const carouselCenter = rect.left + rect.width / 2;

      const distances = Array.from(items).map(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(carouselCenter - itemCenter);
        return { item, distance };
      });

      distances.sort((a, b) => a.distance - b.distance);
      const activeItems = distances.slice(0, 6).map(d => d.item);

      items.forEach(item => {
        if (activeItems.includes(item)) item.classList.add('active');
        else item.classList.remove('active');
      });
    }

    function getDesplazamiento() {
      if (!items.length) return carousel.clientWidth * 0.8;
      const itemWidth = items[0].getBoundingClientRect().width;
      const visibleCount = Math.max(1, Math.floor(carousel.clientWidth / itemWidth));
      return Math.round(itemWidth * visibleCount);
    }

    // Actualiza visibilidad de las flechas
    function updateArrows() {
      const scrollLeft = carousel.scrollLeft;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      // margen pequeño para evitar errores por redondeo
      const margin = 10;

      if (scrollLeft <= margin) {
        btnPrev.style.opacity = "0";
        btnPrev.style.pointerEvents = "none";
      } else {
        btnPrev.style.opacity = "1";
        btnPrev.style.pointerEvents = "auto";
      }

      if (scrollLeft >= maxScroll - margin) {
        btnNext.style.opacity = "0";
        btnNext.style.pointerEvents = "none";
      } else {
        btnNext.style.opacity = "1";
        btnNext.style.pointerEvents = "auto";
      }
    }

    // ----------------------------
    // EVENTOS
    // ----------------------------

    carousel.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        updateActiveItems();
        updateArrows();
      });
    });

    window.addEventListener('resize', () => {
      updateActiveItems();
      updateArrows();
    });

    btnNext.addEventListener('click', e => {
      e.preventDefault();
      carousel.scrollBy({
        left: getDesplazamiento(),
        behavior: 'smooth'
      });
    });

    btnPrev.addEventListener('click', e => {
      e.preventDefault();
      carousel.scrollBy({
        left: -getDesplazamiento(),
        behavior: 'smooth'
      });
    });

    // ----------------------------
    // INICIALIZACIÓN
    // ----------------------------
    updateActiveItems();
    updateArrows();
  });
});

const carousel = document.querySelector('.container-music-videos');
const slides = document.querySelectorAll('.music-slide');
const videos = document.querySelectorAll('.container-video');

function isDesktop() {
  return window.innerWidth >= 1024;
}

// ===== Mobile =====
function updateActiveSlides() {
  if (isDesktop()) return;

  const rect = carousel.getBoundingClientRect();
  const carouselCenter = rect.left + rect.width / 2;

  slides.forEach(slide => {
    const slideRect = slide.getBoundingClientRect();
    const slideCenter = slideRect.left + slideRect.width / 2;
    const distance = Math.abs(carouselCenter - slideCenter);
    const threshold = slideRect.width / 2;

    if (distance < threshold) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

// ===== Desktop =====
function updateActiveVideos() {
  if (!isDesktop()) return;
  const carouselRect = carousel.getBoundingClientRect();

  videos.forEach(video => {
    const videoRect = video.getBoundingClientRect();
    const videoWidth = videoRect.width;

    const visibleLeft = Math.max(videoRect.left, carouselRect.left);
    const visibleRight = Math.min(videoRect.right, carouselRect.right);
    const visibleWidth = visibleRight - visibleLeft;

    if (visibleWidth >= videoWidth / 2) {
      video.classList.add('active');
    } else {
      video.classList.remove('active');
    }
  });
}

function updateCarousel() {
  updateActiveSlides();
  updateActiveVideos();
}

carousel.addEventListener('scroll', () => {
  requestAnimationFrame(updateCarousel);
});
window.addEventListener('resize', updateCarousel);

updateCarousel();