// blusas-app.js - Funcionalidad específica para la página de blusas

// Variables globales
let cart = [];
let currentProduct = null;
let selectedColor = "default";
let selectedColorHex = "#e0e0e0";
let isCustomColor = false;
let selectedSize = "M";
let quantity = 1;
let searchQuery = "";
// Navegación modal
let visibleProductIds = [];
let currentIndexInVisible = -1;
let modalKeydownAttached = false;

// Función de utilidad para padding
function pad(n) {
  return String(n).padStart(3, "0");
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

// Emoji por color
function getColorEmoji(colorKey) {
  if (!colorKey) return "";
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

// Generar productos específicos para blusas (049-064)
const products = [];
for (let i = 49; i <= 64; i++) {
  const id = pad(i);
  const images = { default: `Images/${id}/${id}.jpg` };
  products.push({
    id,
    name: `Blusa ${id}`,
    code: id,
    price: { retail: 450, dozen: 375 },
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

function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredProducts.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.dataset.id = product.id;
    div.innerHTML = `
      <div class="product-image">
        <img src="${product.images.default}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Sin+imagen'">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-code">Código: ${product.code}</p>
        <div class="product-price">
          <span class="price-current">RD$${product.price.retail}</span>
        </div>
      </div>
    `;
    div.addEventListener("click", () => openModal(product.id));
    grid.appendChild(div);
  });

  visibleProductIds = filteredProducts.map((p) => p.id);
}

function openModal(productId) {
  currentProduct = products.find((p) => p.id === productId);
  if (!currentProduct) return;

  selectedColor = "default";
  selectedColorHex = "#e0e0e0";
  selectedSize = "M";
  quantity = 1;
  isCustomColor = false;

  const modal = document.getElementById("product-modal");
  if (!modal) {
    createModal();
    return openModal(productId);
  }

  // Actualizar contenido del modal
  document.getElementById("modal-product-name").textContent =
    currentProduct.name;
  document.getElementById(
    "modal-product-code"
  ).textContent = `Código: ${currentProduct.code}`;
  document.getElementById("modal-product-image").src =
    currentProduct.images.default;
  document.getElementById(
    "price-retail"
  ).textContent = `RD$${currentProduct.price.retail}`;
  document.getElementById(
    "price-dozen"
  ).textContent = `RD$${currentProduct.price.dozen}`;

  updateModalPricing();
  modal.style.display = "flex";

  currentIndexInVisible = Math.max(
    0,
    visibleProductIds.findIndex((pid) => pid === currentProduct.id)
  );
  if (!modalKeydownAttached) {
    modalKeydownAttached = true;
    window.addEventListener("keydown", onModalKeydown);
  }
}

function createModal() {
  const modalHTML = `
    <div id="product-modal" class="modal-zara">
      <div class="modal-content-zara">
        <span class="close-zara" onclick="closeModal()">&times;</span>
        
        <div class="modal-body-zara">
          <div class="modal-left-zara">
            <div class="modal-image-container-zara">
              <img id="modal-product-image" src="" alt="Producto" class="modal-product-image-zara">
            </div>
            <div class="image-nav-buttons">
              <button id="modal-prev" class="btn-nav-secondary" aria-label="Anterior">Anterior</button>
              <button id="modal-next" class="btn-nav-secondary" aria-label="Siguiente">Siguiente</button>
            </div>
          </div>
          
          <div class="modal-right-zara">
            <div class="product-header-zara">
              <h2 id="modal-product-name" class="product-title-zara">Producto</h2>
              <p id="modal-product-code" class="product-code-zara">Código:</p>
            </div>
            
              <!-- Tabla de precios -->
              <div class="pricing-tiers-zara">
                <div class="pricing-title-zara">PRECIOS</div>
                <div class="tier-row">
                  <span class="qty-text">Precio por docena</span>
                  <span id="price-dozen" class="tier-price">RD$0</span>
                </div>
              </div>
            
            <!-- Selección de color -->
            <div class="selection-group-zara">
              <label class="selection-label-zara">Color:</label>
              <div class="color-options-zara" id="color-options">
                ${colorKeys
                  .map(
                    (color) => `
                  <div class="color-option-zara" data-color="${color}" onclick="selectColor('${color}')" 
                       style="background-color: ${colorMap[color]}; border: 2px solid ${colorMap[color]}">
                  </div>
                `
                  )
                  .join("")}
              </div>
              <div class="selected-color-info-zara">
                <span>Color seleccionado: </span>
                <span id="selected-color-name">Blanco</span>
                <span id="selected-color-emoji">${getColorEmoji(
                  "blanco"
                )}</span>
              </div>
            </div>
            
            <!-- Selección de talla -->
            <div class="selection-group-zara">
              <label class="selection-label-zara">Talla:</label>
              <div class="size-options-zara">
                ${["XS", "S", "M", "L", "XL", "2XL", "3XL"]
                  .map(
                    (size) => `
                  <button class="size-option-zara ${
                    size === "M" ? "selected" : ""
                  }" 
                          onclick="selectSize('${size}')">${size}</button>
                `
                  )
                  .join("")}
              </div>
            </div>
            
            <!-- Cantidad y precio total -->
            <div class="quantity-section-zara">
              <div class="quantity-controls-zara">
                <label class="selection-label-zara">Cantidad:</label>
                <div class="quantity-input-group-zara">
                  <button onclick="changeQuantity(-1)">-</button>
                  <input type="number" id="quantity-input" value="1" min="1" onchange="updateQuantity()">
                  <button onclick="changeQuantity(1)">+</button>
                </div>
              </div>
              
              <div class="total-price-zara">
                <span class="total-label-zara">Total:</span>
                <span class="total-amount-zara" id="total-price">RD$0</span>
              </div>
            </div>
            
            <!-- Botón agregar al carrito -->
            <button class="add-to-cart-zara" onclick="addToCartFromModal()">
              AGREGAR AL CARRITO
            </button>
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

function onModalKeydown(e) {
  const modal = document.getElementById("product-modal");
  if (!modal || modal.style.display === "none") return;
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
  selectedSize = "M";
  quantity = 1;
  currentIndexInVisible = nextIndex;

  document.getElementById("modal-product-name").textContent =
    currentProduct.name;
  document.getElementById(
    "modal-product-code"
  ).textContent = `Código: ${currentProduct.code}`;
  document.getElementById("modal-product-image").src =
    currentProduct.images.default;
  document.getElementById(
    "price-retail"
  ).textContent = `RD$${currentProduct.price.retail}`;
  document.getElementById(
    "price-dozen"
  ).textContent = `RD$${currentProduct.price.dozen}`;
  updateModalPricing();
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (modal) modal.style.display = "none";
  if (modalKeydownAttached) {
    window.removeEventListener("keydown", onModalKeydown);
    modalKeydownAttached = false;
  }
  currentIndexInVisible = -1;

  // Reset selections para evitar persistencia al reabrir
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

    const qtyInput = document.getElementById("quantity-input");
    if (qtyInput) qtyInput.value = 1;
    // Limpiar clases seleccionadas en UI
    document
      .querySelectorAll(".size-option-zara, .color-option-zara")
      .forEach((el) => el.classList.remove("selected"));
  } catch (e) {
    console.warn("closeModal reset error (blusas-complete):", e);
  }
}

function selectColor(color) {
  selectedColor = color;
  selectedColorHex = colorMap[color];
  isCustomColor = false;

  // Actualizar UI
  document.querySelectorAll(".color-option-zara").forEach((option) => {
    option.classList.remove("selected");
  });
  document.querySelector(`[data-color="${color}"]`).classList.add("selected");

  document.getElementById("selected-color-name").textContent =
    colorNames[color];
  document.getElementById("selected-color-emoji").textContent =
    getColorEmoji(color);

  // Cambiar imagen si existe
  if (currentProduct.images[color]) {
    document.getElementById("modal-product-image").src =
      currentProduct.images[color];
  }
}

function selectSize(size) {
  selectedSize = size;

  // Actualizar UI
  document.querySelectorAll(".size-option-zara").forEach((option) => {
    option.classList.remove("selected");
  });
  document
    .querySelector(`button[onclick="selectSize('${size}')"]`)
    .classList.add("selected");

  updateModalPricing();
}

function changeQuantity(delta) {
  quantity = Math.max(1, quantity + delta);
  document.getElementById("quantity-input").value = quantity;
  updateModalPricing();
}

function updateQuantity() {
  const input = document.getElementById("quantity-input");
  quantity = Math.max(1, parseInt(input.value) || 1);
  input.value = quantity;
  updateModalPricing();
}

function updateModalPricing() {
  if (!currentProduct) return;

  const totalPrice =
    calculatePrice(quantity, currentProduct.price, selectedSize) * quantity;
  document.getElementById("total-price").textContent = `RD$${totalPrice}`;
}

// Función mejorada para convertir hex a nombres de colores comprensibles
function hexToColorName(hex) {
  if (!hex || !hex.startsWith("#")) return "Color Personalizado";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Lógica básica de detección de color
  const brightness = (r + g + b) / 3;
  if (brightness > 230) return "Muy Claro";
  if (brightness < 50) return "Muy Oscuro";

  const maxVal = Math.max(r, g, b);
  if (r === maxVal && g > b) return "Amarillo";
  if (r === maxVal) return "Rojo";
  if (g === maxVal) return "Verde";
  if (b === maxVal) return "Azul";

  return "Color Personalizado";
}

function addToCartFromModal() {
  if (!currentProduct) return;

  const item = {
    id: currentProduct.id,
    name: currentProduct.name,
    code: currentProduct.code,
    color: selectedColor,
    colorHex: selectedColorHex,
    colorName: isCustomColor
      ? hexToColorName(selectedColorHex)
      : colorNames[selectedColor] || selectedColor,
    size: selectedSize,
    quantity: quantity,
    price: calculatePrice(quantity, currentProduct.price, selectedSize),
    total:
      calculatePrice(quantity, currentProduct.price, selectedSize) * quantity,
    image:
      currentProduct.images[selectedColor] || currentProduct.images.default,
  };

  cart.push(item);
  saveCart();
  updateCartDisplay();
  closeModal();

  // Mostrar notificación
  showNotification(`${item.name} agregado al carrito`);
}

function saveCart() {
  try {
    localStorage.setItem("fabricamayorista-cart", JSON.stringify(cart));
  } catch (e) {
    console.warn("No se pudo guardar carrito en localStorage", e);
  }
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "inline" : "none";
  }
}

function showNotification(message) {
  // Crear notificación simple
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2563eb;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function loadCart() {
  try {
    const saved = localStorage.getItem("fabricamayorista-cart");
    cart = saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn("No se pudo cargar carrito desde localStorage", e);
    cart = [];
  }
}

// Inicializar página
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  renderProducts();
  updateCartDisplay();
});
