// blusas-app.js - Funcionalidad específica para la página de blusas

// Función de utilidad para padding
function pad(n) {
  return String(n).padStart(3, "0");
}

// Función mejorada para convertir hex a nombres de colores comprensibles
function hexToColorName(hex) {
  if (!hex || !hex.startsWith("#")) return "Color Personalizado";

  // Convertir hex a RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculamos distancia para mejor precisión
  function calculateDistance(color1, color2) {
    return Math.sqrt(
      Math.pow(color1[0] - color2[0], 2) +
        Math.pow(color1[1] - color2[1], 2) +
        Math.pow(color1[2] - color2[2], 2)
    );
  }

  // Colores específicos con sus valores RGB exactos
  const specificColors = [
    // Blancos y cremas
    { rgb: [255, 255, 255], name: "Blanco", threshold: 20 },
    { rgb: [248, 248, 255], name: "Blanco Fantasma", threshold: 15 },
    { rgb: [245, 245, 220], name: "Beige", threshold: 25 },
    { rgb: [255, 228, 196], name: "Crema", threshold: 30 },
    { rgb: [240, 230, 210], name: "Cremita", threshold: 30 },
    { rgb: [255, 239, 213], name: "Papaya", threshold: 25 },

    // Negros y grises
    { rgb: [0, 0, 0], name: "Negro", threshold: 30 },
    { rgb: [47, 79, 79], name: "Gris Pizarra Oscuro", threshold: 25 },
    { rgb: [105, 105, 105], name: "Gris Oscuro", threshold: 30 },
    { rgb: [128, 128, 128], name: "Gris", threshold: 30 },
    { rgb: [169, 169, 169], name: "Gris Oscuro", threshold: 25 },
    { rgb: [192, 192, 192], name: "Plata", threshold: 25 },
    { rgb: [211, 211, 211], name: "Gris Claro", threshold: 25 },

    // Marrones - MUY ESPECÍFICOS
    { rgb: [139, 69, 19], name: "Marrón Silla", threshold: 30 },
    { rgb: [160, 82, 45], name: "Marrón Silla", threshold: 25 },
    { rgb: [205, 133, 63], name: "Perú", threshold: 30 },
    { rgb: [222, 184, 135], name: "Marrón Claro", threshold: 35 },
    { rgb: [210, 180, 140], name: "Bronceado", threshold: 30 },
    { rgb: [188, 143, 143], name: "Rosa Marrón", threshold: 25 },
    { rgb: [165, 42, 42], name: "Marrón", threshold: 25 },

    // Rojos específicos
    { rgb: [128, 0, 0], name: "Rojo Vino", threshold: 30 },
    { rgb: [139, 0, 0], name: "Rojo Oscuro", threshold: 25 },
    { rgb: [178, 34, 34], name: "Rojo Ladrillo", threshold: 25 },
    { rgb: [220, 20, 60], name: "Carmesí", threshold: 30 },
    { rgb: [255, 0, 0], name: "Rojo", threshold: 30 },
    { rgb: [255, 69, 0], name: "Rojo Naranja", threshold: 25 },
    { rgb: [255, 99, 71], name: "Tomate", threshold: 25 },
    { rgb: [255, 160, 122], name: "Salmón Claro", threshold: 25 },

    // Azules específicos
    { rgb: [0, 0, 128], name: "Azul Marino", threshold: 30 },
    { rgb: [0, 0, 139], name: "Azul Oscuro", threshold: 25 },
    { rgb: [0, 0, 205], name: "Azul Medio", threshold: 25 },
    { rgb: [0, 0, 255], name: "Azul", threshold: 30 },
    { rgb: [30, 144, 255], name: "Azul Dodger", threshold: 25 },
    { rgb: [135, 206, 235], name: "Azul Cielo", threshold: 25 },
    { rgb: [173, 216, 230], name: "Azul Claro", threshold: 25 },

    // Verdes específicos
    { rgb: [0, 100, 0], name: "Verde Oscuro", threshold: 30 },
    { rgb: [0, 128, 0], name: "Verde", threshold: 30 },
    { rgb: [34, 139, 34], name: "Verde Bosque", threshold: 25 },
    { rgb: [50, 205, 50], name: "Verde Lima", threshold: 25 },
    { rgb: [144, 238, 144], name: "Verde Claro", threshold: 25 },
    { rgb: [152, 251, 152], name: "Verde Pálido", threshold: 25 },

    // Amarillos
    { rgb: [255, 255, 0], name: "Amarillo", threshold: 30 },
    { rgb: [255, 215, 0], name: "Dorado", threshold: 25 },
    { rgb: [255, 228, 181], name: "Mocasín", threshold: 25 },

    // Morados
    { rgb: [128, 0, 128], name: "Morado", threshold: 30 },
    { rgb: [75, 0, 130], name: "Índigo", threshold: 25 },
    { rgb: [138, 43, 226], name: "Violeta Azul", threshold: 25 },
    { rgb: [221, 160, 221], name: "Ciruela", threshold: 25 },

    // Naranjas
    { rgb: [255, 165, 0], name: "Naranja", threshold: 30 },
    { rgb: [255, 140, 0], name: "Naranja Oscuro", threshold: 25 },
    { rgb: [255, 218, 185], name: "Melocotón", threshold: 25 },
  ];

  // Buscar el color más cercano
  let closestColor = null;
  let minDistance = Infinity;

  for (const color of specificColors) {
    const distance = calculateDistance([r, g, b], color.rgb);
    if (distance <= color.threshold && distance < minDistance) {
      closestColor = color.name;
      minDistance = distance;
    }
  }

  if (closestColor) return closestColor;

  // Si no encuentra coincidencia exacta, usar lógica genérica mejorada
  const brightness = (r + g + b) / 3;

  // Colores muy claros (posibles cremas/blancos)
  if (brightness > 230) {
    if (r > 240 && g > 235 && b > 220) return "Cremita";
    if (r > g && r > b && r - g < 30 && r - b < 30) return "Rosa Claro";
    return "Muy Claro";
  }

  // Colores muy oscuros
  if (brightness < 50) {
    return "Muy Oscuro";
  }

  // Lógica de color dominante mejorada
  const maxVal = Math.max(r, g, b);
  const minVal = Math.min(r, g, b);
  const diff = maxVal - minVal;

  // Si es muy gris (poca diferencia entre componentes)
  if (diff < 30) {
    if (brightness > 180) return "Gris Claro";
    if (brightness > 120) return "Gris";
    return "Gris Oscuro";
  }

  // Color dominante
  if (r === maxVal && g > b) {
    if (r > 200 && g > 150) return "Amarillo";
    if (r > 200) return "Naranja";
    return "Rojo";
  }
  if (r === maxVal) return "Rojo";
  if (g === maxVal) return "Verde";
  if (b === maxVal) return "Azul";

  return "Color Personalizado";
}

// Colores disponibles para blusas
const colorKeys = [
  "azul",
  "blanco",
  "rojo",
  "negro",
  "rojo vino",
  "amarillo-dorado",
  "rosado claro",
  "naranja",
];

// Generar productos específicos para blusas (049-064)
const products = [];
for (let i = 49; i <= 64; i++) {
  const id = pad(i);
  const images = { default: `Images/${id}/${id}.jpg` };
  products.push({
    id,
    name: `Blusa ${id}`,
    code: `FM-00${id}`,
    price: { retail: 450, dozen: 375 }, // precios por defecto - solo dos niveles
    images,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  });
}

// Aplicar precios y nombres específicos para blusas
function applySpecificPrices() {
  const specificPrices = {
    // Blusas FM-00049 a FM-00064
    "049": { retail: 450, dozen: 375 },
    "050": { retail: 300, dozen: 275 },
    "051": { retail: 450, dozen: 375 },
    "052": { retail: 350, dozen: 300 },
    "053": { retail: 350, dozen: 300 },
    "054": { retail: 550, dozen: 550 },
    "055": { retail: 450, dozen: 375 },
    "056": { retail: 450, dozen: 450 },
    "057": { retail: 450, dozen: 375 },
    "058": { retail: 450, dozen: 375 },
    "059": { retail: 450, dozen: 375 },
    "060": { retail: 450, dozen: 375 },
    "061": { retail: 350, dozen: 300 },
    "062": { retail: 350, dozen: 300 },
    "063": { retail: 300, dozen: 250 },
    "064": { retail: 500, dozen: 500 },
  };

  Object.entries(specificPrices).forEach(([productId, prices]) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      product.price = prices;
    }
  });

  // Aplicar nombres específicos
  const specificNames = {
    "049": "Blusa doble vuelo abajo",
    "050": "Blusa manga corta (canelito)",
    "051": "Blusa 3 vuelos",
    "052": "Blusa goma en la manga (micro)",
    "053": "Blusa goma en la manga (canelito)",
    "054": "Blusa doble vuelo y lazo (Seúl)",
    "055": "Blusa manga larga con tachones, cuello bajito",
    "056": "Blusa doble vuelo y lazo (Liverpool)",
    "057": "Blusa cuello V, vuelo, lazo y mangas arruchadas",
    "058": "Blusa manga ancha y tachones",
    "059": "Blusa gota de agua y vuelo",
    "060": "Blusa tachones, lazo y vuelo",
    "061": "Blusa manga corta tachones",
    "062": "Blusa manga larga, cuello, tachones",
    "063": "Blusa mangas arruchadas (canelito)",
    "064": "Blusa mangas arruchadas (punto escuba, Seúl)",
  };

  Object.entries(specificNames).forEach(([productId, name]) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      product.name = name;
    }
  });
}

// Aplicar precios específicos después de crear los productos
applySpecificPrices();

// Variables globales
let cart = [];
let currentProduct = null;
let selectedColor = "default";
let selectedColorHex = "#e0e0e0";
let isCustomColor = false;
let selectedSize = null;
let quantity = 1;
let searchQuery = "";
// Navegación en modal (blusas)
let visibleProductIds = [];
let currentIndexInVisible = -1;
let modalKeydownAttached = false;
// Estado para auto-ejecutar acción después de completar color+talla
let __autoAddAfterValidation = false; // true cuando el usuario intentó añadir/comprar y faltaba color/talla
let __lastIntent = null; // 'add' | 'buy'

const colorMap = {
  azul: "#2563eb",
  blanco: "#ffffff",
  rojo: "#dc2626",
  negro: "#000000",
  "rojo vino": "#8b0000",
  "amarillo-dorado": "#fbbf24",
  "rosado claro": "#f9a8d4",
  naranja: "#ea580c",
};

const colorNames = {
  azul: "Azul",
  blanco: "Blanco",
  rojo: "Rojo",
  negro: "Negro",
  "rojo vino": "Rojo Vino",
  "amarillo-dorado": "Amarillo Dorado",
  "rosado claro": "Rosado Claro",
  naranja: "Naranja",
};

// ---- Búsqueda utilidades ----
function normalizeText(str) {
  try {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "");
  } catch (e) {
    return String(str || "").toLowerCase();
  }
}

function detectCategoryFromQuery(raw) {
  const q = normalizeText(raw);
  if (!q) return null;
  if (
    /(\bcrop\b|\bcrop\s*top\b|\bcrop\s*tops\b|\bcroptop\b|\bcroptops\b|\btop\b|\btops\b)/.test(
      q
    )
  )
    return "crop-tops";
  if (/(\bblusa\b|\bblusas\b)/.test(q)) return "blusas";
  if (/(\bvestido\b|\bvestidos\b)/.test(q)) return "vestidos";
  if (/(\bfalda\b|\bfaldas\b)/.test(q)) return "faldas";
  if (/(\bpantalon\b|\bpantalones\b)/.test(q)) return "pantalones";
  if (/(\bconjunto\b|\bconjuntos\b)/.test(q)) return "conjuntos";
  if (/(\benterizo\b|\benterizos\b)/.test(q)) return "enterizos";
  if (/(\bbody\b|\bbodys\b)/.test(q)) return "body";
  return null;
}

// Emoji por color (usa la clave de color, no el color hex personalizado)
function getColorEmoji(colorKey) {
  if (!colorKey) return "";
  // Si es un valor hex (empieza por '#'), considerarlo personalizado
  if (String(colorKey).startsWith("#")) return "🎨";
  const k = String(colorKey).toLowerCase();
  const map = {
    azul: "🔵",
    blanco: "⚪",
    rojo: "🔴",
    negro: "⚫",
    "rojo vino": "🍷",
    "amarillo-dorado": "🟡",
    "rosado claro": "🌸",
    naranja: "🟠",
  };
  return map[k] || "";
}

// Función para calcular precios
function calculatePrice(qty, basePrice, size = null) {
  if (!basePrice) return 0;

  let price;
  if (qty >= 12) price = basePrice.dozen;
  else price = basePrice.retail;

  // Recargo de 50 pesos para tallas XL, 2XL, 3XL
  if (size && (size === "XL" || size === "2XL" || size === "3XL")) {
    price += 50;
  }

  return price;
}

// Resto de funciones similares a crop-tops-app.js...
function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const q = normalizeText(searchQuery);
  const filteredProducts = products.filter((p) => {
    const hay = normalizeText(`${p.name} ${p.code} blusa blusas`);
    return q ? hay.includes(q) : true;
  });

  if (filteredProducts.length === 0) {
    grid.innerHTML =
      '<div class="empty-state">No se encontraron productos. Presiona Enter para buscar en otras categorías.</div>';
    return;
  }

  filteredProducts.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";
    // Guardar id para navegación
    div.dataset.id = product.id;

    const firstImage =
      (product.images &&
        (product.images.default ||
          product.images.blanco ||
          product.images[
            Object.keys(product.images).find((k) => k !== "default")
          ])) ||
      "";

    const retail = product.price?.retail ?? "-";
    const dozen = product.price?.dozen ?? retail;
    div.innerHTML = `
      <div class="product-card-minimal">
        <div class="product-image-wrapper">
          <img class="product-image-clean"
            src="${firstImage}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/300x300?text=Sin+imagen'">
          <div class="product-code-overlay">Código: ${product.code}</div>
        </div>
        <div class="product-info-minimal">
          <h3 class="product-name-clean">${product.name}</h3>
          <div class="product-pricing">
            <div class="price-main">
              <span class="price-amount">RD$${retail}</span>
              <span class="price-unit">c/u</span>
            </div>
            <div class="price-tiers">
              <div class="tier">Docena (12+): RD$${dozen}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Accesible y clickeable, igual que crop-tops
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.addEventListener("click", () => openModal(product.id));
    div.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        openModal(product.id);
      }
    });

    grid.appendChild(div);
  });

  // Guardar ids visibles para navegación
  visibleProductIds = filteredProducts.map((p) => p.id);
}

// Funciones de carrito y modal similares a crop-tops-app.js
function loadCart() {
  try {
    // Migración: si existe clave antigua, mergearla a la nueva y eliminarla
    const legacy = localStorage.getItem("fabricamayorista-cart");
    if (legacy) {
      try {
        const legacyItems = JSON.parse(legacy);
        if (Array.isArray(legacyItems) && legacyItems.length) {
          // Convertir estructura antigua a la nueva (qty/basePrice/colorKey)
          const migrated = legacyItems.map((it) => {
            const p = products.find((pr) => pr.id === it.id);
            const basePrice = p?.price || {
              retail: it.price || 0,
              dozen: it.price || 0,
            };
            return {
              id: it.id,
              name: it.name,
              code: it.code,
              basePrice,
              colorKey: it.colorHex || it.color || "default",
              colorDisplay: it.color || it.colorHex || "",
              colorHex: it.colorHex || null,
              size: it.size,
              qty: it.quantity || 1,
              image: null,
              imageOriginal: `Images/${it.id}/${it.id}.jpg`,
            };
          });
          const existing = JSON.parse(
            localStorage.getItem("fm_cart_v1") || "[]"
          );
          const merged = Array.isArray(existing)
            ? existing.concat(migrated)
            : migrated;
          localStorage.setItem("fm_cart_v1", JSON.stringify(merged));
        }
      } catch (e) {}
      // Borrar clave antigua
      localStorage.removeItem("fabricamayorista-cart");
    }

    const saved = localStorage.getItem("fm_cart_v1");
    cart = saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn("No se pudo cargar carrito desde localStorage", e);
    cart = [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("fm_cart_v1", JSON.stringify(cart));
  } catch (e) {
    console.warn("No se pudo guardar carrito en localStorage", e);
  }
}

function updateCartCount() {
  const totalItems = cart.reduce(
    (total, item) => total + (item.qty || item.quantity || 0),
    0
  );
  const headerBadge = document.getElementById("cart-badge-header");
  const fabBadge = document.getElementById("cart-badge");
  if (headerBadge) headerBadge.textContent = String(totalItems);
  if (fabBadge) fabBadge.textContent = String(totalItems);
}

function openModal(productId) {
  currentProduct = products.find((p) => p.id === productId);
  if (!currentProduct) return;

  selectedColor = "default";
  selectedColorHex = "#e0e0e0";
  isCustomColor = false;
  selectedSize = null;
  quantity = 1;
  __autoAddAfterValidation = false;
  __lastIntent = null;

  const modal = document.getElementById("product-modal");
  if (!modal) {
    createModal();
    return openModal(productId);
  }

  updateModalContent();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Fijar índice actual y listeners de teclado
  currentIndexInVisible = Math.max(
    0,
    visibleProductIds.findIndex((pid) => pid === currentProduct.id)
  );
  if (!modalKeydownAttached) {
    modalKeydownAttached = true;
    window.addEventListener("keydown", onModalKeydown);
  }
}

function onModalKeydown(e) {
  const modal = document.getElementById("product-modal");
  if (!modal || !modal.classList.contains("active")) return;
  if (e.key === "ArrowLeft") navigateModal(-1);
  else if (e.key === "ArrowRight") navigateModal(1);
}

function navigateModal(delta) {
  if (!Array.isArray(visibleProductIds) || visibleProductIds.length === 0)
    return;
  if (currentIndexInVisible < 0) {
    currentIndexInVisible = Math.max(
      0,
      visibleProductIds.findIndex(
        (pid) => pid === (currentProduct && currentProduct.id)
      )
    );
  }
  let nextIndex = currentIndexInVisible + delta;
  if (nextIndex < 0) nextIndex = visibleProductIds.length - 1;
  if (nextIndex >= visibleProductIds.length) nextIndex = 0;
  const nextId = visibleProductIds[nextIndex];
  const nextProduct = products.find((p) => p.id === nextId);
  if (!nextProduct) return;

  currentProduct = nextProduct;
  selectedColor = "default";
  selectedColorHex = "#e0e0e0";
  isCustomColor = false;
  selectedSize = null;
  quantity = 1;
  currentIndexInVisible = nextIndex;

  // Re-renderizar contenido del modal
  updateModalContent();
  updateModalPrice();
  setTimeout(() => {
    const imgEl = document.getElementById("modal-img");
    if (imgEl && typeof initImageZoom === "function") initImageZoom();
  }, 50);
}

function createModal() {
  const modalHTML = `
    <div id="product-modal" class="modal">
      <div class="modal-content-professional">
        <button class="modal-close" id="modal-close">×</button>
        
        <!-- Lado izquierdo: Imagen y controles -->
        <div class="modal-left-section">
          <!-- Imagen del producto -->
          <div class="main-image-container" id="main-image-container">
            <img id="modal-img" src="" alt="Producto" class="main-image"/>
          </div>
          <!-- Navegación entre artículos debajo de la imagen -->
          <div class="image-nav-buttons">
            <button id="modal-prev" class="btn-nav-secondary" aria-label="Anterior">Anterior</button>
            <button id="modal-next" class="btn-nav-secondary" aria-label="Siguiente">Siguiente</button>
          </div>
          
          <!-- Título y código debajo de la foto -->
          <div class="left-title-block" style="margin: .75rem 0 1rem 0;">
            <h1 id="modal-name" class="product-title-zara" style="margin:0;font-size:1.1rem;"></h1>
            <div id="modal-code-display" class="product-code-zara" style="opacity:.8;font-size:.9rem;"></div>
          </div>
          
          <!-- Controles debajo de la imagen -->
          <div class="product-controls-left">
            <!-- Cantidad -->
            <div class="qty-section-left">
              <label class="control-label-left">CANTIDAD</label>
              <div class="qty-controls-left">
                <button class="qty-btn-left" id="qty-decrease">−</button>
                <span id="qty-display" class="qty-display-left">1</span>
                <button class="qty-btn-left" id="qty-increase">+</button>
              </div>
              <div class="price-display-left">
                <span id="current-price-left" class="current-price-left">RD$0 c/u</span>
                <span id="total-price-left" class="total-price-left">Total: RD$0</span>
              </div>
            </div>
            
            <!-- Botones de acción -->
            <div class="actions-left">
              <button class="btn-add-bag-left" id="add-to-cart-btn">
                AÑADIR A LA BOLSA
              </button>
              <button class="btn-whatsapp-left" id="buy-now-btn">
                COMPRAR POR WHATSAPP
              </button>
            </div>
          </div>
        </div>
        
        <!-- Lado derecho: Información del producto (sin encabezado de nombre/código para evitar duplicado) -->
        <div class="modal-product-details-zara">
          
          <!-- Precio principal removido por diseño -->
          <!-- (Se usa la tabla de PRECIOS para mostrar valores) -->
          
          <!-- Tabla de precios -->
          <div class="pricing-tiers-zara">
            <div class="pricing-title-zara">PRECIOS</div>
            <div class="tier-row">
              <span class="qty-text">Precio por unidad</span>
              <span id="price-retail" class="tier-price">RD$0</span>
            </div>
            <div class="tier-row">
              <span class="qty-text">Precio por docena</span>
              <span id="price-dozen" class="tier-price">RD$0</span>
            </div>
          </div>
          
          <!-- Selección de color -->
          <div class="selection-group-zara">
            <label class="selection-label-zara">COLOR</label>
            <div class="color-swatches-zara" id="color-swatches"></div>
            <div class="custom-color-section">
              <label class="custom-color-label">OTROS COLORES</label>
              <input type="color" id="custom-color-picker" class="custom-color-zara"/>
            </div>
            <div class="validation-error" id="color-error">Selecciona un color</div>
          </div>
          
          <!-- Selección de talla -->
          <div class="selection-group-zara">
            <label class="selection-label-zara">TALLA</label>
            <div id="size-options" class="size-options-zara"></div>
            <div class="size-note-zara">Tallas XL+ tienen recargo de +RD$50</div>
            <div class="validation-error" id="size-error">Selecciona una talla</div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");
  if (prevBtn) prevBtn.addEventListener("click", () => navigateModal(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => navigateModal(1));
}

function updateModalContent() {
  if (!currentProduct) return;

  // Actualizar información básica usando los IDs de crop-tops
  const nameEl = document.getElementById("modal-name");
  const codeEl = document.getElementById("modal-code-display");
  const imgEl = document.getElementById("modal-img");

  if (nameEl) nameEl.textContent = currentProduct.name;
  if (codeEl) codeEl.textContent = currentProduct.code;
  if (imgEl) imgEl.src = currentProduct.images.default;

  // Actualizar imagen según color seleccionado
  const img = document.getElementById("modal-img");
  if (selectedColor !== "default" && currentProduct.images[selectedColor]) {
    img.src = currentProduct.images[selectedColor];
  } else {
    img.src = currentProduct.images.default;
  }
  img.alt = currentProduct.name;

  // Fallback por si falta la imagen
  if (img) {
    img.onerror = function () {
      const fallback =
        (currentProduct.images && currentProduct.images.default) ||
        "https://via.placeholder.com/600x600?text=Sin+imagen";
      if (img.src !== fallback) img.src = fallback;
    };
  }

  // Zoom sobre la misma imagen (igual que crop-tops)
  const imageContainer = img ? img.parentElement : null;
  if (imageContainer && !imageContainer.dataset.zoomBound) {
    imageContainer.dataset.zoomBound = "1";
    imageContainer.addEventListener("click", function () {
      const isZoomed = imageContainer.classList.contains("zoomed");
      if (isZoomed) {
        imageContainer.classList.remove("zoomed");
        document.body.style.overflow = "";
      } else {
        imageContainer.classList.add("zoomed");
        document.body.style.overflow = "hidden";
      }
    });
  }

  // Cerrar modal al hacer click fuera del contenido (overlay)
  const overlay = document.getElementById("product-modal");
  if (overlay && !overlay.dataset.listenClose) {
    overlay.dataset.listenClose = "1";
    overlay.addEventListener("click", (e) => {
      if (e.target && e.target.id === "product-modal") closeModal();
    });
  }

  // Actualizar precios en los elementos existentes
  const retailPriceEl = document.getElementById("price-retail");
  const dozenPriceEl = document.getElementById("price-dozen");

  if (retailPriceEl)
    retailPriceEl.textContent = `RD$${currentProduct.price.retail}`;
  if (dozenPriceEl)
    dozenPriceEl.textContent = `RD$${currentProduct.price.dozen}`;

  // Siempre mostrar ambas filas: Precio por unidad y Precio por docena
  const pricingContainer = document.querySelector(".pricing-tiers-zara");
  if (pricingContainer) {
    pricingContainer.innerHTML = `
      <div class="pricing-title-zara">PRECIOS</div>
      <div class="tier-row">
        <span class="qty-text">Precio por unidad</span>
        <span id="price-retail" class="tier-price">RD$${currentProduct.price.retail}</span>
      </div>
      <div class="tier-row">
        <span class="qty-text">Precio por docena</span>
        <span id="price-dozen" class="tier-price">RD$${currentProduct.price.dozen}</span>
      </div>
    `;
  }

  updateColorSwatches();
  updateSizeOptions();
  updateModalPrice();
  setupModalEventListeners();
}

function updateColorSwatches() {
  const container = document.getElementById("color-swatches");
  if (!container) return;

  container.innerHTML = "";

  colorKeys.forEach((colorKey) => {
    const colorHex = colorMap[colorKey];
    const colorName = colorNames[colorKey];

    const swatch = document.createElement("button");
    swatch.className = "color-swatch";
    swatch.dataset.color = colorKey;
    swatch.style.backgroundColor = colorHex;
    swatch.title = colorName;
    swatch.addEventListener("click", () => selectColor(colorKey));

    if (selectedColor === colorKey) {
      swatch.classList.add("active");
    }

    container.appendChild(swatch);
  });
}

// (Eliminado duplicado de updateSizeOptions)

function setupModalEventListeners() {
  // Quantity controls
  const decreaseBtn = document.getElementById("qty-decrease");
  const increaseBtn = document.getElementById("qty-increase");

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => changeQty(-1));
  }
  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => changeQty(1));
  }

  // Add to cart button
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      __lastIntent = "add";
      addToCartFromModal();
    });
  }

  // Buy now button
  const buyNowBtn = document.getElementById("buy-now-btn");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      __lastIntent = "buy";
      buyNowFromModal();
    });
  }

  // Custom color picker
  const customColorPicker = document.getElementById("custom-color-picker");
  if (customColorPicker) {
    customColorPicker.addEventListener("change", (e) => {
      const customHex = e.target.value;
      selectColor("custom", true, customHex);
    });
  }

  // Close button
  const closeBtn = document.getElementById("modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
}

function changeQty(delta) {
  quantity = Math.max(1, quantity + delta);
  const qtyEl = document.getElementById("qty-display");
  if (qtyEl) qtyEl.textContent = quantity;
  updateModalPrice();
}

function updateModalPrice() {
  if (!currentProduct) return;
  const unit = calculatePrice(quantity, currentProduct.price, selectedSize);
  const total = unit * quantity;

  // Actualizar precios del lado izquierdo (como crop-tops)
  const currentPriceEl = document.getElementById("current-price-left");
  const totalPriceEl = document.getElementById("total-price-left");

  if (currentPriceEl) currentPriceEl.textContent = `RD$${unit} c/u`;
  if (totalPriceEl) totalPriceEl.textContent = `Total: RD$${total}`;
}

async function buyNowFromModal() {
  // Intento de compra: si faltan selecciones, activar auto flujo y guiar
  __lastIntent = __lastIntent || "buy";
  if (!currentProduct) return;
  const missingColor = !selectedColor || selectedColor === "default";
  const missingSize = !selectedSize;
  if (missingColor || missingSize) {
    __autoAddAfterValidation = true;
    if (missingColor) {
      showAlert("Por favor selecciona un color", [
        {
          label: "Elegir color",
          action: () => {
            const el = document.getElementById("color-swatches");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          },
        },
      ]);
    } else if (missingSize) {
      const actions = (currentProduct.sizes || []).map((s) => ({
        label: s,
        action: () =>
          selectSize(
            s,
            Array.from(document.querySelectorAll(".size-btn")).find(
              (b) => (b.textContent || "").trim() === s
            )
          ),
      }));
      showAlert("Selecciona tu talla", actions);
    }
    return;
  }

  // Cerrar modal y carrito para que se vea el formulario del cliente
  try {
    closeModal();
  } catch (e) {}
  try {
    closeCart();
  } catch (e) {}

  const customer = await collectCustomerInfo();
  if (customer === null) return;

  const colorKey = isCustomColor ? selectedColorHex : selectedColor;
  const colorDisplay = isCustomColor
    ? hexToColorName(selectedColorHex)
    : colorNames[selectedColor] || selectedColor;

  const unitPrice = calculatePrice(
    quantity,
    currentProduct.price,
    selectedSize
  );
  const subtotal = unitPrice * quantity;
  const savings = (currentProduct.price.retail - unitPrice) * quantity;
  const tierText =
    quantity >= 12 ? "DOCENA" : quantity >= 3 ? "MAYOR" : "DETALLE";

  const orderId = generateOrderId();
  const now = new Date();
  const dateStr = now.toLocaleString();

  let message = `COMPRA DIRECTA - FabricaMayorista\n`;
  message += `Pedido: ${orderId}\n`;
  message += `Fecha: ${dateStr}\n`;
  if (customer && customer.name) message += `Cliente: ${customer.name}\n`;
  if (customer && customer.city) message += `Ciudad: ${customer.city}\n`;
  message += `------------------------------\n\n`;
  message += `*${currentProduct.name}*\n`;
  message += `Código: ${currentProduct.code}\n`;
  message += `Talla: ${selectedSize}\n`;
  message += `Color: ${colorDisplay}\n`;
  message += `Cantidad: ${quantity} un. [${tierText}]\n`;
  message += `Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
  message += `Subtotal: RD$${subtotal.toFixed(2)}\n`;
  if (savings > 0) message += `Ahorro: RD$${savings.toFixed(2)}\n`;
  message += `\nTOTAL: RD$${subtotal.toFixed(2)}\n\n`;
  message += `Precios mayoristas desde 3 unidades\n`;
  message += `Envíos a toda República Dominicana`;

  const waUrl = `https://wa.me/18093027761?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");
}

function updateColorOptions() {
  const container = document.getElementById("color-options");
  if (!container || !currentProduct) return;

  container.innerHTML = "";

  // Agregar opción por defecto
  const defaultOption = document.createElement("div");
  defaultOption.className =
    "color-option-zara" + (selectedColor === "default" ? " selected" : "");
  defaultOption.style.backgroundColor = "#e0e0e0";
  defaultOption.title = "Color por defecto";
  defaultOption.onclick = () => selectColor("default", "#e0e0e0");
  container.appendChild(defaultOption);

  // Agregar colores disponibles si existen imágenes específicas
  if (currentProduct.images) {
    colorKeys.forEach((colorKey) => {
      if (currentProduct.images[colorKey]) {
        const colorOption = document.createElement("div");
        colorOption.className =
          "color-option-zara" + (selectedColor === colorKey ? " selected" : "");
        colorOption.style.backgroundColor = colorMap[colorKey] || "#ccc";
        colorOption.title = colorNames[colorKey] || colorKey;
        colorOption.onclick = () => selectColor(colorKey, colorMap[colorKey]);
        container.appendChild(colorOption);
      }
    });
  }

  // Botón de color personalizado
  const customButton = document.createElement("div");
  customButton.className =
    "color-option-zara custom-color-btn" + (isCustomColor ? " selected" : "");
  customButton.innerHTML = "🎨";
  customButton.title = "Color personalizado";
  customButton.onclick = () =>
    document.getElementById("custom-color-picker").click();
  container.appendChild(customButton);
}

function updateSizeOptions() {
  const container = document.getElementById("size-options");
  if (!container || !currentProduct) return;

  container.innerHTML = "";
  currentProduct.sizes.forEach((size) => {
    const btn = document.createElement("button");
    btn.className = "size-btn";
    btn.textContent = size;
    btn.addEventListener("click", () => selectSize(size, btn));

    if (selectedSize === size) btn.classList.add("active");

    container.appendChild(btn);
  });
}

function selectColor(color, custom = false, hexValue = null) {
  selectedColor = color;
  isCustomColor = custom;
  selectedColorHex = hexValue || colorMap[color] || "#e0e0e0";

  // Clear color validation error
  const colorError = document.getElementById("color-error");
  if (colorError) colorError.style.display = "none";

  // Actualizar imagen si hay una disponible para este color
  const imgEl = document.getElementById("modal-img");
  if (!custom && currentProduct.images && currentProduct.images[color]) {
    if (imgEl) imgEl.src = currentProduct.images[color];
  } else {
    if (imgEl) imgEl.src = currentProduct.images.default || "";
  }

  // Actualizar swatches
  updateColorSwatches();

  // Auto-ejecución si venimos de una advertencia
  try {
    const hasColor = selectedColor && selectedColor !== "default";
    const hasSize = !!selectedSize;
    if (__autoAddAfterValidation && hasColor && !hasSize) {
      const actions = (currentProduct.sizes || []).map((s) => ({
        label: s,
        action: () =>
          selectSize(
            s,
            Array.from(document.querySelectorAll(".size-btn")).find(
              (b) => (b.textContent || "").trim() === s
            )
          ),
      }));
      showAlert("Selecciona tu talla", actions);
    } else if (__autoAddAfterValidation && hasColor && hasSize) {
      const intent = __lastIntent || "add";
      __autoAddAfterValidation = false;
      try {
        closeAlert();
      } catch (e) {}
      setTimeout(() => {
        if (intent === "buy") buyNowFromModal();
        else addToCartFromModal();
      }, 0);
    }
  } catch (e) {}
}

function selectSize(size, btnEl) {
  selectedSize = size;

  // Clear size validation error
  const sizeError = document.getElementById("size-error");
  if (sizeError) sizeError.style.display = "none";

  // Actualizar botones de talla
  document
    .querySelectorAll(".size-btn")
    .forEach((s) => s.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  updateModalPrice();

  // Auto-ejecución si venimos de una advertencia
  try {
    const hasColor = selectedColor && selectedColor !== "default";
    const hasSize = !!selectedSize;
    if (__autoAddAfterValidation && !hasColor && hasSize) {
      const actions = [
        {
          label: "Elegir color",
          action: () => {
            const el = document.getElementById("color-swatches");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          },
        },
      ];
      showAlert("Por favor selecciona un color", actions);
    } else if (__autoAddAfterValidation && hasColor && hasSize) {
      const intent = __lastIntent || "add";
      __autoAddAfterValidation = false;
      try {
        closeAlert();
      } catch (e) {}
      setTimeout(() => {
        if (intent === "buy") buyNowFromModal();
        else addToCartFromModal();
      }, 0);
    }
  } catch (e) {}
}

function validateQuantity() {
  const input = document.getElementById("quantity-input");
  if (!input) return;

  const value = Math.max(1, parseInt(input.value) || 1);
  input.value = value;
  quantity = value;
  updateTotalPrice();
}

function updateTotalPrice() {
  if (!currentProduct) return;

  const unitPrice = calculatePrice(
    quantity,
    currentProduct.price,
    selectedSize
  );
  const total = unitPrice * quantity;
  const totalElement = document.getElementById("total-price");
  if (totalElement) {
    totalElement.textContent = `RD$${total}`;
  }
}

// Función para mostrar alertas centrales más visibles
function showCenterAlert(message, type = "warning") {
  // Crear elemento de alerta central si no existe
  let centerAlert = document.getElementById("center-alert");
  if (!centerAlert) {
    centerAlert = document.createElement("div");
    centerAlert.id = "center-alert";
    centerAlert.className = "center-alert";
    document.body.appendChild(centerAlert);
  }

  // Configurar el mensaje y tipo
  centerAlert.textContent = message;
  centerAlert.className = `center-alert ${type}`;
  centerAlert.style.display = "block";

  // Auto-ocultar después de 3 segundos
  setTimeout(() => {
    if (centerAlert) {
      centerAlert.style.display = "none";
    }
  }, 3000);
}

function addToCartFromModal() {
  if (!currentProduct) return;
  __lastIntent = __lastIntent || "add";
  // Validaciones: color y talla requeridos
  if (!selectedColor || selectedColor === "default") {
    const colorError = document.getElementById("color-error");
    if (colorError) colorError.style.display = "block";
    __autoAddAfterValidation = true;
    showCenterAlert("Por favor selecciona un color", "warning");
    return;
  }
  if (!selectedSize) {
    const sizeError = document.getElementById("size-error");
    if (sizeError) sizeError.style.display = "block";
    __autoAddAfterValidation = true;
    showCenterAlert("Por favor selecciona una talla", "warning");
    return;
  }

  const colorKey = isCustomColor ? selectedColorHex : selectedColor;
  const colorDisplay = isCustomColor
    ? hexToColorName(selectedColorHex)
    : colorNames[selectedColor] || selectedColor;

  const imageToUse =
    !isCustomColor &&
    currentProduct.images &&
    currentProduct.images[selectedColor]
      ? currentProduct.images[selectedColor]
      : null;

  // Buscar si ya existe un item igual
  const existingIndex = cart.findIndex(
    (i) =>
      i.id === currentProduct.id &&
      i.colorKey === colorKey &&
      i.size === selectedSize
  );

  if (existingIndex >= 0) {
    cart[existingIndex].qty += quantity;
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      code: currentProduct.code,
      basePrice: currentProduct.price,
      colorKey,
      colorDisplay,
      colorHex: selectedColorHex,
      size: selectedSize,
      qty: quantity,
      image: imageToUse,
      imageOriginal: currentProduct.images.default || null,
    });
  }

  saveCart();
  updateCartCount();
  renderCart();
  openCart();
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (modal) modal.classList.remove("active");
  // Asegurar que se quite el estado de zoom
  const img = document.getElementById("modal-img");
  if (img && img.parentElement) img.parentElement.classList.remove("zoomed");
  document.body.style.overflow = "";
  if (modalKeydownAttached) {
    window.removeEventListener("keydown", onModalKeydown);
    modalKeydownAttached = false;
  }
  currentIndexInVisible = -1;

  // Reset global de selección para prevenir persistencia entre aperturas
  try {
    if (typeof selectedSizes !== "undefined") selectedSizes = [];
    if (typeof selectedColors !== "undefined") selectedColors = [];
    if (typeof selectedSize !== "undefined") selectedSize = null;
    if (typeof selectedColor !== "undefined") selectedColor = "default";
    if (typeof selectedColorHex !== "undefined") selectedColorHex = "#e0e0e0";
    if (typeof isCustomColor !== "undefined") isCustomColor = false;
    if (typeof quantity !== "undefined") quantity = 1;
    __autoAddAfterValidation = false;
    __lastIntent = null;

    const sizeContainer = document.getElementById("size-options");
    if (
      sizeContainer &&
      currentProduct &&
      Array.isArray(currentProduct.sizes)
    ) {
      sizeContainer.innerHTML = "";
      sizeContainer.className = "size-options-zara";
      currentProduct.sizes.forEach((sz) => {
        const b = document.createElement("button");
        b.className = "size-btn";
        b.type = "button";
        b.textContent = sz;
        b.addEventListener("click", (e) => {
          e.preventDefault();
          selectSize(sz);
        });
        sizeContainer.appendChild(b);
      });
    }
    document
      .querySelectorAll(".swatch, .swatch-small, .swatch-original")
      .forEach((s) => s.classList.remove("active"));
  } catch (e) {
    console.warn("closeModal reset error (blusas):", e);
  }
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  ensureSharedUI();
  loadCart();
  // Precargar búsqueda desde ?q=
  try {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get("q");
    if (qParam) {
      const si = document.getElementById("site-search");
      if (si) si.value = qParam;
      searchQuery = qParam;
    }
  } catch (e) {}
  renderProducts();
  updateCartCount();

  // Ocultar los FABs cuando el footer es visible para evitar desorden visual
  try {
    const fabContainer = document.querySelector(".social-fab-container");
    const cartFab = document.querySelector(".fab-cart");
    const footer = document.querySelector("footer.site-footer");
    if (fabContainer && footer && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const hide = entry.isIntersecting;
            const apply = (el, baseBottom) => {
              if (!el) return;
              el.style.transition = "opacity 0.2s ease, transform 0.2s ease";
              el.style.opacity = hide ? "0" : "1";
              el.style.pointerEvents = hide ? "none" : "auto";
              if (!hide && typeof baseBottom === "string") {
                el.style.bottom = baseBottom;
              }
            };
            apply(fabContainer, "2rem");
            apply(cartFab, "2rem");
          });
        },
        { root: null, threshold: 0.01 }
      );
      observer.observe(footer);
    }
  } catch (e) {}

  // Búsqueda en la página de blusas
  const searchInput = document.getElementById("site-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value || "";
      renderProducts();
    });

    // Enter para redirigir a categoría si la consulta es de otra sección (p. ej. "crop tops")
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const term = (searchInput.value || "").trim();
        if (!term) return;
        const cat = detectCategoryFromQuery(term);
        if (cat && cat !== "blusas") {
          const pages = {
            "crop-tops": "crop-tops.html",
            blusas: "blusas.html",
            vestidos: "vestidos.html",
            faldas: "faldas.html",
            pantalones: "pantalones.html",
            conjuntos: "conjuntos.html",
            enterizos: "enterizos.html",
            body: "body.html",
          };
          window.location.href = `${pages[cat]}?q=${encodeURIComponent(term)}`;
        }
      }
    });

    // Compatibilidad Safari: usar keyup y evento "search" (inputs type=search)
    const handleRedirect = () => {
      const term = (searchInput.value || "").trim();
      if (!term) return;
      const cat = detectCategoryFromQuery(term);
      if (cat && cat !== "blusas") {
        const pages = {
          "crop-tops": "crop-tops.html",
          blusas: "blusas.html",
          vestidos: "vestidos.html",
          faldas: "faldas.html",
          pantalones: "pantalones.html",
          conjuntos: "conjuntos.html",
          enterizos: "enterizos.html",
          body: "body.html",
        };
        window.location.href = `${pages[cat]}?q=${encodeURIComponent(term)}`;
      }
    };
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") handleRedirect();
    });
    searchInput.addEventListener("search", handleRedirect);
  }
});

// ====== UI Compartida: Carrito lateral y eventos ======
function ensureSharedUI() {
  if (document.getElementById("cart-sidebar")) return;
  const html = `
    <aside id="cart-sidebar" class="cart-sidebar" aria-label="Carrito">
      <div class="cart-header">
        <h2>Tu bolsa</h2>
        <button class="cart-close" id="cart-close">×</button>
      </div>
      <div id="cart-items" class="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total"><span>Total</span><span id="cart-total-amount">RD$0</span></div>
        <textarea id="cart-note" class="cart-note" placeholder="Notas del pedido (opcional)"></textarea>
        <button id="checkout-btn" class="btn-primary">Finalizar por WhatsApp</button>
      </div>
    </aside>
  `;
  document.body.insertAdjacentHTML("beforeend", html);
  const openBtn = document.getElementById("cart-open");
  const fabBtn = document.getElementById("fab-cart");
  const closeBtn = document.getElementById("cart-close");
  if (openBtn) openBtn.addEventListener("click", toggleCart);
  if (fabBtn) fabBtn.addEventListener("click", toggleCart);
  if (closeBtn) closeBtn.addEventListener("click", toggleCart);
  const checkout = document.getElementById("checkout-btn");
  if (checkout) checkout.addEventListener("click", checkoutWhatsApp);
}

function toggleCart() {
  const el = document.getElementById("cart-sidebar");
  if (!el) return;
  el.classList.toggle("active");
}
function openCart() {
  const el = document.getElementById("cart-sidebar");
  if (!el) return;
  el.classList.add("active");
}
function closeCart() {
  const el = document.getElementById("cart-sidebar");
  if (!el) return;
  el.classList.remove("active");
}

function renderCart() {
  const list = document.getElementById("cart-items");
  if (!list) return;
  if (!cart || cart.length === 0) {
    list.innerHTML = '<div class="cart-empty">Tu bolsa está vacía</div>';
    const totalEl = document.getElementById("cart-total-amount");
    if (totalEl) totalEl.textContent = "RD$0";
    return;
  }
  list.innerHTML = "";
  let total = 0;
  cart.forEach((it, idx) => {
    const p = products.find((pp) => pp.id === it.id);
    const base = it.basePrice || p?.price || { retail: 0, dozen: 0 };
    const unit = calculatePrice(it.qty || it.quantity || 1, base, it.size);
    const subtotal = unit * (it.qty || it.quantity || 1);
    total += subtotal;
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img class="cart-item-image" src="${
        it.image || it.imageOriginal || `Images/${it.id}/${it.id}.jpg`
      }" alt="${it.name}" onerror="this.style.display='none'"/>
      <div class="cart-item-info">
        <div class="cart-item-name">${it.name}</div>
        <div class="cart-item-details">${it.code} • ${
      it.colorDisplay || it.colorKey
    } • Talla ${it.size}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" aria-label="-" data-act="minus" data-idx="${idx}">−</button>
          <input type="number" min="1" value="${
            it.qty || it.quantity
          }" data-idx="${idx}" class="qty-input" />
          <button class="qty-btn" aria-label="+" data-act="plus" data-idx="${idx}">+</button>
          <div class="item-subtotal">RD$${subtotal}</div>
        </div>
      </div>
      <button class="cart-remove" aria-label="Eliminar" data-idx="${idx}">×</button>
    `;
    list.appendChild(row);
  });
  const totalEl = document.getElementById("cart-total-amount");
  if (totalEl) totalEl.textContent = `RD$${total}`;

  list.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.currentTarget.dataset.idx);
      const act = e.currentTarget.dataset.act;
      const currQty = cart[idx].qty || cart[idx].quantity || 1;
      const newQty = act === "minus" ? Math.max(1, currQty - 1) : currQty + 1;
      cart[idx].qty = newQty;
      saveCart();
      updateCartCount();
      renderCart();
    });
  });
  list.querySelectorAll(".qty-input").forEach((inp) => {
    inp.addEventListener("change", (e) => {
      const idx = Number(e.currentTarget.dataset.idx);
      const val = Math.max(1, parseInt(e.currentTarget.value) || 1);
      cart[idx].qty = val;
      saveCart();
      updateCartCount();
      renderCart();
    });
  });
  list.querySelectorAll(".cart-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.currentTarget.dataset.idx);
      cart.splice(idx, 1);
      saveCart();
      updateCartCount();
      renderCart();
    });
  });
}

function checkoutWhatsApp() {
  if (!cart || cart.length === 0) return;
  const note = (document.getElementById("cart-note")?.value || "").trim();
  const lines = cart.map((it, i) => {
    const p = products.find((pp) => pp.id === it.id);
    const base = it.basePrice || p?.price || { retail: 0, dozen: 0 };
    const unit = calculatePrice(it.qty || it.quantity || 1, base, it.size);
    const qty = it.qty || it.quantity || 1;
    const subtotal = unit * qty;
    const colorLabel = it.colorDisplay || it.colorKey;
    const emoji = getColorEmoji(it.colorKey);
    return `${i + 1}. ${it.name} (${
      it.code
    }) - ${emoji} ${colorLabel} - Talla ${it.size} x${qty} = RD$${subtotal}`;
  });
  const total = cart.reduce((s, it) => {
    const p = products.find((pp) => pp.id === it.id);
    const base = it.basePrice || p?.price || { retail: 0, dozen: 0 };
    const unit = calculatePrice(it.qty || it.quantity || 1, base, it.size);
    return s + unit * (it.qty || it.quantity || 1);
  }, 0);
  const msg = [
    "Hola, quiero finalizar este pedido:",
    ...lines,
    `Total: RD$${total}`,
    note ? `Nota: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const url = `https://wa.me/18093027761?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

function generateOrderId() {
  const now = new Date();
  const pad2 = (n) => String(n).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const MM = pad2(now.getMonth() + 1);
  const dd = pad2(now.getDate());
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  return `FM-${yy}${MM}${dd}-${hh}${mm}${ss}`;
}

// ====== Alerta centrada reutilizable ======
function showAlert(message, actions = []) {
  const modal = document.getElementById("alert-modal");
  const msg = document.getElementById("alert-message");
  if (!modal || !msg) {
    alert(message);
    return;
  }
  msg.textContent = message;
  const actionsBox = document.getElementById("alert-actions");
  if (actionsBox) {
    actionsBox.innerHTML = "";
    actions.forEach((a) => {
      const b = document.createElement("button");
      b.className = "alert-btn";
      b.textContent = a.label;
      b.addEventListener("click", () => {
        try {
          if (a && typeof a.action === "function") a.action();
        } finally {
          closeAlert();
        }
      });
      actionsBox.appendChild(b);
    });
  }
  modal.classList.add("active");
}
function closeAlert() {
  const modal = document.getElementById("alert-modal");
  if (modal) modal.classList.remove("active");
}

// Exponer showAlert/closeAlert globalmente (por compatibilidad con inline actions)
window.showAlert = showAlert;
window.closeAlert = closeAlert;

// Modal ligero de datos del cliente (si no está, lo creamos)
function ensureCustomerModal() {
  if (document.getElementById("customer-name-modal")) return;
  const nameModal = `
    <div id="customer-name-modal" class="modal" aria-hidden="true">
      <div class="modal-content-professional">
        <button class="modal-close" id="customer-name-close">×</button>
        <div class="customer-name-modal-body">
          <h3 style="margin:0 0 10px 0; font-size:1.15rem;">Datos del cliente</h3>
          <p class="customer-name-prompt">Para preparar tu pedido y coordinar la entrega, indícanos tu nombre y ciudad.</p>
          <input id="customer-name-input" class="customer-name-input" type="text" placeholder="Nombre y apellido" autocomplete="name" />
          <input id="customer-city-input" class="customer-name-input" type="text" placeholder="Ciudad / Sector" autocomplete="address-level2" />
          <div class="customer-modal-buttons">
            <button id="customer-cancel" class="customer-modal-btn-cancel">Cancelar</button>
            <button id="customer-confirm" class="customer-modal-btn-confirm">Continuar</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", nameModal);
}

function collectCustomerInfo() {
  return new Promise((resolve) => {
    try {
      ensureSharedUI();
      ensureCustomerModal();
      const modal = document.getElementById("customer-name-modal");
      const nameInput = document.getElementById("customer-name-input");
      const cityInput = document.getElementById("customer-city-input");
      const btnOk = document.getElementById("customer-confirm");
      const btnCancel = document.getElementById("customer-cancel");
      const btnClose = document.getElementById("customer-name-close");
      if (!modal || !nameInput || !btnOk) {
        resolve({ name: "", city: "" });
        return;
      }

      // Prellenar desde localStorage si existe
      try {
        const stored = JSON.parse(
          localStorage.getItem("fm_customer_v1") || "null"
        );
        if (stored) {
          if (!nameInput.value) nameInput.value = stored.name || "";
          if (!cityInput.value) cityInput.value = stored.city || "";
        }
      } catch (e) {}

      function done(result) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
        btnOk.removeEventListener("click", onOk);
        btnCancel.removeEventListener("click", onCancel);
        btnClose.removeEventListener("click", onCancel);
        modal.removeEventListener("click", onBackdrop);
        window.removeEventListener("keydown", onEsc);
        resolve(result);
      }

      function onOk() {
        const name = (nameInput.value || "").trim();
        const city = (cityInput.value || "").trim();
        try {
          localStorage.setItem(
            "fm_customer_v1",
            JSON.stringify({ name, city })
          );
        } catch (e) {}
        done({ name, city });
      }
      function onCancel() {
        done(null);
      }
      function onBackdrop(e) {
        if (e.target.id === "customer-name-modal") onCancel();
      }
      function onEsc(e) {
        if (e.key === "Escape") onCancel();
      }

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        if (!nameInput.value.trim()) nameInput.focus();
        else if (!cityInput.value.trim()) cityInput.focus();
        else if (btnOk) btnOk.focus();
      }, 30);
      btnOk.addEventListener("click", onOk);
      btnCancel.addEventListener("click", onCancel);
      btnClose.addEventListener("click", onCancel);
      modal.addEventListener("click", onBackdrop);
      window.addEventListener("keydown", onEsc);
    } catch (e) {
      resolve({ name: "", city: "" });
    }
  });
}
