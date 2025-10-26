// Funcionalidad de zoom para imágenes
function initImageZoom() {
  const zoomContainer = document.getElementById("main-image-container");
  const image = document.getElementById("modal-img");
  const overlay = document.getElementById("zoom-overlay");

  if (!zoomContainer || !image || !overlay) {
    console.log("Elementos de zoom no encontrados");
    return;
  }

  let isZoomed = false;

  // Zoom al hacer clic
  image.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!isZoomed) {
      zoomContainer.classList.add("zoomed");
      isZoomed = true;
      console.log("Zoom activado");
    } else {
      zoomContainer.classList.remove("zoomed");
      isZoomed = false;
      console.log("Zoom desactivado");
    }
  });

  // Seguir el cursor para el zoom
  zoomContainer.addEventListener("mousemove", function (e) {
    if (!isZoomed) return;

    const rect = zoomContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    image.style.transformOrigin = `${x}% ${y}%`;
  });

  // Salir del zoom al hacer clic fuera
  overlay.addEventListener("click", function () {
    zoomContainer.classList.remove("zoomed");
    isZoomed = false;
  });

  // Resetear zoom cuando cambie la imagen
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mut) {
      if (mut.type === "attributes" && mut.attributeName === "src") {
        zoomContainer.classList.remove("zoomed");
        isZoomed = false;
      }
    });
  });

  observer.observe(image, { attributes: true });
}
