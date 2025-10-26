// crop-tops-app.js — JavaScript específico para la página de Crop Tops

// Importar productos del archivo principal
const products = [];

// Nombre amigable por categoría (evita mostrar "Artículo N")
function getDisplayNameSection(p) {
  try {
    const idNum = parseInt(p.id, 10);
    const isGeneric = !p.name || /^art[ií]culo\s/i.test(String(p.name));
    // Rango de Crop Tops (según catálogo)
    if (!Number.isNaN(idNum) && idNum >= 9 && idNum <= 48) {
      if (isGeneric) return `Crop Top ${p.code || `FM-00${p.id}`}`;
      // Aunque no sea genérico, preferimos título corto y consistente
      return "Crop Top";
    }
    return p.name || p.code || `FM-00${p.id}`;
  } catch {
    return p && (p.name || p.code) ? p.name || p.code : "Producto";
  }
}

function pad(n) {
  return String(n).padStart(3, "0");
}

// Configuración compartida local para la sección: si usar emojis en mensajes WA
const whatsappUseEmoji_section = false;

function buildWhatsAppMessageSingle_section(
  orderId,
  dateStr,
  customer,
  currentProduct,
  selectedSize,
  colorDisplay,
  quantity,
  unitPrice,
  subtotal,
  savings
) {
  if (whatsappUseEmoji_section) {
    let message = `🛍️ *COMPRA DIRECTA FABRICAMAYORISTA*\n`;
    message += `📋 Pedido: ${orderId}\n`;
    message += `📅 Fecha: ${dateStr}\n`;
    message += `════════════════════════\n\n`;
    const displayName = getDisplayNameSection(currentProduct);
    message += `*${displayName}*\n`;
    message += `📦 Código: ${currentProduct.code}\n`;
    message += `👕 Talla: ${selectedSize}\n`;
    message += `🎨 Color: ${colorDisplay}\n`;
    message += `📊 Cantidad: ${quantity} un.\n`;
    message += `💰 Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
    message += `💵 Subtotal: RD$${subtotal.toFixed(2)}\n`;
    if (savings > 0) message += `✅ Ahorro: RD$${savings.toFixed(2)}\n`;
    message += `\n💎 *TOTAL: RD$${subtotal.toFixed(2)}*\n`;
    return message;
  }

  // ASCII safe
  let message = `COMPRA DIRECTA - FabricaMayorista\n`;
  message += `Pedido: ${orderId}\n`;
  message += `Fecha: ${dateStr}\n`;
  message += `------------------------------\n\n`;
  const displayName2 = getDisplayNameSection(currentProduct);
  message += `*${displayName2}*\n`;
  message += `Código: ${currentProduct.code}\n`;
  message += `Talla: ${selectedSize}\n`;
  message += `Color: ${colorDisplay}\n`;
  message += `Cantidad: ${quantity} un.\n`;
  message += `Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
  message += `Subtotal: RD$${subtotal.toFixed(2)}\n`;
  if (savings > 0) message += `Ahorro: RD$${savings.toFixed(2)}\n`;
  message += `\nTOTAL: RD$${subtotal.toFixed(2)}\n`;
  return message;
}

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

// Función para convertir códigos hex a nombres de colores entendibles
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

// Generar productos 001..003 con una sola imagen por carpeta
for (let i = 1; i <= 3; i++) {
  const id = pad(i);
  const images = { default: `Images/${id}/${id}.jpg` };
  products.push({
    id,
    name: `Crop Top`,
    code: `FM-00${id}`,
    price: { retail: 450, dozen: 375 },
    images,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  });
}

for (let i = 4; i <= 54; i++) {
  const id = pad(i);
  const images = { default: `Images/${id}/${id}.jpg` };
  products.push({
    id,
    name: `Crop Top`,
    code: `FM-00${id}`,
    price: { retail: 450, dozen: 375 },
    images,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  });
}

// Ajustar nombres específicos
const prod001 = products.find((p) => p.id === "001");
if (prod001) {
  prod001.name = "Body Manga Larga Doble Forro";
}

const prod002 = products.find((p) => p.id === "002");
if (prod002) {
  prod002.name = "Body Manga Larga Forro Simple";
}

// Aplicar precios específicos para crop tops
function applySpecificPrices() {
  const specificPrices = {
    // Crop Tops
    "009": { retail: 250, dozen: 200 },
    "010": { retail: 250, dozen: 200 },
    "011": { retail: 150, dozen: 150 },
    "012": { retail: 200, dozen: 150 },
    "013": { retail: 200, dozen: 150 },
    "014": { retail: 300, dozen: 250 },
    "015": { retail: 300, dozen: 250 },
    "016": { retail: 250, dozen: 200 },
    "017": { retail: 250, dozen: 200 },
    "018": { retail: 150, dozen: 100 },
    "019": { retail: 150, dozen: 100 },
    "020": { retail: 150, dozen: 100 },
    "021": { retail: 150, dozen: 100 },
    "022": { retail: 200, dozen: 150 },
    "023": { retail: 350, dozen: 250 },
    "024": { retail: 150, dozen: 100 },

    // Crop Tops FM-00025 en adelante (025-048)
    "025": { retail: 350, dozen: 300 },
    "026": { retail: 225, dozen: 150 },
    "027": { retail: 350, dozen: 250 },
    "028": { retail: 200, dozen: 150 },
    "029": { retail: 350, dozen: 300 },
    "030": { retail: 300, dozen: 250 },
    "031": { retail: 350, dozen: 300 },
    "032": { retail: 350, dozen: 300 },
    "033": { retail: 225, dozen: 200 },
    "034": { retail: 250, dozen: 200 },
    "035": { retail: 150, dozen: 100 },
    "036": { retail: 300, dozen: 250 },
    "037": { retail: 250, dozen: 200 },
    "038": { retail: 250, dozen: 200 },
    "039": { retail: 150, dozen: 100 },
    "040": { retail: 150, dozen: 100 },
    "041": { retail: 150, dozen: 100 },
    "042": { retail: 150, dozen: 100 },
    "043": { retail: 175, dozen: 125 },
    "044": { retail: 250, dozen: 200 },
    "045": { retail: 150, dozen: 100 },
    "046": { retail: 250, dozen: 200 },
    "047": { retail: 250, dozen: 200 },
    "048": { retail: 175, dozen: 150 },
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

// Unificar precios en Crop Tops: 2 niveles (unidad y mayor 3+ = docena)
(function unifyCropTopsPricing() {
  try {
    products.forEach((p) => {
      if (!p.price) return;
      const dozen =
        p.price.dozen !== undefined ? Number(p.price.dozen) : undefined;
      if (dozen !== undefined && !Number.isNaN(dozen)) {
        p.price.wholesale = dozen;
      }
    });
  } catch (e) {
    console.warn("unifyCropTopsPricing error", e);
  }
})();

// Renumeración de códigos visibles (001..024) eliminando 003 para consistencia global
// Renumeración visible deshabilitada para mantener FM-00{id}

// Debug: verificar que los precios se aplicaron correctamente
console.log(
  "Crop-tops Producto 012:",
  products.find((p) => p.id === "012")?.price
);
console.log(
  "Crop-tops Producto 011:",
  products.find((p) => p.id === "011")?.price
);

// Variables globales
let cart = [];
let currentProduct = null;
let selectedColor = "default";
let selectedColorHex = "#e0e0e0";
let isCustomColor = false;
let selectedSize = null;
let quantity = 1;
let searchQuery = "";
// Navegación en modal (sección Crop Tops)
let visibleProductIds = [];
let currentIndexInVisible = -1;
let modalKeydownAttached = false;
// Auto-add al carrito tras advertencias (cuando usuario completa color y talla luego de showAlert)
let __autoAddAfterValidation = false;
let __lastIntent = null; // 'add' | 'buy'
// Lista global de navegación (IDs únicos ordenados)
const globalNavIds = (() => {
  const seen = new Set();
  const ids = products
    .map((p) => p.id)
    .filter((id) => typeof id === "string" && id.trim() !== "")
    .sort((a, b) => Number(a) - Number(b));
  const unique = [];
  ids.forEach((id) => {
    if (!seen.has(id)) {
      seen.add(id);
      unique.push(id);
    }
  });
  return unique;
})();

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
    "amarillo-dorado": "�",
    "rosado claro": "🌸",
    naranja: "�",
  };
  return map[k] || "";
}

// Función para calcular precios
function calculatePrice(qty, basePrice, size = null) {
  if (!basePrice) return 0;

  const retail = Number(basePrice.retail || 0);
  const wholesale = Number(
    basePrice.wholesale !== undefined ? basePrice.wholesale : retail
  );
  const dozen = Number(
    basePrice.dozen !== undefined ? basePrice.dozen : retail
  );

  let price;
  if (qty >= 12) price = dozen;
  else if (qty >= 3) price = wholesale;
  else price = retail;

  // Recargo de 50 pesos para tallas XL, 2XL, 3XL
  if (size && (size === "XL" || size === "2XL" || size === "3XL")) {
    price += 50;
  }

  return price;
}

// Función para renderizar solo los crop tops (IDs 009..025)
function renderCropTops() {
  const container = document.getElementById("crop-tops-products");
  if (!container) return;

  container.innerHTML = "";
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
  const q = normalizeText((searchQuery || "").trim());

  // Filtrar solo crop tops (IDs 009..048)
  const cropTops = products.filter((p) => {
    const n = parseInt(p.id, 10);
    const isCropTop = !Number.isNaN(n) && n >= 9 && n <= 48;

    if (!q) return isCropTop;

    const searchText = `${p.name || ""} ${p.id} crop top tops croptop croptops`;
    return isCropTop && normalizeText(searchText).includes(q);
  });

  if (cropTops.length === 0) {
    container.innerHTML =
      '<div class="empty-state">No se encontraron crop tops</div>';
    return;
  }

  cropTops.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });

  // Guardar ids visibles para navegación en modal
  visibleProductIds = cropTops.map((p) => p.id);

  // Animación de entrada
  setTimeout(() => {
    container.querySelectorAll(".product").forEach((p) => {
      if (!p.classList.contains("animate")) p.classList.add("animate");
    });
  }, 80);
}

// Función para crear tarjetas de producto
function createProductCard(p) {
  const div = document.createElement("div");
  div.className = "product-card";
  // Marcar id para referencia
  div.dataset.id = p.id;

  const firstImage =
    (p.images &&
      (p.images.default ||
        p.images.blanco ||
        p.images[Object.keys(p.images).find((k) => k !== "default")])) ||
    "";

  const isWhiteThumb = !!(
    p.images &&
    (p.images.blanco ||
      (p.images.default &&
        String(p.images.default).toLowerCase().includes("blanco")))
  );

  const forceWhite = p.id === "001" || p.id === "002" ? " force-white" : "";

  // Calcular precio con descuento
  const retail = Number(p.price && p.price.retail ? p.price.retail : 0);
  const wholesaleOrDozen = Number(
    p.price && p.price.dozen !== undefined
      ? p.price.dozen
      : p.price && p.price.wholesale !== undefined
      ? p.price.wholesale
      : retail
  );

  div.innerHTML = `
    <div class="product-card-minimal">
      <div class="product-image-wrapper">
        <img class="product-image-clean"
          src="${firstImage}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.src='https://via.placeholder.com/300x300?text=Sin+imagen'">
        <div class="product-code-overlay">Código: ${p.code}</div>
      </div>
      <div class="product-info-minimal">
        <h3 class="product-name-clean">${p.name}</h3>
        <div class="product-pricing">
          <div class="price-main">
            <span class="price-amount">RD$${retail}</span>
            <span class="price-unit">c/u</span>
          </div>
          <div class="price-tiers">
            ${
              wholesaleOrDozen !== retail
                ? `<div class="tier">Mayor (3+): RD$${wholesaleOrDozen}</div>`
                : ``
            }
          </div>
        </div>
      </div>
    </div>
  `;

  // Event listeners simplificados

  // Hacer toda la tarjeta clickeable
  div.addEventListener("click", (e) => {
    if (!e.target.closest("button")) {
      openModal(p.id);
    }
  });
  div.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      openModal(p.id);
    }
  });

  return div;
}

// Funciones del modal y carrito (copiadas del archivo principal con modificaciones menores)
function openModal(id) {
  currentProduct = products.find((p) => p.id === id);
  if (!currentProduct) return;

  // Asegurar que el UI compartido esté inicializado
  ensureSharedUI();

  selectedColor = "default";
  selectedColorHex = "#e0e0e0";
  isCustomColor = false;
  selectedSize = null;
  quantity = 1;

  // Elementos del modal profesional
  const nameEl = document.getElementById("modal-name");
  const imgEl = document.getElementById("modal-img");
  const qtyEl = document.getElementById("qty-display");
  const codeEl = document.getElementById("modal-code-display");

  // Título y código del producto
  // Título y código: sólo nombre del artículo y código separado
  if (nameEl) nameEl.textContent = "Crop Top";
  if (codeEl) codeEl.textContent = `${currentProduct.code}`;

  // Mostrar badge de descuento si aplica
  const discountBadge = document.getElementById("discount-badge");
  const retailPrice = currentProduct.price.retail;
  const dozenPrice = currentProduct.price.dozen;
  const savings = retailPrice - dozenPrice;
  const discountPercent = Math.round((savings / retailPrice) * 100);

  if (discountBadge && discountPercent > 0) {
    discountBadge.textContent = `-${discountPercent}%`;
    discountBadge.style.display = "block";
  }

  // Actualizar tabla de precios profesional (dos niveles: unidad y mayor 3+)
  const retailEl = document.getElementById("price-retail");
  const wholesaleEl = document.getElementById("price-wholesale");
  const dozenEl = document.getElementById("price-dozen");

  // Detectar si el precio es único (retail = docena)
  const mayorPrice =
    (currentProduct.price && currentProduct.price.dozen) ||
    (currentProduct.price && currentProduct.price.wholesale) ||
    (currentProduct.price && currentProduct.price.retail) ||
    0;

  // Mostrar ambas filas siempre
  const pricingContainer = document.querySelector(".pricing-tiers-zara");
  if (pricingContainer) {
    pricingContainer.innerHTML = `
      <div class="pricing-title-zara">PRECIOS</div>
      <div class="tier-row">
        <span class="qty-text">Precio por unidad</span>
        <span id="price-retail" class="tier-price">RD$${currentProduct.price.retail}</span>
      </div>
      <div class="tier-row">
        <span class="qty-text">Precio al por mayor (3+)</span>
        <span id="price-dozen" class="tier-price">RD$${mayorPrice}</span>
      </div>
    `;
  }

  // Imagen principal con zoom
  const modalImgSrc =
    (currentProduct.images &&
      (currentProduct.images.default ||
        currentProduct.images.blanco ||
        currentProduct.images[
          Object.keys(currentProduct.images).find((k) => k !== "default")
        ])) ||
    "";

  if (imgEl) {
    imgEl.onerror = function () {
      const fallback =
        (currentProduct.images && currentProduct.images.default) ||
        "https://via.placeholder.com/600x600?text=Sin+imagen";
      if (imgEl.src !== fallback) imgEl.src = fallback;
    };
    imgEl.src = modalImgSrc;

    // Agregar funcionalidad de zoom
    const imageContainer = imgEl.parentElement;
    if (imageContainer) {
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
  }

  // Cantidad inicial
  if (qtyEl) qtyEl.textContent = quantity;

  const modal = document.getElementById("product-modal");
  if (modal) {
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

    // Setup modal controls
    setupModalControls();

    // Inicializar zoom después de que el modal esté visible
    setTimeout(() => {
      if (typeof initImageZoom === "function") {
        initImageZoom();
      }
    }, 100);
  }

  updateModalPrice();
}

function onModalKeydown(e) {
  const modal = document.getElementById("product-modal");
  if (!modal || !modal.classList.contains("active")) return;
  if (e.key === "ArrowLeft") navigateModal(-1);
  else if (e.key === "ArrowRight") navigateModal(1);
}

function navigateModal(delta) {
  // Navegar solo dentro de la lista visible de Crop Tops
  const sourceIds = Array.isArray(visibleProductIds) ? visibleProductIds : [];
  if (!Array.isArray(sourceIds) || sourceIds.length === 0) return;

  let currIndex = sourceIds.findIndex(
    (pid) => pid === (currentProduct && currentProduct.id)
  );
  if (currIndex < 0) currIndex = 0;
  let nextIndex = currIndex + delta;
  // Sin wrap-around: si excede límites, no navegar
  if (nextIndex < 0 || nextIndex >= sourceIds.length) return;
  const nextId = sourceIds[nextIndex];
  const nextProduct = products.find((p) => p.id === nextId);
  if (!nextProduct) return;

  currentProduct = nextProduct;
  selectedColor = "default";
  selectedColorHex = "#e0e0e0";
  isCustomColor = false;
  selectedSize = null;
  quantity = 1;
  currentIndexInVisible = nextIndex;

  // Re-renderizar contenido clave
  const nameEl = document.getElementById("modal-name");
  const codeEl = document.getElementById("modal-code-display");
  const imgEl = document.getElementById("modal-img");
  const qtyEl = document.getElementById("qty-display");
  if (nameEl) nameEl.textContent = currentProduct.name;
  if (codeEl) codeEl.textContent = currentProduct.code;
  if (qtyEl) qtyEl.textContent = quantity;

  // Precios (uniforme o docena)
  const pricingContainer = document.querySelector(".pricing-tiers-zara");
  if (pricingContainer) {
    const retail = Number(currentProduct.price.retail || 0);
    const mayor = Number(
      (currentProduct.price && currentProduct.price.dozen) ||
        (currentProduct.price && currentProduct.price.wholesale) ||
        retail
    );
    pricingContainer.innerHTML = `
      <div class="pricing-title-zara">PRECIOS</div>
      <div class="tier-row">
        <span class="qty-text">Precio por unidad</span>
        <span id="price-retail" class="tier-price">RD$${retail}</span>
      </div>
      <div class="tier-row">
        <span class="qty-text">Precio al por mayor (3+)</span>
        <span id="price-dozen" class="tier-price">RD$${mayor}</span>
      </div>
    `;
  }

  // Imagen
  const modalImgSrc =
    (currentProduct.images &&
      (currentProduct.images.default ||
        currentProduct.images.blanco ||
        currentProduct.images[
          Object.keys(currentProduct.images).find((k) => k !== "default")
        ])) ||
    "";
  if (imgEl) {
    imgEl.onerror = function () {
      const fallback =
        (currentProduct.images && currentProduct.images.default) ||
        "https://via.placeholder.com/600x600?text=Sin+imagen";
      if (imgEl.src !== fallback) imgEl.src = fallback;
    };
    imgEl.src = modalImgSrc;
  }

  // Swatches y tallas
  setupModalControls();
  updateModalPrice();

  setTimeout(() => {
    if (typeof initImageZoom === "function") initImageZoom();
  }, 50);
}

function setupModalControls() {
  const modal = document.getElementById("product-modal");
  if (!modal) return;

  // Color swatches
  const swatchesContainer = document.getElementById("color-swatches");
  const colorGroup = swatchesContainer
    ? swatchesContainer.closest(".selection-group-zara")
    : null;
  const customColorPicker = document.getElementById("custom-color-picker");
  const productHasColorOptions = Boolean(
    (currentProduct && Array.isArray(currentProduct.colors) && currentProduct.colors.length > 0) ||
      (currentProduct && currentProduct.images && Object.keys(currentProduct.images).length > 1)
  );
  if (swatchesContainer && colorGroup) {
    if (productHasColorOptions) {
      colorGroup.style.display = "";
      swatchesContainer.innerHTML = "";
      Object.keys(colorMap).forEach((key) => {
        const btn = document.createElement("button");
        btn.className = "swatch";
        btn.dataset.color = key;
        btn.style.background = colorMap[key];
        btn.title = colorNames[key] || key;
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          selectColor(key, false, colorMap[key]);
        });
        swatchesContainer.appendChild(btn);
      });
      if (customColorPicker) customColorPicker.disabled = false;
    } else {
      colorGroup.style.display = "none";
      selectedColor = "N/A";
      isCustomColor = false;
      if (customColorPicker) customColorPicker.disabled = true;
    }
  }

  // Size buttons
  const sizeContainer = document.getElementById("size-options");
  if (sizeContainer) {
    sizeContainer.innerHTML = "";
    currentProduct.sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.className = "size-btn";
      btn.textContent = size;
      if (size === selectedSize) btn.classList.add("active");
      btn.addEventListener("click", () => selectSize(size, btn));
      sizeContainer.appendChild(btn);
    });
  }

  // Quantity controls
  const decreaseBtn = document.getElementById("qty-decrease");
  const increaseBtn = document.getElementById("qty-increase");

  if (decreaseBtn) {
    if (!decreaseBtn.dataset.bound) {
      decreaseBtn.addEventListener("click", () => changeQty(-1));
      decreaseBtn.dataset.bound = "1";
    }
  }
  if (increaseBtn) {
    if (!increaseBtn.dataset.bound) {
      increaseBtn.addEventListener("click", () => changeQty(1));
      increaseBtn.dataset.bound = "1";
    }
  }

  // Add to cart button
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    if (!addToCartBtn.dataset.bound) {
      addToCartBtn.addEventListener("click", addToCartFromModal);
      addToCartBtn.dataset.bound = "1";
    }
  }

  // Buy now button
  const buyNowBtn = document.getElementById("buy-now-btn");
  if (buyNowBtn) {
    if (!buyNowBtn.dataset.bound) {
      buyNowBtn.addEventListener("click", buyNowFromModal);
      buyNowBtn.dataset.bound = "1";
    }
  }

  // Custom color picker (evitar redeclarar la variable, ya obtenida arriba)
  if (typeof customColorPicker !== "undefined" && customColorPicker) {
    if (!customColorPicker.dataset.bound) {
      customColorPicker.addEventListener("change", (e) => {
        const customHex = e.target.value;
        selectColor("custom", true, customHex);
      });
      customColorPicker.dataset.bound = "1";
    }
  }

  // Close button
  const closeBtn = document.getElementById("modal-close");
  if (closeBtn) {
    if (!closeBtn.dataset.bound) {
      closeBtn.addEventListener("click", closeModal);
      closeBtn.dataset.bound = "1";
    }
  }
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
  if (modalKeydownAttached) {
    window.removeEventListener("keydown", onModalKeydown);
    modalKeydownAttached = false;
  }
  currentIndexInVisible = -1;
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
    if (imgEl) {
      imgEl.src = currentProduct.images[color];
      console.log(`Imagen cambiada a: ${currentProduct.images[color]}`);
    }
  } else {
    const fallbackSrc =
      currentProduct.images.default ||
      currentProduct.images.blanco ||
      Object.values(currentProduct.images)[0] ||
      "https://via.placeholder.com/560x560?text=Sin+imagen";
    if (imgEl) {
      imgEl.src = fallbackSrc;
      console.log(`Imagen fallback: ${fallbackSrc}`);
    }
  }

  // Deseleccionar todos los colores principales
  document
    .querySelectorAll(".swatch")
    .forEach((s) => s.classList.remove("active"));

  // Resetear el color picker personalizado si se selecciona un color principal
  const customColorPicker = document.getElementById("custom-color-picker");
  if (!custom && customColorPicker) {
    customColorPicker.value = "#ffffff";
  }

  // Activar el color seleccionado solo si no es personalizado
  if (!custom) {
    const btn = Array.from(document.querySelectorAll(".swatch")).find(
      (b) => b.dataset.color === color
    );
    if (btn) btn.classList.add("active");
  }

  // Si venimos de una advertencia, guiar al siguiente paso o auto-ejecutar
  try {
    const hasColor = selectedColor && selectedColor !== "default";
    const hasSize = !!selectedSize;
    if (__autoAddAfterValidation && hasColor && !hasSize) {
      // Mostrar alerta de talla pendiente con accesos directos
      const sizeButtons = Array.from(
        document.querySelectorAll("#size-options .size-btn")
      );
      const actions = sizeButtons.map((btn) => {
        const s = (btn.textContent || "").trim();
        return { label: s, onClick: () => btn.click() };
      });
      showAlert("Selecciona tu talla", actions);
    } else if (__autoAddAfterValidation && hasColor && hasSize) {
      __autoAddAfterValidation = false;
      try {
        closeAlert();
      } catch (e) {}
      if (__lastIntent === "buy") {
        buyNowFromModal();
      } else {
        addToCartFromModal();
      }
    }
  } catch (e) {}
}

function selectSize(size, btnEl) {
  selectedSize = size;

  // Clear size validation error
  const sizeError = document.getElementById("size-error");
  if (sizeError) sizeError.style.display = "none";

  document
    .querySelectorAll(".size-btn")
    .forEach((s) => s.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  // Recalcular precio inmediatamente para aplicar +RD$50 a XL+
  try {
    updateModalPrice();
  } catch (e) {}

  // Si venimos de una advertencia: si falta color, pedirlo; si ya está, auto-ejecutar
  try {
    const hasColor = selectedColor && selectedColor !== "default";
    const hasSize = !!selectedSize;
    if (__autoAddAfterValidation && !hasColor && hasSize) {
      const actions = [
        {
          label: "Elegir color",
          onClick: () => {
            const el = document.getElementById("color-swatches");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          },
        },
      ];
      showAlert("Por favor selecciona un color", actions);
    } else if (__autoAddAfterValidation && hasColor && hasSize) {
      __autoAddAfterValidation = false;
      try {
        closeAlert();
      } catch (e) {}
      if (__lastIntent === "buy") {
        buyNowFromModal();
      } else {
        addToCartFromModal();
      }
    }
  } catch (e) {}
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
  // Actualizar precios del lado izquierdo
  const currentPriceLeft = document.getElementById("current-price-left");
  const totalPriceLeft = document.getElementById("total-price-left");

  if (currentPriceLeft) {
    let tierText = "";
    if (quantity >= 3) {
      tierText = "MAYOR";
    } else {
      tierText = "DETALLE";
    }
    currentPriceLeft.textContent = `RD$${unit} c/u • ${tierText}`;
  }

  if (totalPriceLeft) {
    totalPriceLeft.textContent = `Total: RD$${total}`;

    // Mostrar ahorro si aplica
    const retailPrice = currentProduct.price.retail;
    const savings = (retailPrice - unit) * quantity;
    if (savings > 0) {
      totalPriceLeft.textContent += ` (Ahorras RD$${savings})`;
    }
  }
}

// Validar selecciones obligatorias
function validateSelections() {
  let isValid = true;

  // Validar color (solo si el producto ofrece opciones de color)
  const colorError = document.getElementById("color-error");
  const productHasColorOptions = Boolean(
    (currentProduct && Array.isArray(currentProduct.colors) && currentProduct.colors.length > 0) ||
      (currentProduct && currentProduct.images && Object.keys(currentProduct.images).length > 1)
  );
  const missingColor = productHasColorOptions
    ? selectedColor === "default" || !selectedColor || selectedColor === "N/A"
    : false;
  if (missingColor) {
    if (colorError) colorError.style.display = "block";
    isValid = false;
  } else {
    if (colorError) colorError.style.display = "none";
  }

  // Validar talla
  const sizeError = document.getElementById("size-error");
  const missingSize = !selectedSize;
  if (missingSize) {
    if (sizeError) sizeError.style.display = "block";
    isValid = false;
  } else {
    if (sizeError) sizeError.style.display = "none";
  }

  // Flujo secuencial: primero color, luego talla
  if (missingColor) {
    const actions = [
      {
        label: "Elegir color",
        onClick: () => {
          const sw = document.getElementById("color-swatches");
          if (sw) {
            sw.scrollIntoView({ behavior: "smooth", block: "center" });
            try {
              sw.classList.add("pulse");
              setTimeout(() => sw.classList.remove("pulse"), 1200);
            } catch (e) {}
          }
        },
      },
    ];
    try {
      showAlert("Por favor selecciona un color", actions);
    } catch (e) {
      alert("Por favor selecciona un color");
    }
    return false;
  }
  if (missingSize) {
    const actions = [];
    if (currentProduct && Array.isArray(currentProduct.sizes)) {
      currentProduct.sizes.forEach((sz) => {
        actions.push({
          label: sz,
          onClick: () => {
            const btn = Array.from(document.querySelectorAll(".size-btn")).find(
              (b) => (b.textContent || "").trim() === sz
            );
            selectSize(sz, btn);
          },
        });
      });
    }
    try {
      showAlert("Selecciona tu talla", actions);
    } catch (e) {
      alert("Selecciona tu talla");
    }
    return false;
  }

  return isValid;
}

// Compra directa por WhatsApp
function generateOrderId() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const MM = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return `FM-${yy}${MM}${dd}-${hh}${mm}${ss}`;
}

async function buyNowFromModal() {
  __lastIntent = "buy";
  if (!currentProduct) return;
  if (!validateSelections()) {
    __autoAddAfterValidation = true;
    return;
  }

  // Cerrar UI que puede tapar el formulario de datos del cliente
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
    ? `Personalizado (${selectedColorHex})`
    : colorNames[selectedColor] || selectedColor;

  const unitPrice = calculatePrice(
    quantity,
    currentProduct.price,
    selectedSize
  );
  const subtotal = unitPrice * quantity;
  const savings = (currentProduct.price.retail - unitPrice) * quantity;

  // Determinar tier
  let tierBadge = "";
  if (quantity >= 12) tierBadge = "🎯 DOCENA";
  else if (quantity >= 3) tierBadge = "📦 MAYOR";
  else tierBadge = "🛍️ DETALLE";

  const colorEmoji = getColorEmoji(colorKey);

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
  const tierText =
    quantity >= 12 ? "DOCENA" : quantity >= 3 ? "MAYOR" : "DETALLE";
  message += `Cantidad: ${quantity} un. [${tierText}]\n`;
  message += `Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
  message += `Subtotal: RD$${subtotal.toFixed(2)}\n`;

  if (savings > 0) {
    message += `Ahorro: RD$${savings.toFixed(2)}\n`;
  }

  message += `\nTOTAL: RD$${subtotal.toFixed(2)}\n\n`;
  message += `Precios mayoristas desde 3 unidades\n`;
  message += `Envíos a toda República Dominicana`;

  const whatsappUrl = `https://wa.me/18093027761?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");

  closeModal();
}

function collectCustomerInfo() {
  return new Promise((resolve) => {
    try {
      // Asegurar que el modal de datos del cliente exista
      try {
        ensureSharedUI();
      } catch (e) {}
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
      }, 50);
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

function addToCartFromModal() {
  __lastIntent = "add";
  if (!currentProduct) return;
  if (!validateSelections()) {
    __autoAddAfterValidation = true;
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

  const existing = cart.find(
    (i) =>
      i.id === currentProduct.id &&
      i.colorKey === colorKey &&
      i.size === selectedSize
  );

  if (existing) {
    existing.qty += quantity;
  } else {
    const newItem = {
      id: currentProduct.id,
      name: getDisplayNameSection(currentProduct),
      code: currentProduct.code,
      basePrice: currentProduct.price,
      colorKey,
      colorDisplay,
      colorHex: selectedColorHex,
      size: selectedSize,
      qty: quantity,
      image: imageToUse,
      imageOriginal: currentProduct.images.default || null,
    };
    cart.push(newItem);
  }

  renderCart();
  saveCart();
  closeModal();
}

// Funciones del carrito
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Carrito vacío</div>';
    totalEl.textContent = "0";
    updateCartBadge(0);
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const unitPrice = calculatePrice(item.qty, item.basePrice, item.size);
    const subtotal = unitPrice * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item-professional";

    const imageHtml =
      item.image || item.imageOriginal
        ? `<div class="cart-item-image">
           <img src="${item.image || item.imageOriginal}" alt="${item.name}">
         </div>`
        : `<div class="cart-item-image cart-item-no-image">
           <div class="no-image-placeholder"></div>
         </div>`;

    div.innerHTML = `
      ${imageHtml}
      <div class="cart-item-details">
        <div class="cart-item-header">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-code">Código: ${item.code}</span>
        </div>
        <div class="cart-item-specs">
          <span class="cart-spec">Talla: ${item.size}</span>
          <span class="cart-spec">Color: ${item.colorDisplay}</span>
        </div>
        <div class="cart-item-pricing">
          <div class="cart-qty-control">
            <button class="qty-btn-cart" onclick="updateQty(${index}, ${
      item.qty - 1
    })">−</button>
            <span class="qty-display-cart">${item.qty}</span>
            <button class="qty-btn-cart" onclick="updateQty(${index}, ${
      item.qty + 1
    })">+</button>
          </div>
          <div class="cart-price-info">
            <span class="unit-price">RD$${unitPrice.toFixed(2)} c/u</span>
            <span class="subtotal-price">RD$${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button class="cart-remove-professional" onclick="removeFromCart(${index})">×</button>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = total.toFixed(2);
  updateCartBadge(cart.length); // Número de artículos únicos, no cantidad total
}

function updateCartBadge(count) {
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

function updateQty(index, value) {
  const qty = parseInt(value) || 1;
  if (qty < 1) {
    removeFromCart(index);
  } else {
    cart[index].qty = qty;
    renderCart();
    saveCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  saveCart();
}

function toggleCart() {
  const sidebar = document.getElementById("cart-sidebar");
  if (!sidebar) return;
  const opening = !sidebar.classList.contains("active");
  sidebar.classList.toggle("active");
  const overlay = document.getElementById("cart-overlay");
  if (overlay) overlay.classList.toggle("active", opening);
  if (opening) {
    document.addEventListener("keydown", onEscForCart);
  } else {
    document.removeEventListener("keydown", onEscForCart);
  }
}

function closeCart() {
  const sidebar = document.getElementById("cart-sidebar");
  if (!sidebar) return;
  sidebar.classList.remove("active");
  const overlay = document.getElementById("cart-overlay");
  if (overlay) overlay.classList.remove("active");
  document.removeEventListener("keydown", onEscForCart);
}

function onEscForCart(e) {
  if (e.key === "Escape") closeCart();
}

// Persistencia del carrito
function saveCart() {
  try {
    localStorage.setItem("fm_cart_v1", JSON.stringify(cart));
  } catch (e) {
    console.warn("No se pudo guardar carrito", e);
  }
}

function loadCart() {
  try {
    const raw = localStorage.getItem("fm_cart_v1");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) cart = parsed;
  } catch (e) {
    console.warn("No se pudo cargar carrito", e);
  }
}

// Ensure the shared UI elements (cart sidebar and product modal) exist in the document.
function ensureSharedUI() {
  // cart-sidebar
  if (!document.getElementById("cart-sidebar")) {
    const cartHtml = `
      <div id="cart-overlay" class="cart-overlay"></div>
      <aside class="cart-sidebar-professional" id="cart-sidebar">
        <div class="cart-header-professional">
          <h2 class="cart-title-professional">TU CARRITO</h2>
          <button class="cart-close-professional" id="close-cart">×</button>
        </div>
        <div class="cart-content-professional">
          <div class="cart-items-professional" id="cart-items"></div>
          <div class="cart-footer-professional">
            <div class="cart-summary">
              <div class="cart-total-professional">
                <span class="total-label">TOTAL</span>
                <span class="total-amount" id="cart-total">RD$0.00</span>
              </div>
              <div id="savings-display" class="savings-info-professional"></div>
            </div>
            <textarea id="note" class="cart-note-professional" placeholder="Instrucciones especiales, dirección de entrega..." rows="3"></textarea>
            <button id="checkoutBtn" class="checkout-btn-professional">
              ENVIAR PEDIDO POR WHATSAPP
            </button>
          </div>
        </div>
      </aside>`;
    document.body.insertAdjacentHTML("beforeend", cartHtml);

    // Cerrar carrito al hacer click en el overlay
    const overlay = document.getElementById("cart-overlay");
    if (overlay && !overlay.dataset.bound) {
      overlay.addEventListener("click", () => {
        const sidebar = document.getElementById("cart-sidebar");
        if (sidebar && sidebar.classList.contains("active")) {
          toggleCart();
        }
      });
      overlay.dataset.bound = "1";
    }
  }

  // product-modal
  if (!document.getElementById("product-modal")) {
    const modalHtml = `
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
            <div class="left-title-block" style="margin: .75rem 0 1rem 0; text-align:center;">
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
          
          <!-- Lado derecho: Información del producto -->
          <div class="modal-product-details-zara">
            
            <!-- Precio principal removido por diseño -->
            
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
            
            <!-- Detalles del producto -->
            <div class="product-details-accordion-zara">
              <details class="detail-section-zara">
                <summary>DETALLES DEL PRODUCTO</summary>
                <div class="detail-content-zara">
                  <p>Crop top confeccionado con materiales premium. Diseño moderno y versátil.</p>
                  <ul>
                    <li>Material: Algodón 95% + Spandex 5%</li>
                    <li>Gramaje: 180 GSM</li>
                    <li>Cuidado: Lavable a máquina 30°C</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");
    if (prevBtn) prevBtn.addEventListener("click", () => navigateModal(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => navigateModal(1));
  }

  // alert-modal unificado (si falta)
  if (!document.getElementById("alert-modal")) {
    const alertHtml = `
      <div id="alert-modal" class="alert-modal">
        <div class="alert-content">
          <h3>¡Atención!</h3>
          <p id="alert-message">Por favor selecciona el color y la talla antes de continuar.</p>
          <div id="alert-actions" style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:1rem;"></div>
          <button class="alert-btn" onclick="closeAlert()">Entendido</button>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", alertHtml);
  }

  // Modal de alerta unificado (estilo Blusas)
  function showAlert(message, actions = []) {
    try {
      const modal = document.getElementById("alert-modal");
      const msgEl = document.getElementById("alert-message");
      const actionsEl = document.getElementById("alert-actions");
      if (msgEl) msgEl.textContent = message || "";
      if (actionsEl) {
        actionsEl.innerHTML = "";
        (actions || []).forEach((act) => {
          const btn = document.createElement("button");
          // Usar misma clase global que el resto de secciones para estilo consistente
          btn.className = "alert-btn";
          btn.textContent = act && act.label ? String(act.label) : "OK";
          btn.addEventListener("click", () => {
            try {
              if (act && typeof act.onClick === "function") act.onClick();
            } finally {
              closeAlert();
            }
          });
          actionsEl.appendChild(btn);
        });
      }
      if (modal) modal.classList.add("active");
    } catch (e) {
      try {
        alert(message);
      } catch (_) {}
    }
  }

  function closeAlert() {
    const modal = document.getElementById("alert-modal");
    if (modal) modal.classList.remove("active");
  }

  // Exponer funciones de alerta globalmente (para onClick inline)
  window.showAlert = showAlert;
  window.closeAlert = closeAlert;
  // Modal ligero para capturar datos del cliente (nombre y ciudad)
  if (!document.getElementById("customer-name-modal")) {
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
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Ensure shared overlays exist first
  try {
    ensureSharedUI();
  } catch (e) {}

  loadCart();
  renderCropTops();
  renderCart();

  // Búsqueda
  const searchInput = document.getElementById("site-search");
  if (searchInput) {
    // Precargar desde ?q=
    try {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get("q");
      if (qParam) {
        searchInput.value = qParam;
        searchQuery = qParam;
        renderCropTops();
      }
    } catch (e) {}
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value || "";
      renderCropTops();
    });
  }

  // Botones del carrito
  const cartBtn = document.getElementById("cart-open");
  const fabCart = document.getElementById("fab-cart");
  const closeCart = document.getElementById("close-cart");

  if (cartBtn) cartBtn.addEventListener("click", toggleCart);
  if (fabCart) fabCart.addEventListener("click", toggleCart);
  if (closeCart) closeCart.addEventListener("click", toggleCart);

  // Checkout
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async () => {
      if (cart.length === 0) {
        alert("Carrito vacío");
        return;
      }

      // Cerrar el carrito para que no tape el formulario
      try {
        closeCart();
      } catch (e) {}

      const customer = await collectCustomerInfo();
      if (customer === null) return;

      const note = document.getElementById("note")
        ? document.getElementById("note").value.trim()
        : "";
      const orderId = generateOrderId();
      const now = new Date();
      const dateStr = now.toLocaleString();

      let header = `FabricaMayorista\n`;
      header += `Pedido: ${orderId}\n`;
      header += `Fecha: ${dateStr}\n`;
      if (customer && customer.name) header += `Cliente: ${customer.name}\n`;
      if (customer && customer.city) header += `Ciudad: ${customer.city}\n`;
      header += `------------------------------\n\n`;

      let body = "";
      let totalSavings = 0;

      cart.forEach((i, idx) => {
        const unitPrice = calculatePrice(i.qty, i.basePrice, i.size);
        const subtotal = unitPrice * i.qty;
        const savings = (i.basePrice.retail - unitPrice) * i.qty;
        totalSavings += savings;

        const tierBadge =
          i.qty >= 12 ? "DOCENA" : i.qty >= 3 ? "MAYOR" : "DETALLE";

        body += `*${idx + 1}) ${i.name}*\n`;
        body += `   Código: ${i.code}\n`;
        body += `   Talla: ${i.size}\n`;
        body += `   Color: ${i.colorDisplay || i.colorKey}\n`;
        body += `   Cantidad: ${i.qty} un. [${tierBadge}]\n`;
        body += `   Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
        body += `   Subtotal: RD$${subtotal.toFixed(2)}\n`;
        if (savings > 0) {
          body += `   Ahorro: RD$${savings.toFixed(2)}\n`;
        }
        body += `\n------------------------------\n`;
      });

      const total = cart.reduce(
        (sum, i) => sum + calculatePrice(i.qty, i.basePrice, i.size) * i.qty,
        0
      );

      let footer = `\n*RESUMEN DEL PEDIDO*\n`;
      footer += `Total: *RD$${total.toFixed(2)}*\n`;
      if (totalSavings > 0) {
        footer += `Ahorro total: *RD$${totalSavings.toFixed(2)}*\n`;
      }
      if (note) {
        footer += `\n*Nota del cliente:*\n${note}\n`;
      }
      footer += `\nPrecios mayoristas desde 3 unidades\n`;
      footer += `Envíos a toda República Dominicana`;

      const msg = header + body + footer;
      const wa = `https://wa.me/18093027761?text=${encodeURIComponent(msg)}`;

      try {
        window.open(wa, "_blank");
      } catch (e) {
        console.error("Error abriendo WhatsApp", e);
      }
    });
  }

  // Modal controls
  const modal = document.getElementById("product-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.id === "product-modal") closeModal();
    });
  }

  // Los handlers del modal (cerrar, cantidad, añadir al carrito, comprar ahora)
  // se adjuntan en setupModalControls con protección anti-duplicados.

  // Ocultar FABs cuando el footer es visible para que no choquen con el footer
  try {
    const footer = document.querySelector("footer.site-footer");
    const socialFabContainer = document.querySelector(".social-fab-container");
    const fabCart = document.getElementById("fab-cart");
    if (footer && (socialFabContainer || fabCart)) {
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
            apply(socialFabContainer, "2rem");
            apply(fabCart, "2rem");
          });
        },
        { root: null, threshold: 0.01 }
      );
      observer.observe(footer);
    }
  } catch (err) {
    console.warn("FAB lift observer error:", err);
  }
});

// Hacer funciones globales para los event handlers inline
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
