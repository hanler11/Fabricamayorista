// app.js — versión limpia implementada

// Generar productos 001..054 según la convención de imágenes indicada por el usuario.
const products = [];

// console.log('[app.js] cargado');

function pad(n) {
  return String(n).padStart(3, "0");
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

// 001..002 ahora tienen UNA sola imagen: Images/NNN/NNN.jpg (003 eliminado)
for (let i = 1; i <= 2; i++) {
  const id = pad(i);
  const images = { default: `Images/${id}/${id}.jpg` };
  products.push({
    id,
    name: `Artículo ${id}`,
    code: `FM-00${id}`,
    price: { retail: 450, dozen: 375 },
    images,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  });
}

// 004..054 tendrán una sola imagen dentro de una carpeta Images/NNN/NNN.jpg
for (let i = 4; i <= 54; i++) {
  const id = pad(i);
  const images = { default: `Images/${id}/${id}.jpg` };
  products.push({
    id,
    name: `Artículo ${id}`,
    code: `FM-00${id}`,
    price: { retail: 450, dozen: 375 },
    images,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  });
}

// 025..155 nuevos productos con códigos FM y colores actualizados
for (let i = 25; i <= 155; i++) {
  const id = pad(i);
  const images = { default: `Images/${id}/${id}.jpg` };
  products.push({
    id,
    name: `Artículo ${id}`,
    code: `FM-00${id}`,
    price: { retail: 450, dozen: 375 },
    images,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  });
}

// Aplicar precios específicos para crop tops
function applySpecificPrices() {
  const specificPrices = {
    // Bodys 001..008
    "001": { retail: 300, wholesale: 300, dozen: 225 },
    "002": { retail: 200, wholesale: 200, dozen: 150 },
    "003": { retail: 300, wholesale: 300, dozen: 225 },
    "004": { retail: 200, wholesale: 200, dozen: 150 },
    "005": { retail: 200, wholesale: 200, dozen: 150 },
    "006": { retail: 300, wholesale: 300, dozen: 225 },
    "007": { retail: 350, wholesale: 350, dozen: 300 },
    "008": { retail: 350, wholesale: 350, dozen: 300 },
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

    // Blusas
    "049": { retail: 450, dozen: 375 },
    "050": { retail: 300, dozen: 275 },
  };

  Object.entries(specificPrices).forEach(([productId, prices]) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      product.price = prices;
    }
  });

  // Aplicar nombres específicos
  const specificNames = {
    // Crop Tops 009-048
    "009": "Crop Top",
    "010": "Crop Top",
    "011": "Crop Top",
    "012": "Crop Top",
    "013": "Crop Top",
    "014": "Crop Top",
    "015": "Crop Top",
    "016": "Crop Top",
    "017": "Crop Top",
    "018": "Crop Top",
    "019": "Crop Top",
    "020": "Crop Top",
    "021": "Crop Top",
    "022": "Crop Top",
    "023": "Crop Top",
    "024": "Crop Top",
    "025": "Crop Top",
    "026": "Crop Top",
    "027": "Crop Top",
    "028": "Crop Top",
    "029": "Crop Top",
    "030": "Crop Top",
    "031": "Crop Top",
    "032": "Crop Top",
    "033": "Crop Top",
    "034": "Crop Top",
    "035": "Crop Top",
    "036": "Crop Top",
    "037": "Crop Top",
    "038": "Crop Top",
    "039": "Crop Top",
    "040": "Crop Top",
    "041": "Crop Top",
    "042": "Crop Top",
    "043": "Crop Top",
    "044": "Crop Top",
    "045": "Crop Top",
    "046": "Crop Top",
    "047": "Crop Top",
    "048": "Crop Top",
    // Blusas
    "049": "Blusa doble vuelo abajo",
    "050": "Blusa manga corta (canelito)",
    // Bodys 001..008 (los 001 y 002 ya se renombran más abajo y se conservan)
    "003": "Body manga larga",
    "004": "Body perchita/cuadrado y espalda afuera",
    "005": "Body manga corta de un forro",
    "006": "Body manga corta doble forro",
    "007": "Body manga corta arruchada",
    "008": "Body manga larga arruchada",
    // Vestidos con descripción específica
    "067": "Vestido (punto escuba, Seúl)",
    "069": "Vestido (Seúl)",
    "070": "Vestido Seúl y Liverpool",
    "072": "Vestido Seúl y Liverpool",
    "074": "Vestido tela micro o algodón",
    "083": "Vestido Seúl",
    "093": "Vestido punto escuba Seúl/Liverpool",
    "095": "Vestido punto escuba y Seúl (otra tela)",
    102: "Vestido licra Everly Carioca",
    110: "Vestido Liverpool",
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

// Unificar precios: usar 2 niveles (unidad y mayor 3+ = docena) para crop tops
products.forEach((p) => {
  if (p && p.price) {
    const num = parseInt(p.id, 10);
    // Para crop tops (009-048), usar sistema de 2 niveles
    if (!isNaN(num) && num >= 9 && num <= 48) {
      const dozen =
        p.price.dozen !== undefined ? Number(p.price.dozen) : undefined;
      if (dozen !== undefined && !Number.isNaN(dozen)) {
        p.price.wholesale = dozen; // Mayor (3+) igual a docena
      }
    }
  }
});

// ==========================
// Sección: Danza (nueva categoría)
// Dataset con imágenes en Images/danza/ y 3 tiers de precio
// ==========================
(function seedDanza() {
  const danzaItems = [
    {
      id: "3056",
      name: "Pantalón de danza colores lizos",
      code: "3056",
      price: { retail: 550, wholesale: 450, dozen: 400 },
    },
    {
      id: "3057",
      name: "Pantalón de danza dorado",
      code: "3057",
      price: { retail: 650, wholesale: 550, dozen: 500 },
    },
    {
      id: "0001",
      name: "Efod 1",
      code: "0001",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0002",
      name: "Efod 2",
      code: "0002",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0003",
      name: "Efod 3",
      code: "0003",
      price: { retail: 1700, wholesale: 1400, dozen: 1400 },
    },
    {
      id: "0004",
      name: "Efod 4",
      code: "0004",
      price: { retail: 1700, wholesale: 1400, dozen: 1400 },
    },
    {
      id: "0005",
      name: "Efod 5",
      code: "0005",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0006",
      name: "Efod 6",
      code: "0006",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0007",
      name: "Efod 7",
      code: "0007",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0008",
      name: "Efod 8",
      code: "0008",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0009",
      name: "Efod 9",
      code: "0009",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0010",
      name: "Efod 10",
      code: "0010",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0011",
      name: "Efod 11",
      code: "0011",
      price: { retail: 1800, wholesale: 1300, dozen: 1300 },
    },
    {
      id: "0012",
      name: "Efod 12",
      code: "0012",
      price: { retail: 1600, wholesale: 1400, dozen: 1400 },
    },
    {
      id: "0013",
      name: "Pantalón Aladino dorado",
      code: "0013",
      price: { retail: 700, wholesale: 500, dozen: 500 },
    },
    {
      id: "0014",
      name: "Efod 14",
      code: "0014",
      price: { retail: 2500, wholesale: 2200, dozen: 2200 },
    },
    {
      id: "0015",
      name: "Efod 15",
      code: "0015",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0016",
      name: "Efod 16 (completo)",
      code: "0016",
      price: { retail: 1900, wholesale: 1700, dozen: 1700 },
    },
    {
      id: "0017",
      name: "Efod 17",
      code: "0017",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0018",
      name: "Efod 18",
      code: "0018",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0019",
      name: "Efod 19",
      code: "0019",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0020",
      name: "Efod 20",
      code: "0020",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0021",
      name: "Efod 21",
      code: "0021",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0022",
      name: "Efod 22",
      code: "0022",
      price: { retail: 1900, wholesale: 1500, dozen: 1500 },
    },
    {
      id: "0023",
      name: "Falda-pantalón/Body",
      code: "0023",
      price: { retail: 1500, wholesale: 1300, dozen: 1300 },
    },
    {
      id: "0024",
      name: "Falda-pantalón/Body",
      code: "0024",
      price: { retail: 1200, wholesale: 1000, dozen: 1000 },
    },
    {
      id: "0025",
      name: "Efod 25",
      code: "0025",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0026",
      name: "Efod 26",
      code: "0026",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0027",
      name: "Efod 27",
      code: "0027",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0028",
      name: "Efod 28",
      code: "0028",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0029",
      name: "Efod 29",
      code: "0029",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0030",
      name: "Efod 30",
      code: "0030",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0031",
      name: "Efod 31",
      code: "0031",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0032",
      name: "Efod 32",
      code: "0032",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0033",
      name: "Efod 33",
      code: "0033",
      price: { retail: 1400, wholesale: 1100, dozen: 1100 },
    },
    {
      id: "0034",
      name: "Efod 34",
      code: "0034",
      price: { retail: 1600, wholesale: 1400, dozen: 1400 },
    },
    {
      id: "0035",
      name: "Efod 35",
      code: "0035",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0036",
      name: "Efod 36",
      code: "0036",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0037",
      name: "Efod 37",
      code: "0037",
      price: { retail: 1600, wholesale: 1400, dozen: 1400 },
    },
    {
      id: "0038",
      name: "Efod 38",
      code: "0038",
      price: { retail: 2000, wholesale: 1800, dozen: 1800 },
    },
    {
      id: "0039",
      name: "Efod 39",
      code: "0039",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0040",
      name: "Efod 40",
      code: "0040",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0041",
      name: "Efod 41",
      code: "0041",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0042",
      name: "Efod 42",
      code: "0042",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0043",
      name: "Efod 43",
      code: "0043",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0044",
      name: "Efod 44",
      code: "0044",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0045",
      name: "Efod 45",
      code: "0045",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
    {
      id: "0046",
      name: "Falda doble",
      code: "0046",
      price: { retail: 800, wholesale: 600, dozen: 600 },
    },
    {
      id: "0047",
      name: "Efod 47",
      code: "0047",
      price: { retail: 2500, wholesale: 2000, dozen: 2000 },
    },
    {
      id: "0048",
      name: "Chaleco hombre",
      code: "0048",
      price: { retail: 1700, wholesale: 1400, dozen: 1400 },
    },
    {
      id: "0049",
      name: "Efod multiuso",
      code: "0049",
      price: { retail: 1200, wholesale: 950, dozen: 950 },
    },
    {
      id: "0050",
      name: "Efod 50",
      code: "0050",
      price: { retail: 1500, wholesale: 1200, dozen: 1200 },
    },
  ];

  danzaItems.forEach((item) => {
    products.push({
      id: item.id,
      name: item.name,
      code: item.code,
      category: "danza",
      price: item.price,
      // Estructura real: Images/danza/{code}/{code}.jpg
      images: { default: `Images/danza/${item.code}/${item.code}.jpg` },
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    });
  });
})();

// Debug: verificar que los precios se aplicaron correctamente
console.log("Producto 012:", products.find((p) => p.id === "012")?.price);
console.log("Producto 011:", products.find((p) => p.id === "011")?.price);

// Aplicar lista de precios proporcionada por el usuario (FM-00025 en adelante)
function applyPriceListMappings() {
  const map = {
    // Crop Tops 009-048 (incluye 009-024 pedidos)
    "009": { retail: 250, wholesale: 250, dozen: 200 },
    "010": { retail: 250, wholesale: 250, dozen: 200 },
    "011": { retail: 150, wholesale: 150, dozen: 150 },
    "012": { retail: 200, wholesale: 200, dozen: 150 },
    "013": { retail: 200, wholesale: 200, dozen: 150 },
    "014": { retail: 300, wholesale: 300, dozen: 250 },
    "015": { retail: 300, wholesale: 300, dozen: 250 },
    "016": { retail: 250, wholesale: 250, dozen: 200 },
    "017": { retail: 250, wholesale: 250, dozen: 200 },
    "018": { retail: 150, wholesale: 150, dozen: 100 },
    "019": { retail: 150, wholesale: 150, dozen: 100 },
    "020": { retail: 150, wholesale: 150, dozen: 100 },
    "021": { retail: 150, wholesale: 150, dozen: 100 },
    "022": { retail: 200, wholesale: 200, dozen: 150 },
    "023": { retail: 350, wholesale: 350, dozen: 250 },
    "024": { retail: 150, wholesale: 150, dozen: 100 },
    "025": { retail: 350, wholesale: 350, dozen: 300 },
    "026": { retail: 225, wholesale: 225, dozen: 150 },
    "027": { retail: 350, wholesale: 350, dozen: 250 },
    "028": { retail: 200, wholesale: 200, dozen: 150 },
    "029": { retail: 350, wholesale: 350, dozen: 300 },
    "030": { retail: 300, wholesale: 300, dozen: 250 },
    "031": { retail: 350, wholesale: 350, dozen: 300 },
    "032": { retail: 350, wholesale: 350, dozen: 300 },
    "033": { retail: 225, wholesale: 225, dozen: 200 },
    "034": { retail: 250, wholesale: 250, dozen: 200 },
    "035": { retail: 150, wholesale: 150, dozen: 100 },
    "036": { retail: 300, wholesale: 300, dozen: 250 },
    "037": { retail: 250, wholesale: 250, dozen: 200 },
    "038": { retail: 250, wholesale: 250, dozen: 200 },
    "039": { retail: 150, wholesale: 150, dozen: 100 },
    "040": { retail: 150, wholesale: 150, dozen: 100 },
    "041": { retail: 150, wholesale: 150, dozen: 100 },
    "042": { retail: 150, wholesale: 150, dozen: 100 },
    "043": { retail: 175, wholesale: 175, dozen: 125 },
    "044": { retail: 250, wholesale: 250, dozen: 200 },
    "045": { retail: 150, wholesale: 150, dozen: 100 },
    "046": { retail: 250, wholesale: 250, dozen: 200 },
    "047": { retail: 250, wholesale: 250, dozen: 200 },
    "048": { retail: 175, wholesale: 175, dozen: 150 },

    // Blusas 049-064
    "049": { retail: 450, wholesale: 450, dozen: 375 },
    "050": { retail: 300, wholesale: 300, dozen: 275 },
    "051": { retail: 450, wholesale: 450, dozen: 375 },
    "052": { retail: 350, wholesale: 350, dozen: 300 },
    "053": { retail: 350, wholesale: 350, dozen: 300 },
    "054": { retail: 550, wholesale: 550, dozen: 550 },
    "055": { retail: 450, wholesale: 450, dozen: 375 },
    "056": { retail: 450, wholesale: 450, dozen: 450 },
    "057": { retail: 450, wholesale: 450, dozen: 375 },
    "058": { retail: 450, wholesale: 450, dozen: 375 },
    "059": { retail: 450, wholesale: 450, dozen: 375 },
    "060": { retail: 450, wholesale: 450, dozen: 375 },
    "061": { retail: 350, wholesale: 350, dozen: 300 },
    "062": { retail: 350, wholesale: 350, dozen: 300 },
    "063": { retail: 300, wholesale: 300, dozen: 250 },
    "064": { retail: 500, wholesale: 500, dozen: 500 },

    // Vestidos 065-124
    "065": { retail: 950, wholesale: 700, dozen: 700 },
    "066": { retail: 1100, wholesale: 1100, dozen: 1100 },
    "067": { retail: 1000, wholesale: 1000, dozen: 1000 },
    "068": { retail: 1100, wholesale: 1100, dozen: 1000 },
    "069": { retail: 1200, wholesale: 1200, dozen: 1000 },
    "070": { retail: 1000, wholesale: 800, dozen: 800 },
    "071": { retail: 800, wholesale: 800, dozen: 650 },
    "072": { retail: 1100, wholesale: 1000, dozen: 900 },
    "073": { retail: 700, wholesale: 700, dozen: 600 },
    "074": { retail: 700, wholesale: 700, dozen: 600 },
    "075": { retail: 900, wholesale: 900, dozen: 900 },
    "076": { retail: 850, wholesale: 850, dozen: 850 },
    "077": { retail: 650, wholesale: 650, dozen: 600 },
    "078": { retail: 1000, wholesale: 1000, dozen: 1000 },
    "079": { retail: 300, wholesale: 300, dozen: 300 },
    "080": { retail: 450, wholesale: 450, dozen: 450 },
    "081": { retail: 500, wholesale: 500, dozen: 500 },
    "082": { retail: 300, wholesale: 300, dozen: 300 },
    "083": { retail: 1000, wholesale: 1000, dozen: 800 },
    "084": { retail: 600, wholesale: 600, dozen: 600 },
    "085": { retail: 600, wholesale: 600, dozen: 500 },
    "086": { retail: 600, wholesale: 600, dozen: 600 },
    "087": { retail: 800, wholesale: 800, dozen: 500 },
    "088": { retail: 700, wholesale: 700, dozen: 600 },
    "089": { retail: 500, wholesale: 500, dozen: 500 },
    "090": { retail: 600, wholesale: 600, dozen: 550 },
    "091": { retail: 800, wholesale: 800, dozen: 800 },
    "092": { retail: 800, wholesale: 800, dozen: 800 },
    "093": { retail: 1200, wholesale: 800, dozen: 700 },
    "094": { retail: 800, wholesale: 800, dozen: 800 },
    "095": { retail: 1500, wholesale: 1500, dozen: 1500 },
    "096": { retail: 450, wholesale: 450, dozen: 400 },
    "097": { retail: 750, wholesale: 750, dozen: 750 },
    "098": { retail: 600, wholesale: 600, dozen: 600 },
    "099": { retail: 1100, wholesale: 1100, dozen: 1100 },
    100: { retail: 700, wholesale: 700, dozen: 700 },
    101: { retail: 800, wholesale: 800, dozen: 700 },
    102: { retail: 1200, wholesale: 1200, dozen: 1200 },
    103: { retail: 600, wholesale: 600, dozen: 550 },
    104: { retail: 700, wholesale: 700, dozen: 700 },
    105: { retail: 700, wholesale: 700, dozen: 700 },
    106: { retail: 850, wholesale: 850, dozen: 850 },
    107: { retail: 600, wholesale: 600, dozen: 550 },
    108: { retail: 600, wholesale: 600, dozen: 600 },
    109: { retail: 800, wholesale: 800, dozen: 800 },
    110: { retail: 1000, wholesale: 1000, dozen: 1000 },
    111: { retail: 800, wholesale: 800, dozen: 600 },
    112: { retail: 1000, wholesale: 1000, dozen: 900 },
    113: { retail: 1000, wholesale: 800, dozen: 800 },
    114: { retail: 1000, wholesale: 1000, dozen: 1000 },
    115: { retail: 500, wholesale: 500, dozen: 475 },
    116: { retail: 450, wholesale: 450, dozen: 425 },
    117: { retail: 400, wholesale: 400, dozen: 350 },
    118: { retail: 400, wholesale: 400, dozen: 350 },
    119: { retail: 450, wholesale: 450, dozen: 400 },
    120: { retail: 450, wholesale: 450, dozen: 400 },
    121: { retail: 350, wholesale: 350, dozen: 300 },
    122: { retail: 550, wholesale: 550, dozen: 500 },
    123: { retail: 450, wholesale: 450, dozen: 400 },
    124: { retail: 800, wholesale: 800, dozen: 800 },

    // Faldas 125-133
    125: { retail: 400, wholesale: 400, dozen: 350 },
    126: { retail: 350, wholesale: 350, dozen: 350 },
    127: { retail: 300, wholesale: 300, dozen: 275 },
    128: { retail: 450, wholesale: 450, dozen: 400 },
    129: { retail: 400, wholesale: 400, dozen: 350 },
    130: { retail: 350, wholesale: 350, dozen: 350 },
    131: { retail: 500, wholesale: 500, dozen: 400 },
    132: { retail: 300, wholesale: 300, dozen: 250 },
    133: { retail: 400, wholesale: 400, dozen: 350 },

    // Pantalones 134-137
    134: { retail: 500, wholesale: 500, dozen: 450 },
    135: { retail: 350, wholesale: 350, dozen: 300 },
    136: { retail: 400, wholesale: 400, dozen: 350 },
    137: { retail: 350, wholesale: 350, dozen: 325 },

    // Conjuntos y Enterizos 138-155
    138: { retail: 500, wholesale: 500, dozen: 500 },
    139: { retail: 500, wholesale: 500, dozen: 450 },
    140: { retail: 500, wholesale: 500, dozen: 450 },
    141: { retail: 500, wholesale: 500, dozen: 450 },
    142: { retail: 500, wholesale: 500, dozen: 450 },
    143: { retail: 500, wholesale: 500, dozen: 450 },
    144: { retail: 450, wholesale: 450, dozen: 400 },
    145: { retail: 600, wholesale: 600, dozen: 600 },
    146: { retail: 600, wholesale: 600, dozen: 600 },
    147: { retail: 600, wholesale: 600, dozen: 550 },
    148: { retail: 600, wholesale: 600, dozen: 600 },
    149: { retail: 450, wholesale: 450, dozen: 400 },
    150: { retail: 450, wholesale: 450, dozen: 400 },
    151: { retail: 600, wholesale: 600, dozen: 600 },
    152: { retail: 450, wholesale: 450, dozen: 400 },
    153: { retail: 450, wholesale: 450, dozen: 400 },
    154: { retail: 600, wholesale: 600, dozen: 600 },
    155: { retail: 700, wholesale: 700, dozen: 600 },
  };

  // Aplicar a todos los productos que coincidan por id (puede haber duplicados en el arreglo)
  products.forEach((p) => {
    const prices = map[p.id];
    if (prices) p.price = { ...p.price, ...prices };
  });
}

applyPriceListMappings();

// Agregar producto 156 según petición del usuario: Pantalón campana / palazzo
// Precios: Unidad RD$490, Mayor (3x1000 -> aprox RD$333.33 c/u), Por docena RD$290 (por unidad)
products.push({
  id: "156",
  name: "Pantalón campana / Palazzo",
  code: "FM-00156",
  category: "pantalones",
  price: { retail: 490, wholesale: 1000 / 3, dozen: 290 },
  images: { default: `Images/156/156.jpg` },
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
});

// Agregar producto 157: pantalón similar a 156 con mismos precios e imagen 157.jpg
products.push({
  id: "157",
  name: "Pantalón campana / Palazzo (variante)",
  code: "FM-00157",
  category: "pantalones",
  price: { retail: 490, wholesale: 1000 / 3, dozen: 290 },
  images: { default: `Images/157/157.jpg` },
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
});

// Agregar producto 158: Pantalón Seúl que debe mostrarse en Pantalones y en Conjuntos
products.push({
  id: "158",
  name: "Pantalón Seúl",
  code: "FM-00158",
  // Lo colocamos por defecto en 'pantalones'
  category: "pantalones",
  // Precio por defecto (cuando se visualiza en Pantalones)
  price: { retail: 490, wholesale: 1000 / 3, dozen: 290 },
  // Precios alternativos cuando se muestra dentro de la sección 'conjuntos'
  altPrices: {
    conjuntos: { retail: 800, wholesale: 550, dozen: 490 },
  },
  // NOTE: No asignamos altCategories para evitar incluir 158 directamente en 'conjuntos'
  images: { default: `Images/158/158.jpg` },
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
});

// Agregar producto 159 según solicitud del usuario: Pantalón campana tela canalito uno
// Precios: Unidad RD$350, Mayor RD$300, Por docena RD$300
products.push({
  id: "159",
  name: "Pantalón campana tela canalito uno",
  code: "FM-00159",
  category: "pantalones",
  price: { retail: 350, wholesale: 300, dozen: 300 },
  images: { default: `Images/159/159.jpg` },
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  // Colores permitidos específicamente para este producto (solicitud del usuario)
  // Usar las claves del colorMap: 'verde', 'amarillo-dorado', 'rosado claro'
  colors: ["verde", "amarillo-dorado", "rosado claro"],
});

// Agregar producto 160: mismo esquema y precios que 159, colores solicitados
products.push({
  id: "160",
  name: "Pantalón campana tela canalito dos",
  code: "FM-00160",
  category: "pantalones",
  // Precios iguales a 159
  price: { retail: 350, wholesale: 300, dozen: 300 },
  images: { default: `Images/160/160.jpg` },
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  // Colores solicitados: negro, marrón, dorado y rojo
  colors: ["negro", "marron", "dorado", "rojo"],
});

// Agregar producto 161: Conjunto / Set solicitado por el usuario
products.push({
  id: "161",
  name: "Conjunto micro engomado completo",
  code: "FM-00161",
  category: "conjuntos",
  // Precios según detalles proporcionados por el usuario
  price: { retail: 750, wholesale: 500, dozen: 450 },
  images: { default: `Images/161/161.jpg` },
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  // Descripción para mostrar en el modal (se usará por openModal())
  description: `Conjunto o set. Tela micro engomado completo. Precios: Uno RD$750, Al por mayor RD$500, Por docena RD$450.`,
  // Colores actualizados según indicación del usuario
  colors: ["negro", "rosado claro", "verde"],
});

// Agregar producto 162: solicitado por el usuario (conjuntos)
products.push({
  id: "162",
  name: "Blusa micro pantalón en seul calidad y terminación de primera",
  code: "FM-00162",
  category: "conjuntos",
  // Precios proporcionados por el usuario
  price: { retail: 800, wholesale: 550, dozen: 450 },
  images: { default: `Images/162/162.jpg` },
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  // Descripción para el modal
  description: `Blusa micro pantalón en seul, calidad y terminación de primera. Precios: Uno RD$800, Al por mayor RD$550, Por docena RD$450.`,
  // Opcional: colores no especificados por el usuario; se dejará usar el conjunto global de colores
});

// Agregar producto 163: Conjunto de dos piezas solicitado por el usuario
products.push({
  id: "163",
  name: "Conjunto de dos piezas",
  code: "FM-00163",
  category: "conjuntos",
  // Precios proporcionados por el usuario
  price: { retail: 900, wholesale: 650, dozen: 590 },
  images: { default: `Images/163/163.jpg` },
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  // Descripción para el modal
  description: `Conjunto o set de dos piezas. Precios: Uno RD$900, Al por mayor RD$650, Por docena RD$590.`,
});

// Aplicar precios de 158 al conjunto 138 según indicación del usuario
(function apply158PricesTo138() {
  try {
    const prod138 = products.find((p) => p.id === "138");
    if (prod138) {
      prod138.price = { retail: 800, wholesale: 550, dozen: 490 };
    }
  } catch (e) {
    console.warn("apply158PricesTo138 error", e);
  }
})();

// Unificar precios no-Danza: usar 2 niveles (unidad y mayor 3+ = docena)
(function unifyNonDanzaPricing() {
  try {
    products.forEach((p) => {
      if (p && p.category !== "danza" && p.price) {
        const dozen =
          p.price.dozen !== undefined ? Number(p.price.dozen) : undefined;
        // Sólo establecer wholesale desde dozen si wholesale NO está explícitamente definido.
        if (
          dozen !== undefined &&
          !Number.isNaN(dozen) &&
          (p.price.wholesale === undefined || p.price.wholesale === null)
        ) {
          p.price.wholesale = dozen; // Mayor (3+) igual a docena solo si no hay wholesale
        }
      }
    });
  } catch (e) {
    console.warn("unifyNonDanzaPricing error", e);
  }
})();

// Renumeración visible de códigos (code) 001..024 tras eliminar 003
// Mantiene IDs internos para no romper rutas e integraciones; sólo cambia el código mostrado.
// Nota: se elimina renumeración visible para mantener la secuencia FM-00{id}

// Lista global de navegación: IDs únicas ordenadas numéricamente (para cruzar categorías)
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

// Listas auxiliares para navegación
function buildSortedUniqueIds(list) {
  const seen = new Set();
  const ids = list
    .map((p) => p && p.id)
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
}

function getNonDanzaIds() {
  try {
    return buildSortedUniqueIds(products.filter((p) => p.category !== "danza"));
  } catch (e) {
    return globalNavIds;
  }
}

function getDanzaIds() {
  try {
    return buildSortedUniqueIds(products.filter((p) => p.category === "danza"));
  } catch (e) {
    return buildSortedUniqueIds([]);
  }
}

// Exponer helpers para otras páginas (ej. crop-tops)
try {
  window.getNonDanzaIds = getNonDanzaIds;
  window.getDanzaIds = getDanzaIds;
} catch (e) {}

// Exponer el arreglo de productos al `window` para que otras páginas lo reutilicen
try {
  window.products = products;
} catch (e) {}

// Secciones de ropa
const seccionesRopa = [
  { id: "blusas", name: "Blusas", img: "Images/blusa/blusa.jpg" },
  { id: "vestidos", name: "Vestidos", img: "Images/vestido/vestido.jpg" },
  { id: "faldas", name: "Faldas", img: "Images/falda/falda.jpg" },
  {
    id: "pantalones",
    name: "Pantalones",
    img: "Images/pantalon/pantalon.jpg",
  },
  {
    id: "conjuntos",
    name: "Conjuntos",
    img: "Images/conjunto/conjunto.jpg",
  },
  {
    id: "enterizos",
    name: "Enterizos",
    img: "Images/enterizo/enterizo.jpg",
  },
  {
    id: "body",
    name: "Body",
    img: "Images/body/body.jpg",
  },
];

// Ajustar producto 001 para que sea "Body Manga Larga Doble Forro"
const prod001 = products.find((p) => p.id === "001");
if (prod001) {
  prod001.name = "Body Manga Larga Doble Forro";
  prod001.code = `FM-00${prod001.id}`;
  // Colores específicos para el producto 001
  prod001.colors = ["negro", "blanco", "rojo", "rojo vino", "azul"];
}
// Ajustar producto 002 para que sea la versión de un forro (nombre similar)
const prod002 = products.find((p) => p.id === "002");
if (prod002) {
  prod002.name = "Body Manga Larga Forro Simple"; // mismo diseño pero de un forro
  prod002.code = `FM-00${prod002.id}`;
  prod002.colors = ["negro", "blanco", "rojo", "rojo vino", "azul"];
}

// Configurar colores para productos 003 y 004
const prod003 = products.find((p) => p.id === "003");
if (prod003) {
  prod003.colors = [
    "negro",
    "blanco",
    "rojo",
    "rojo vino",
    "azul",
    "marron",
    "crema",
    "beige",
  ];
}

const prod004 = products.find((p) => p.id === "004");
if (prod004) {
  prod004.colors = [
    "negro",
    "blanco",
    "rojo",
    "rojo vino",
    "azul",
    "marron",
    "crema",
    "beige",
  ];
}

// Configurar producto 005 - mismos colores que 002 pero con crema
const prod005 = products.find((p) => p.id === "005");
if (prod005) {
  prod005.colors = ["negro", "blanco", "rojo", "rojo vino", "azul", "crema"];
}

// Producto 006 se deja sin configuración específica (usará todos los colores disponibles)

// Configurar productos 007 y 008 - mismos colores que 002
const prod007 = products.find((p) => p.id === "007");
if (prod007) {
  prod007.colors = ["negro", "blanco", "rojo", "rojo vino", "azul"];
}

const prod008 = products.find((p) => p.id === "008");
if (prod008) {
  prod008.colors = ["negro", "blanco", "rojo", "rojo vino", "azul"];
}

const colorMap = {
  azul: "#2563eb",
  blanco: "#ffffff",
  rojo: "#dc2626",
  negro: "#000000",
  "rojo vino": "#8b0000",
  "amarillo-dorado": "#fbbf24",
  "rosado claro": "#f9a8d4",
  verde: "#008000",
  naranja: "#ea580c",
  marron: "#a52a2a",
  dorado: "#daa520",
  crema: "#f5deb3",
  beige: "#f5f5dc",
};

const colorNames = {
  azul: "Azul",
  blanco: "Blanco",
  rojo: "Rojo",
  negro: "Negro",
  "rojo vino": "Rojo Vino",
  "amarillo-dorado": "Amarillo Dorado",
  "rosado claro": "Rosado Claro",
  verde: "Verde",
  naranja: "Naranja",
  marron: "Marrón",
  dorado: "Dorado",
  crema: "Crema",
  beige: "Beige",
  original: "Original (como en la foto)",
};

let cart = [];
let currentProduct = null;
let selectedColor = "default";
let selectedColorHex = "#e0e0e0";
let isCustomColor = false;
let selectedSize = null;
let selectedSizes = []; // Array para múltiples tallas
let selectedColors = []; // Array para múltiples colores (cuando quantity>1)
let quantity = 1;
let searchQuery = "";
// Estado para navegación dentro del modal
let visibleProductIds = [];
// Contexto de render actual (ej. 'pantalones', 'conjuntos') para ajustar precios y visibilidad
let currentRenderCategoryContext = null;
// Contexto desde el que se abrió el modal (se mantiene para usar altPrices en el modal)
let modalOpenContext = null;
let currentIndexInVisible = -1;
let modalKeydownAttached = false;
// Índice global para navegación por ID (permite cruzar categorías)
let currentIndexInGlobal = -1;
// Auto-add al carrito tras advertencias de validación
let __autoAddAfterValidation = false; // se activa cuando el usuario intentó añadir/comprar y faltaba color/talla
let __lastIntent = null; // 'add' | 'buy' (si se necesita diferenciar)

// Utilidad: normalizar texto para búsquedas (minúsculas + sin acentos)
function normalizeText(str) {
  try {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "");
  } catch (e) {
    // Fallback si el motor no soporta \p{Diacritic}
    return String(str || "").toLowerCase();
  }
}

// Palabras clave por categoría basadas en el ID numérico del producto
function getProductKeywords(p) {
  const idNum = parseInt(p.id, 10);
  if (!Number.isNaN(idNum)) {
    // Bodys 001..008
    if (idNum >= 1 && idNum <= 8) {
      return "body bodys bodie";
    }
    if (idNum >= 9 && idNum <= 48) {
      return "crop croptop crop-top crop tops croptops top tops";
    }
    // Vestidos 065..124
    if (idNum >= 65 && idNum <= 124) {
      return "vestido vestidos";
    }
    // Faldas 125..133
    if (idNum >= 125 && idNum <= 133) {
      return "falda faldas";
    }
    // Pantalones 134..137
    if (idNum >= 134 && idNum <= 137) {
      return "pantalon pantalones";
    }
    // Conjuntos 138..153
    if (idNum >= 138 && idNum <= 153) {
      return "conjunto conjuntos set";
    }
    // Enterizos 154..155
    if (idNum >= 154 && idNum <= 155) {
      return "enterizo enterizos";
    }
    // Blusas 049..064
    if (idNum >= 49 && idNum <= 64) return "blusa blusas";
    // 3053 eliminado
  }
  // genérico
  return "ropa prenda articulo";
}

// Detectar categoría destino a partir de una consulta
function detectCategoryFromQuery(raw) {
  const q = normalizeText(raw);
  if (!q) return null;
  // Crop Tops
  if (
    /(\bcrop\b|\bcrop\s*top\b|\bcrop\s*tops\b|\bcroptop\b|\bcroptops\b|\btop\b|\btops\b)/.test(
      q
    )
  )
    return "crop-tops";
  // Blusas
  if (/(\bblusa\b|\bblusas\b)/.test(q)) return "blusas";
  // Vestidos
  if (/(\bvestido\b|\bvestidos\b)/.test(q)) return "vestidos";
  if (/(\bvestido\b|\bvestidos\b)/.test(q)) return "vestidos";
  if (/(\bfalda\b|\bfaldas\b)/.test(q)) return "faldas";
  if (/(\bpantalon\b|\bpantalones\b)/.test(q)) return "pantalones";
  if (/(\bconjunto\b|\bconjuntos\b)/.test(q)) return "conjuntos";
  if (/(\bdanza\b)/.test(q)) return "danza";
  if (/(\benterizo\b|\benterizos\b)/.test(q)) return "enterizos";
  if (/(\bbody\b|\bbodys\b)/.test(q)) return "body";
  return null;
}

// Mostrar nombre amigable por categoría si el nombre aún es genérico
function getDisplayName(p) {
  const idNum = parseInt(p.id, 10);
  const isGeneric = !p.name || /^art[ií]culo\s/i.test(String(p.name));
  if (!Number.isNaN(idNum) && idNum >= 1 && idNum <= 8) {
    // Bodys
    if (isGeneric) return `Body ${p.code || `FM-00${p.id}`}`;
  }
  if (!Number.isNaN(idNum) && idNum >= 65 && idNum <= 124) {
    // Vestidos
    if (isGeneric) return `Vestido ${p.code || `FM-00${p.id}`}`;
  }
  if (!Number.isNaN(idNum) && idNum >= 125 && idNum <= 133) {
    // Faldas
    if (isGeneric) return `Falda ${p.code || `FM-00${p.id}`}`;
  }
  if (!Number.isNaN(idNum) && idNum >= 134 && idNum <= 137) {
    // Pantalones
    if (isGeneric) return `Pantalón ${p.code || `FM-00${p.id}`}`;
  }
  if (!Number.isNaN(idNum) && idNum >= 138 && idNum <= 153) {
    // Conjuntos
    if (isGeneric) return `Conjunto ${p.code || `FM-00${p.id}`}`;
  }
  if (!Number.isNaN(idNum) && idNum >= 154 && idNum <= 155) {
    // Enterizos
    if (isGeneric) return `Enterizo ${p.code || `FM-00${p.id}`}`;
  }
  if (p.category === "danza" && isGeneric) {
    return `Danza ${p.code}`;
  }
  return p.name || p.code || `FM-00${p.id}`;
}

// Renderizar un grid por categoría (ej. vestidos) respetando búsqueda
function renderCategoryGrid(category) {
  const container = document.getElementById("products-grid");
  if (!container) return;
  // Ajuste visual específico para Danza
  try {
    container.classList.toggle("danza-grid", category === "danza");
  } catch (e) {}
  const qNorm = normalizeText((searchQuery || "").trim());
  let inRange;
  switch (category) {
    case "body":
      // Body debe mostrar 001..008 propios (IDs de 3 dígitos) y excluir sólo los de Danza (category === 'danza' / IDs como "0001".."0008").
      inRange = (p) => {
        // Aceptar productos que explícitamente pertenecen a la categoría 'body'
        if (p && p.category === "body") return true;
        const n = parseInt(p.id, 10);
        if (Number.isNaN(n)) return false;
        // Rango de bodys por ID numérico
        const isBodyRange = n >= 1 && n <= 8;
        // Excluir explícitamente los productos marcados como Danza
        const isDanza = p.category === "danza";
        // Preferir los IDs de 3 dígitos ("001".."008") para Body
        const isThreeDigitId = typeof p.id === "string" && p.id.length === 3;
        return isBodyRange && !isDanza && isThreeDigitId;
      };
      break;
    case "vestidos":
      inRange = (p) => {
        if (p && p.category === "vestidos") return true;
        const n = parseInt(p.id, 10);
        return !Number.isNaN(n) && n >= 65 && n <= 124;
      };
      break;
    case "faldas":
      inRange = (p) => {
        if (p && p.category === "faldas") return true;
        const n = parseInt(p.id, 10);
        return !Number.isNaN(n) && n >= 125 && n <= 133;
      };
      break;
    case "pantalones":
      inRange = (p) => {
        // Mostrar productos cuyo campo category explícitamente sea 'pantalones'
        if (p && p.category === "pantalones") return true;
        // Permitir también productos que declaren altCategories including 'pantalones'
        if (
          p &&
          Array.isArray(p.altCategories) &&
          p.altCategories.includes("pantalones")
        )
          return true;
        const n = parseInt(p.id, 10);
        return !Number.isNaN(n) && n >= 134 && n <= 137;
      };
      break;
    case "conjuntos":
      inRange = (p) => {
        if (p && p.category === "conjuntos") return true;
        // Permitir también productos que declaren altCategories including 'conjuntos'
        if (
          p &&
          Array.isArray(p.altCategories) &&
          p.altCategories.includes("conjuntos")
        )
          return true;
        const n = parseInt(p.id, 10);
        return !Number.isNaN(n) && n >= 138 && n <= 153;
      };
      break;
    case "enterizos":
      inRange = (p) => {
        if (p && p.category === "enterizos") return true;
        const n = parseInt(p.id, 10);
        return !Number.isNaN(n) && n >= 154 && n <= 155;
      };
      break;
    case "danza":
      // Mostrar elementos marcados explícitamente como Danza
      inRange = (p) => p && p.category === "danza";
      break;
    default:
      inRange = () => false;
  }
  // Marcar contexto de render para que createProductCard pueda usar altPrices
  currentRenderCategoryContext = category;
  const list = products.filter((p) => inRange(p));
  const filtered = qNorm
    ? list.filter((p) =>
        normalizeText(
          `${p.name || ""} ${p.code || p.id || ""} ${getProductKeywords(p)}`
        ).includes(qNorm)
      )
    : list;
  if (filtered.length === 0) {
    container.innerHTML =
      '<div class="empty-state">No se encontraron productos en esta categoría</div>';
    return;
  }
  container.innerHTML = "";
  filtered.forEach((p) => container.appendChild(createProductCard(p)));
  // Lista visible en esta categoría
  visibleProductIds = filtered.map((p) => p.id);
  // limpiar contexto después de renderizar
  currentRenderCategoryContext = null;
}

// Función para convertir códigos hex a nombres de colores entendibles
function getColorNameFromHex(hex) {
  const colorMap = {
    "#ffffff": "Blanco",
    "#000000": "Negro",
    "#ff0000": "Rojo",
    "#00ff00": "Verde Claro",
    "#0000ff": "Azul",
    "#ffff00": "Amarillo",
    "#ff00ff": "Magenta",
    "#00ffff": "Cian",
    "#800000": "Rojo Oscuro",
    "#008000": "Verde",
    "#000080": "Azul Marino",
    "#808000": "Verde Olivo",
    "#800080": "Morado",
    "#008080": "Verde Azulado",
    "#c0c0c0": "Plata",
    "#808080": "Gris",
    "#ffa500": "Naranja",
    "#ffc0cb": "Rosa",
    "#a52a2a": "Marrón",
    "#dda0dd": "Ciruela",
    "#98fb98": "Verde Claro",
    "#87ceeb": "Azul Cielo",
    "#daa520": "Dorado",
    "#cd853f": "Café",
    "#d2691e": "Chocolate",
    "#dc143c": "Carmesí",
    "#b22222": "Rojo Ladrillo",
    "#228b22": "Verde Bosque",
    "#4169e1": "Azul Real",
    "#9370db": "Violeta Medio",
  };

  // Normalizar el hex
  hex = hex.toLowerCase();

  // Buscar coincidencia exacta
  if (colorMap[hex]) {
    return colorMap[hex];
  }

  // Si no hay coincidencia exacta, determinar por proximidad básica
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  // Lógica simple para determinar color predominante
  if (r > 200 && g > 200 && b > 200) return "Blanco";
  if (r < 50 && g < 50 && b < 50) return "Negro";
  if (r > g && r > b) return "Rojo";
  if (g > r && g > b) return "Verde";
  if (b > r && b > g) return "Azul";
  if (r > 150 && g > 150 && b < 100) return "Amarillo";
  if (r > 150 && g < 100 && b > 150) return "Morado";
  if (r < 100 && g > 150 && b > 150) return "Cian";
  if (r > 100 && g > 100 && b > 100) return "Gris";

  return "Color Personalizado";
}

// Precio según reglas: detalle 450, mayor (>=3) 350, docena (>=12) 300
function calculatePrice(qty, basePrice, size = null, category = null) {
  if (!basePrice) return 0;

  const retail = Number(basePrice.retail || 0);
  const wholesale = Number(
    basePrice.wholesale !== undefined ? basePrice.wholesale : retail
  );
  const dozen = Number(
    basePrice.dozen !== undefined ? basePrice.dozen : retail
  );

  let price;
  // Regla especial: para la categoría 'body' las rebajas se aplican por docena
  // (no hay nivel 'mayor' a partir de 3). Solo unidad y docena.
  if (String(category).toLowerCase() === "body") {
    if (qty >= 12) price = dozen;
    else price = retail;
  } else {
    if (qty >= 12) price = dozen;
    else if (qty >= 3) price = wholesale;
    else price = retail;
  }

  // Recargo de 50 pesos para tallas XL, 2XL, 3XL
  if (size && (size === "XL" || size === "2XL" || size === "3XL")) {
    price += 50;
  }

  return price;
}

// Selector de emoji según atributos del producto (usa heurísticas sobre el nombre)
function getEmojiForItem(item) {
  const name = (item.name || "").toLowerCase();
  if (name.includes("manga larga")) return "👕"; // prenda de manga larga
  if (name.includes("body")) return "👶"; // ropa de bebé / body
  if (
    name.includes("chaqueta") ||
    name.includes("saco") ||
    name.includes("abrigo")
  )
    return "🧥";
  if (name.includes("camiseta") || name.includes("t-shirt")) return "👕";
  // colores o accesorios genéricos
  return "🔹";
}

// Formatea una etiqueta para modo ASCII: envuelve entre corchetes
function formatLabelForAscii(label) {
  if (!label) return "";
  // limpiar y truncar si es muy largo
  const clean = String(label).replace(/\s+/g, " ").trim();
  return `[${clean}]`;
}

// Etiqueta descriptiva para acompañar el emoji (por si no se renderiza)
function getEmojiLabelForItem(item) {
  const name = (item.name || "").toLowerCase();
  if (name.includes("manga larga")) return "Manga larga";
  if (name.includes("body")) return "Body";
  if (
    name.includes("chaqueta") ||
    name.includes("saco") ||
    name.includes("abrigo")
  )
    return "Abrigo/Chaqueta";
  if (name.includes("camiseta") || name.includes("t-shirt")) return "Camiseta";
  return "Prenda";
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
    "amarillo-dorado": "�",
    "rosado claro": "🌸",
    naranja: "�",
  };
  return map[k] || "";
}

function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";
  const q = (searchQuery || "").toLowerCase().trim();

  // Filtrar productos que NO sean crop tops (excluir IDs 009..048)
  const otherProducts = products.filter((p) => {
    const n = parseInt(p.id, 10);
    const isNotCropTop = Number.isNaN(n) || n < 9 || n > 48;

    if (!q) return isNotCropTop;

    const searchText = (p.name || "") + " " + p.id;
    return isNotCropTop && searchText.toLowerCase().includes(q);
  });

  if (otherProducts.length === 0) {
    container.innerHTML =
      '<div class="empty-state">No se encontraron productos</div>';
    return;
  }

  // Renderizar productos en una grilla simple
  otherProducts.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });

  // Construir lista visible para navegación en modal
  visibleProductIds = otherProducts.map((p) => p.id);

  // Animación de entrada
  setTimeout(() => {
    container.querySelectorAll(".product-card").forEach((p) => {
      if (!p.classList.contains("animate")) p.classList.add("animate");
    });
  }, 80);
}

// Helper function to create product cards
function createProductCard(p) {
  const div = document.createElement("div");
  div.className = "product-card";
  // Guardar el id para navegación en modal
  div.dataset.id = p.id;
  const firstImage =
    (p.images &&
      (p.images.default ||
        p.images.blanco ||
        p.images[Object.keys(p.images).find((k) => k !== "default")])) ||
    "";
  const displayName = getDisplayName(p);
  // Elegir precio según el contexto de render actual (p. ej. si p.altPrices.conjuntos existe y estamos en 'conjuntos')
  const priceSource =
    currentRenderCategoryContext &&
    p.altPrices &&
    p.altPrices[currentRenderCategoryContext]
      ? p.altPrices[currentRenderCategoryContext]
      : p.price || {};
  const retail = Number(priceSource.retail || 0);
  const wholesale = Number(
    priceSource.wholesale !== undefined ? priceSource.wholesale : retail
  );
  const dozen = Number(
    priceSource.dozen !== undefined ? priceSource.dozen : retail
  );
  const isDanza = p.category === "danza";
  const mayorForNonDanza =
    priceSource && (priceSource.dozen ?? priceSource.wholesale ?? retail);
  div.innerHTML = `
    <div class="product-card-minimal">
      <div class="product-image-wrapper">
        <img class="product-image-clean"
          src="${firstImage}"
          alt="${displayName}"
          loading="lazy"
          onerror="this.src='https://via.placeholder.com/300x300?text=Sin+imagen'">
        <div class="product-code-overlay">Código: ${p.code}</div>
      </div>
      <div class="product-info-minimal">
        <h3 class="product-name-clean">${displayName}</h3>
        <div class="product-pricing">
          <div class="price-main">
            <span class="price-amount">RD$${retail}</span>
            <span class="price-unit">c/u</span>
          </div>
          <div class="price-tiers">
            ${
              isDanza
                ? `
                ${
                  wholesale !== retail
                    ? `<div class="tier">12 de docena (3+): RD$${wholesale}</div>`
                    : ``
                }
                <div class="tier best">Docena (12+): RD$${dozen}</div>
                `
                : `${
                    mayorForNonDanza !== retail
                      ? `<div class="tier">Mayor (3+): RD$${mayorForNonDanza}</div>`
                      : ``
                  }`
            }
          </div>
        </div>
      </div>
    </div>
  `;

  // Make the product card clickable
  div.setAttribute("role", "button");
  div.setAttribute("tabindex", "0");
  div.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Registrar desde qué contexto se abrió el modal para respetar altPrices
    modalOpenContext = currentRenderCategoryContext;
    openModal(p.id);
  });
  div.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      openModal(p.id);
    }
  });

  return div;
}

// Render only the Crop Tops section (IDs 009..025) into #products
function renderCropTops() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";

  const cropTops = products.filter((p) => {
    const n = parseInt(p.id, 10);
    return !Number.isNaN(n) && n >= 9 && n <= 25;
  });

  if (!cropTops || cropTops.length === 0) {
    container.innerHTML =
      '<div class="empty">No hay productos en Crop Tops</div>';
    return;
  }

  // create section
  const sec = document.createElement("section");
  sec.className = "product-section";
  sec.id = "section-crop-tops";
  const titleEl = document.createElement("h2");
  titleEl.className = "section-title";
  titleEl.textContent = "Crop Tops";
  sec.appendChild(titleEl);

  const heroWrapper = document.createElement("div");
  heroWrapper.className = "section-hero";

  const first = cropTops[0];
  const heroCard = (function () {
    const div = document.createElement("div");
    div.className = "product hero-card";
    const firstImage =
      (first.images && (first.images.default || first.images.blanco)) || "";
    div.innerHTML = `
      <div class="thumb-container"><img src="${firstImage}" alt="${first.name}" onerror="this.src='https://via.placeholder.com/420x420?text=Sin+imagen'"></div>
      <div class="product-info"><h3>${first.name}</h3></div>`;
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");
    div.addEventListener("click", () => {
      modalOpenContext = "crop-tops";
      openModal(first.id);
    });
    return div;
  })();

  const grid = document.createElement("div");
  grid.className = "section-grid";
  cropTops.slice(1).forEach((p) => {
    const card = (function (prod) {
      const div = document.createElement("div");
      div.className = "product";
      const firstImage =
        (prod.images && (prod.images.default || prod.images.blanco)) || "";
      div.innerHTML = `
        <div class="thumb-container"><img src="${firstImage}" alt="${prod.name}" onerror="this.src='https://via.placeholder.com/280x280?text=Sin+imagen'"></div>
        <div class="product-info"><h3>${prod.name}</h3></div>`;
      div.setAttribute("role", "button");
      div.setAttribute("tabindex", "0");
      div.addEventListener("click", () => {
        modalOpenContext = "crop-tops";
        openModal(prod.id);
      });
      return div;
    })(p);
    grid.appendChild(card);
  });

  heroWrapper.appendChild(heroCard);
  heroWrapper.appendChild(grid);
  sec.appendChild(heroWrapper);
  container.appendChild(sec);

  // Lista visible para navegación (ids de croptops)
  visibleProductIds = cropTops.map((p) => p.id);

  // fallback: ensure items are visible if IntersectionObserver didn't run yet
  setTimeout(() => {
    document.querySelectorAll("#section-crop-tops .product").forEach((p) => {
      if (!p.classList.contains("animate")) p.classList.add("animate");
    });
  }, 80);
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

    // Cerrar carrito al click del overlay
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

    // Evitar que clics dentro del carrito propaguen al documento y lo cierren
    const sidebar = document.getElementById("cart-sidebar");
    if (sidebar && !sidebar.dataset._stopPropagationBound) {
      sidebar.addEventListener("click", (e) => e.stopPropagation());
      sidebar.dataset._stopPropagationBound = "1";
    }
  }
  // Asegurar que si el sidebar ya existía, tenga el stopPropagation aplicado
  const existingSidebar = document.getElementById("cart-sidebar");
  if (existingSidebar && !existingSidebar.dataset._stopPropagationBound) {
    existingSidebar.addEventListener("click", (e) => e.stopPropagation());
    existingSidebar.dataset._stopPropagationBound = "1";
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
            <!-- Título y código ahora van debajo de la imagen (lado izquierdo) -->
            
            <!-- Precio principal removido por diseño -->
            
            <!-- Tabla de precios -->
            <div class="pricing-tiers-zara">
              <div class="pricing-title-zara">PRECIOS</div>
              <div class="tier-row" data-tier="retail" id="tier-row-retail">
                <span class="qty-text">Precio por unidad</span>
                <span class="tier-price" id="price-retail">RD$0</span>
              </div>
              <div class="tier-row" data-tier="wholesale" id="tier-row-wholesale">
                <span class="qty-text" id="label-wholesale">Mayor (3+)</span>
                <span class="tier-price" id="price-wholesale">RD$0</span>
              </div>
              <div class="tier-row" data-tier="dozen" id="tier-row-dozen">
                <span class="qty-text">Precio por docena</span>
                <span class="tier-price" id="price-dozen">RD$0</span>
              </div>
              <div id="special-offer-row" class="tier-row special-offer" style="display:none"></div>
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
                <!-- Contenido dinámico: se rellena en openModal() según currentProduct -->
                <div class="detail-content-zara" id="modal-details-content"></div>
              </details>
            </div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    // Navegación prev/next
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");
    if (prevBtn) prevBtn.addEventListener("click", () => navigateModal(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => navigateModal(1));
  }

  // Alert modal unificado (talla/color) si no existe
  if (!document.getElementById("alert-modal")) {
    const alertHtml = `
      <div id="alert-modal" class="alert-modal">
        <div class="alert-content">
          <h3>¡Atención!</h3>
          <p id="alert-message">Por favor selecciona el color y la talla antes de continuar.</p>
          <div id="alert-actions" style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:1rem;"></div>
          <button class="alert-btn" onclick="closeAlert()">Cerrar</button>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", alertHtml);
  }

  // center-alert overlay
  if (!document.getElementById("center-alert-overlay")) {
    const alertHtml = `
      <div id="center-alert-overlay" class="center-alert-overlay">
        <div class="center-alert-box">
          <div class="center-alert-title" id="center-alert-title">Atención</div>
          <div class="center-alert-message" id="center-alert-message">Debes seleccionar una opción</div>
          <div class="center-alert-actions">
            <button class="center-alert-btn" id="center-alert-btn">Entendido</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", alertHtml);

    // Event listener para cerrar alerta
    document
      .getElementById("center-alert-btn")
      .addEventListener("click", hideCenterAlert);
    document
      .getElementById("center-alert-overlay")
      .addEventListener("click", (e) => {
        if (e.target.id === "center-alert-overlay") hideCenterAlert();
      });
  }

  // added-to-cart panel (Zara-like) — opcional
  if (addedPanelEnabled && !document.getElementById("added-panel")) {
    const addedHtml = `
      <div id="added-panel" class="added-panel">
        <div class="added-panel-content">
          <button class="added-close" id="added-close">×</button>
          <h3>AÑADIDO A TU CESTA</h3>
          <div class="added-main">
            <div class="added-thumb" id="added-thumb"></div>
            <div class="added-info">
              <div id="added-name"></div>
              <div id="added-qty"></div>
              <button id="view-cart-btn" class="btn-primary-small">VER CESTA</button>
            </div>
          </div>
          <h4>TE PUEDE INTERESAR</h4>
          <div class="added-suggestions" id="added-suggestions"></div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", addedHtml);
    // attach close / view handlers
    document
      .getElementById("added-close")
      .addEventListener("click", () =>
        document.getElementById("added-panel").classList.remove("active")
      );
    document.getElementById("view-cart-btn").addEventListener("click", () => {
      document.getElementById("added-panel").classList.remove("active");
      toggleCart();
    });
  }

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

// Show the added-to-cart panel with item info and suggestions
function showAddedPanel(item) {
  if (!addedPanelEnabled) {
    // Mostrar toast discreto en el centro inferior
    try {
      let toast = document.getElementById("added-toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "added-toast";
        toast.style.cssText = `
          position: fixed;
          left: 50%;
          bottom: 16px;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.85);
          color: #fff;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 14px;
          z-index: 10000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          display: flex;
          gap: 10px;
          align-items: center;
        `;
        const text = document.createElement("span");
        text.id = "added-toast-text";
        toast.appendChild(text);
        const btn = document.createElement("button");
        btn.textContent = "Ver cesta";
        btn.style.cssText = `background:#fff;color:#111;border:none;border-radius:6px;padding:6px 10px;cursor:pointer;font-weight:600;`;
        btn.addEventListener("click", () => {
          toast.style.display = "none";
          toggleCart();
        });
        toast.appendChild(btn);
        document.body.appendChild(toast);
      }
      const txt = document.getElementById("added-toast-text");
      if (txt) {
        const name = item?.name || "Producto";
        const size = item?.size ? ` • Talla ${item.size}` : "";
        txt.textContent = `${name}${size} añadido a tu cesta`;
      }
      toast.style.display = "flex";
      clearTimeout(window.__addedToastTimer);
      window.__addedToastTimer = setTimeout(() => {
        toast.style.display = "none";
      }, 2500);
    } catch (e) {}
    return;
  }
  try {
    const panel = document.getElementById("added-panel");
    if (!panel) return;
    const thumb = document.getElementById("added-thumb");
    const name = document.getElementById("added-name");
    const qty = document.getElementById("added-qty");
    const sugg = document.getElementById("added-suggestions");
    thumb.innerHTML = item.imageOriginal
      ? `<img src="${item.imageOriginal}" alt="${item.name}"/>`
      : `<div class="color-block" style="background:${
          item.colorHex || "#ddd"
        }"></div>`;
    name.textContent = item.name + (item.size ? " • Talla " + item.size : "");
    qty.textContent = "Cantidad: " + (item.qty || 1);

    // simple suggestions: pick 3 random different products
    const others = products.filter((p) => p.id !== item.id).slice(0, 6);
    sugg.innerHTML = "";
    for (let i = 0; i < 3 && i < others.length; i++) {
      const p = others[i];
      const d = document.createElement("div");
      d.className = "sugg-item";
      d.innerHTML = `<div class="sugg-thumb"><img src="${
        (p.images && (p.images.default || p.images.blanco)) || ""
      }" onerror="this.src='https://via.placeholder.com/120x120?text=Img'"/></div><div class="sugg-name">${
        p.name
      }</div>`;
      d.addEventListener("click", () => openModal(p.id));
      sugg.appendChild(d);
    }

    panel.classList.add("active");
    // auto-hide after 6s
    setTimeout(() => {
      panel.classList.remove("active");
    }, 6000);
  } catch (e) {
    console.warn("showAddedPanel err", e);
  }
}

// Construye un mini-nav con enlaces a las secciones generadas
function buildSectionNav() {
  const container = document.querySelector(".container");
  if (!container) return;

  // Eliminar nav previo si existe
  const existing = document.getElementById("section-mini-nav");
  if (existing) existing.remove();

  const sections = Array.from(document.querySelectorAll(".product-section"));
  if (sections.length <= 1) return; // no mostrar si sólo hay una sección

  const nav = document.createElement("nav");
  nav.id = "section-mini-nav";
  nav.className = "section-mini-nav";

  sections.forEach((sec) => {
    const titleEl = sec.querySelector(".section-title");
    const text = titleEl ? titleEl.textContent.trim() : sec.id;
    const a = document.createElement("a");
    a.href = `#${sec.id}`;
    a.textContent = text;
    a.addEventListener("click", (ev) => {
      ev.preventDefault();
      const target = document.getElementById(sec.id);
      if (!target) return;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        (document.querySelector(".site-header")?.offsetHeight || 80) -
        8;
      window.scrollTo({ top, behavior: "smooth" });
    });
    nav.appendChild(a);
  });

  // Insertar el nav justo debajo del header dentro del contenedor principal
  const header = document.querySelector(".site-header");
  if (header && header.parentNode) {
    // Si el header está fuera del flujo del container, insertamos después del header
    header.insertAdjacentElement("afterend", nav);
  } else {
    container.insertBefore(nav, container.firstChild);
  }
}

// Helper functions para alerta centrada
function showCenterAlert(title, message) {
  const overlay = document.getElementById("center-alert-overlay");
  const titleEl = document.getElementById("center-alert-title");
  const messageEl = document.getElementById("center-alert-message");

  if (overlay && titleEl && messageEl) {
    titleEl.textContent = title;
    messageEl.textContent = message;
    overlay.classList.add("active");
  }
}

function hideCenterAlert() {
  const overlay = document.getElementById("center-alert-overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

// Toggle cart sidebar
function toggleCart() {
  const sidebar = document.getElementById("cart-sidebar");
  if (!sidebar) return;
  const opening = !sidebar.classList.contains("active");
  sidebar.classList.toggle("active");
  // overlay
  const overlay = document.getElementById("cart-overlay");
  if (overlay) overlay.classList.toggle("active", opening);
  // timestamp guard to ignore immediate click that opened the cart
  if (opening) {
    sidebar.dataset._openedAt = String(Date.now());
  }
  if (opening) attachCartCloseListeners();
  else detachCartCloseListeners();
}

function closeCart() {
  const sidebar = document.getElementById("cart-sidebar");
  if (!sidebar) return;
  sidebar.classList.remove("active");
  const overlay = document.getElementById("cart-overlay");
  if (overlay) overlay.classList.remove("active");
  // ensure listeners are removed when closed programmatically
  detachCartCloseListeners();
}

// --- helpers to close cart on outside interactions ---
function onDocClickForCart(e) {
  const sidebar = document.getElementById("cart-sidebar");
  if (!sidebar || !sidebar.classList.contains("active")) return;
  // Guard: ignore clicks that happen immediately after opening (likely the opener click)
  const openedAt = parseInt(sidebar.dataset._openedAt || "0", 10);
  if (openedAt && Date.now() - openedAt < 180) return;

  // if click is outside the sidebar and not the cart toggle buttons or header button, close
  const cartIcon = document.querySelector(".cart-icon-btn");
  const headerBtn = document.querySelector(".header-cart-btn");
  const clickedInside = sidebar.contains(e.target);
  // Si el clic es en controles internos (botones de cantidad, eliminar), nunca cerrar
  if (clickedInside) {
    const isQtyBtn = e.target.closest && e.target.closest(".qty-btn-cart");
    const isRemove =
      e.target.closest && e.target.closest(".cart-remove-professional");
    if (isQtyBtn || isRemove) return; // no cerrar
  }
  const overlay = document.getElementById("cart-overlay");
  const clickedOverlay = overlay && e.target === overlay;
  const clickedCartIcon =
    cartIcon && (e.target === cartIcon || cartIcon.contains(e.target));
  const clickedHeaderBtn =
    headerBtn && (e.target === headerBtn || headerBtn.contains(e.target));
  if (
    (!clickedInside && !clickedCartIcon && !clickedHeaderBtn) ||
    clickedOverlay
  )
    closeCart();
}

function onEscForCart(e) {
  if (e.key === "Escape") closeCart();
}

function onScrollForCart() {
  closeCart();
}

function attachCartCloseListeners() {
  document.addEventListener("click", onDocClickForCart);
  document.addEventListener("keydown", onEscForCart);
  window.addEventListener("scroll", onScrollForCart, { passive: true });
}

function detachCartCloseListeners() {
  document.removeEventListener("click", onDocClickForCart);
  document.removeEventListener("keydown", onEscForCart);
  window.removeEventListener("scroll", onScrollForCart);
}

// Persistence helpers
function saveCart() {
  try {
    localStorage.setItem("fm_cart_v1", JSON.stringify(cart));
  } catch (e) {
    console.warn("No se pudo guardar carrito en localStorage", e);
  }
}

function loadCart() {
  try {
    const raw = localStorage.getItem("fm_cart_v1");
    if (!raw) {
      cart = [];
      return;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cart = parsed;
    } else {
      cart = [];
    }
  } catch (e) {
    console.warn("No se pudo cargar carrito desde localStorage", e);
    cart = [];
  }
}

// Función para manejar navegación de categorías
function openCategory(categoryId) {
  const categoryPages = {
    "crop-tops": "crop-tops.html",
    blusas: "blusas.html",
    vestidos: "vestidos.html",
    faldas: "faldas.html",
    pantalones: "pantalones.html",
    conjuntos: "conjuntos.html",
    enterizos: "enterizos.html",
    danza: "danza.html",
    body: "body.html",
  };

  const pageUrl = categoryPages[categoryId];
  if (pageUrl) {
    // Todas las categorías ahora tienen su página
    window.location.href = pageUrl;
  }
}

function openModal(id) {
  currentProduct = products.find((p) => p.id === id);
  if (!currentProduct) return;

  // Asegurar que el UI compartido esté inicializado
  ensureSharedUI();

  // cerrar el carrito si está abierto para que el modal tenga foco
  try {
    closeCart();
  } catch (e) {}

  selectedColor = "default";
  selectedColorHex = "#e0e0e0";
  isCustomColor = false;
  selectedSize = null;
  selectedSizes = []; // Reset array de tallas múltiples
  quantity = 1;

  // modalOpenContext queda establecido si la llamada provino de una tarjeta;
  // si no, forzamos null (p. ej. apertura desde sugerencias o navegación global)
  if (!modalOpenContext) modalOpenContext = null;

  const nameEl = document.getElementById("modal-name");
  const imgEl = document.getElementById("modal-img");
  const qtyEl = document.getElementById("qty-display");

  if (nameEl) nameEl.textContent = currentProduct.name;
  // Forzar nombre en modal para Crop Tops (009..048)
  try {
    const idNumForName = parseInt(currentProduct.id, 10);
    if (
      !Number.isNaN(idNumForName) &&
      idNumForName >= 9 &&
      idNumForName <= 48
    ) {
      if (nameEl) nameEl.textContent = "Crop Top";
    } else if (nameEl) {
      // Usar un nombre amigable si el actual es genérico
      nameEl.textContent = getDisplayName(currentProduct);
    }
  } catch (e) {}

  // Mostrar código del producto
  const codeEl = document.getElementById("modal-code-display");
  if (codeEl) codeEl.textContent = `${currentProduct.code}`;

  // Actualizar tabla de precios con valores reales usando helper
  renderPricingForModal(currentProduct, modalOpenContext);

  // mostrar default si existe, si no usar la primera imagen disponible (por ejemplo color blanco)
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
      // si falla, intentar el default absoluto o un placeholder
      const fallback =
        (currentProduct.images && currentProduct.images.default) ||
        "https://via.placeholder.com/560x560?text=Sin+imagen";
      if (imgEl.src !== fallback) imgEl.src = fallback;
    };
    imgEl.src = modalImgSrc;
  }
  if (qtyEl) qtyEl.textContent = quantity;

  // SIEMPRE mostrar selector de color
  const swatches = document.getElementById("color-swatches");
  const colorGroup = swatches
    ? swatches.closest(".selection-group-zara")
    : null;
  const customPicker = document.getElementById("custom-color-picker");

  if (swatches && colorGroup) {
    // Mostrar selector siempre
    colorGroup.style.display = "";
    swatches.innerHTML = "";

    // Agregar opción "Original" primero
    const originalBtn = document.createElement("button");
    originalBtn.className = "swatch swatch-original";
    originalBtn.dataset.color = "original";
    originalBtn.title = "Color original (como en la foto)";
    originalBtn.innerHTML = "📷"; // Icono de cámara para "original"
    originalBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectColor("original", false, "#000000");
    });
    swatches.appendChild(originalBtn);

    // Agregar colores disponibles
    // Si el producto define una lista `colors`, usarla (restricción por producto).
    // En caso contrario, usar todas las claves de colorMap.
    const availableColors =
      Array.isArray(currentProduct.colors) && currentProduct.colors.length
        ? currentProduct.colors
        : Object.keys(colorMap);
    availableColors.forEach((key) => {
      // Saltar si no existe en el mapa global (pero permitir hexs personalizados si vienen)
      const hex =
        colorMap[key] || (key && String(key).startsWith("#") ? key : null);
      const btn = document.createElement("button");
      btn.className = "swatch";
      btn.dataset.color = key;
      if (hex) btn.style.background = hex;
      btn.title = colorNames[key] || key;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectColor(key, false, hex || colorMap[key]);
      });
      swatches.appendChild(btn);
    });

    // Habilitar selector de color personalizado
    if (customPicker) customPicker.disabled = false;
  }

  const picker =
    document.getElementById("custom-color") ||
    document.getElementById("custom-color-picker");
  if (picker) {
    picker.value = "#ffffff";
    picker.onchange = (e) => selectColor("Personalizado", true, e.target.value);
  }

  const sizeDiv = document.getElementById("size-options");
  if (sizeDiv) {
    sizeDiv.innerHTML = "";
    currentProduct.sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.className = "size-btn";
      btn.textContent = size;
      // No marcar activo de inicio
      btn.addEventListener("click", () => selectSize(size, btn));
      sizeDiv.appendChild(btn);
    });
  }

  // Rellenar detalles del producto dinámicamente.
  try {
    const detailsEl = document.getElementById("modal-details-content");
    if (detailsEl) {
      // Priorizar campo 'description' si existe en el producto
      if (currentProduct.description) {
        detailsEl.innerHTML = `<p>${String(currentProduct.description)}</p>`;
      } else if (currentProduct.detailsHtml) {
        // Si existe HTML preformateado en el producto
        detailsEl.innerHTML = String(currentProduct.detailsHtml);
      } else {
        // Fallback: solo mostrar el bloque de crop-top si el ID está en el rango de crop-tops
        const idNumForDetails = parseInt(currentProduct.id, 10);
        if (
          !Number.isNaN(idNumForDetails) &&
          idNumForDetails >= 9 &&
          idNumForDetails <= 48
        ) {
          detailsEl.innerHTML = `
            <p>Crop top confeccionado con materiales premium. Diseño moderno y versátil.</p>
            <ul>
              <li>Material: Algodón 95% + Spandex 5%</li>
              <li>Gramaje: 180 GSM</li>
              <li>Cuidado: Lavable a máquina 30°C</li>
            </ul>
          `;
        } else {
          // Generar una descripción genérica y lista de atributos básicos
          const sizesList = Array.isArray(currentProduct.sizes)
            ? currentProduct.sizes.join(", ")
            : "";
          detailsEl.innerHTML = `
            <p>Detalles del producto: ${getDisplayName(currentProduct)}</p>
            <ul>
              <li>Categoría: ${currentProduct.category || "N/D"}</li>
              ${sizesList ? `<li>Tallas disponibles: ${sizesList}</li>` : ""}
            </ul>
          `;
        }
      }
    }
  } catch (e) {
    console.warn("Error rellenando detalles dinámicos del modal", e);
  }

  const modal = document.getElementById("product-modal");
  if (modal) {
    // Si es Danza, ajustar estilo del modal para mostrar mejor la imagen
    if (currentProduct.category === "danza") modal.classList.add("modal-danza");
    else modal.classList.remove("modal-danza");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Fijar índice actual para navegación
    currentIndexInVisible = Math.max(
      0,
      visibleProductIds.findIndex((pid) => pid === currentProduct.id)
    );
    // Fijar índice global para navegación cruzando categorías
    currentIndexInGlobal = Math.max(
      0,
      globalNavIds.findIndex((pid) => pid === currentProduct.id)
    );

    // Listeners de teclado (una sola vez)
    if (!modalKeydownAttached) {
      modalKeydownAttached = true;
      window.addEventListener("keydown", onModalKeydown);
    }

    // Zoom deshabilitado
  }

  updateModalPrice();
}

// Renderiza los valores de las filas de precio dentro del modal (reutilizable)
function renderPricingForModal(product, context) {
  try {
    const pricingContainer = document.querySelector(".pricing-tiers-zara");
    if (!pricingContainer) return;

    const priceSource =
      context && product.altPrices && product.altPrices[context]
        ? product.altPrices[context]
        : product.price || {};
    const retail = Number(priceSource.retail || 0);
    const dozen = Number(
      priceSource.dozen !== undefined ? priceSource.dozen : retail
    );

    // Usar la estructura idéntica a blusas - siempre mostrar ambas filas
    pricingContainer.innerHTML = `
      <div class="pricing-title-zara">PRECIOS</div>
      <div class="tier-row">
        <span class="qty-text">Precio por unidad</span>
        <span id="price-retail" class="tier-price">RD$${retail}</span>
      </div>
      <div class="tier-row">
        <span class="qty-text">Precio por docena</span>
        <span id="price-dozen" class="tier-price">RD$${dozen}</span>
      </div>
    `;
  } catch (e) {
    console.warn("renderPricingForModal error", e);
  }
}

function onModalKeydown(e) {
  const modal = document.getElementById("product-modal");
  if (!modal || !modal.classList.contains("active")) return;
  if (e.key === "ArrowLeft") navigateModal(-1);
  else if (e.key === "ArrowRight") navigateModal(1);
}

function navigateModal(delta) {
  try {
    // Navegar solo dentro de la sección actual: visibleProductIds.
    // Si no hay visible (p.ej. abierto desde sugerencias), derivar por la misma categoría del producto actual.
    function classifyCategoryById(pid) {
      const n = parseInt(pid, 10);
      if (Number.isNaN(n)) return null;
      if (n >= 1 && n <= 8) return "body";
      if (n >= 9 && n <= 48) return "crop-tops";
      if (n >= 49 && n <= 64) return "blusas";
      if (n >= 65 && n <= 124) return "vestidos";
      if (n >= 125 && n <= 133) return "faldas";
      if (n >= 134 && n <= 137) return "pantalones";
      if (n >= 138 && n <= 153) return "conjuntos";
      if (n >= 154 && n <= 155) return "enterizos";
      return null;
    }

    const visibleList =
      Array.isArray(visibleProductIds) && visibleProductIds.length
        ? visibleProductIds.slice()
        : null;

    let sourceIds = visibleList;
    if (!sourceIds || !sourceIds.length) {
      const sameCategoryIds = (function () {
        if (currentProduct && currentProduct.category === "danza") {
          return products
            .filter((p) => p.category === "danza")
            .map((p) => p.id)
            .sort((a, b) => Number(a) - Number(b));
        }
        const cat = currentProduct
          ? classifyCategoryById(currentProduct.id)
          : null;
        if (!cat) return [];
        return products
          .filter((p) => {
            if (p.category === "danza") return false; // no mezclar
            const c = classifyCategoryById(p.id);
            return c === cat;
          })
          .map((p) => p.id)
          .sort((a, b) => Number(a) - Number(b));
      })();
      sourceIds = sameCategoryIds;
    }
    if (!Array.isArray(sourceIds) || sourceIds.length === 0) return;
    const currId = currentProduct && currentProduct.id;
    let currIndex = sourceIds.findIndex((pid) => pid === currId);
    if (currIndex < 0) currIndex = 0;
    let nextIndex = currIndex + delta;
    // Sin wrap-around: si excede límites, no avanzar/retroceder
    if (nextIndex < 0 || nextIndex >= sourceIds.length) return;
    const nextId = sourceIds[nextIndex];
    const nextProduct = products.find((p) => p.id === nextId);
    if (!nextProduct) return;

    // Mantener algunas selecciones al navegar
    currentProduct = nextProduct;
    selectedColor = "default";
    selectedColorHex = "#e0e0e0";
    isCustomColor = false;
    selectedSize = null;
    quantity = 1;
    currentIndexInGlobal = nextIndex;

    // Re-renderizar contenido del modal sin cerrarlo
    const nameEl = document.getElementById("modal-name");
    const imgEl = document.getElementById("modal-img");
    const qtyEl = document.getElementById("qty-display");
    if (nameEl) {
      const idNumForName = parseInt(currentProduct.id, 10);
      if (
        !Number.isNaN(idNumForName) &&
        idNumForName >= 9 &&
        idNumForName <= 48
      ) {
        nameEl.textContent = "Crop Top";
      } else {
        nameEl.textContent = getDisplayName(currentProduct);
      }
    }
    const codeEl = document.getElementById("modal-code-display");
    if (codeEl) codeEl.textContent = `${currentProduct.code}`;

    // Aplicar/retirar estilo especial del modal según la categoría
    const modal = document.getElementById("product-modal");
    if (modal) {
      if (currentProduct.category === "danza")
        modal.classList.add("modal-danza");
      else modal.classList.remove("modal-danza");
    }

    // Pricing (3 niveles solo para Danza; 2 niveles para no-Danza)
    const pricingContainer = document.querySelector(".pricing-tiers-zara");
    if (pricingContainer) {
      const priceSource =
        modalOpenContext &&
        currentProduct.altPrices &&
        currentProduct.altPrices[modalOpenContext]
          ? currentProduct.altPrices[modalOpenContext]
          : currentProduct.price || {};
      const retail = Number(priceSource.retail || 0);
      const wholesale = Number(
        priceSource.wholesale !== undefined ? priceSource.wholesale : retail
      );
      const dozen = Number(
        priceSource.dozen !== undefined ? priceSource.dozen : retail
      );
      const isDanzaPricing = currentProduct.category === "danza";
      const isSpecial156 =
        currentProduct && String(currentProduct.id) === "156";
      // Actualizar precios usando helper para mantener consistencia
      renderPricingForModal(currentProduct, modalOpenContext);
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
          "https://via.placeholder.com/560x560?text=Sin+imagen";
        if (imgEl.src !== fallback) imgEl.src = fallback;
      };
      imgEl.src = modalImgSrc;
    }
    if (qtyEl) qtyEl.textContent = quantity;

    // Colores
    const swatches = document.getElementById("color-swatches");
    const colorGroup = swatches
      ? swatches.closest(".selection-group-zara")
      : null;
    const customPicker = document.getElementById("custom-color-picker");
    const productHasColorOptions = Boolean(
      (currentProduct &&
        Array.isArray(currentProduct.colors) &&
        currentProduct.colors.length > 0) ||
        (currentProduct &&
          currentProduct.images &&
          Object.keys(currentProduct.images).length > 1)
    );
    if (swatches && colorGroup) {
      if (productHasColorOptions) {
        colorGroup.style.display = "";
        swatches.innerHTML = "";
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
          swatches.appendChild(btn);
        });
        if (customPicker) customPicker.disabled = false;
      } else {
        colorGroup.style.display = "none";
        selectedColor = "N/A";
        isCustomColor = false;
        if (customPicker) customPicker.disabled = true;
      }
    }

    const picker =
      document.getElementById("custom-color") ||
      document.getElementById("custom-color-picker");
    if (picker) {
      picker.value = "#ffffff";
      picker.onchange = (e) =>
        selectColor("Personalizado", true, e.target.value);
    }

    // Tallas
    const sizeDiv = document.getElementById("size-options");
    if (sizeDiv) {
      sizeDiv.innerHTML = "";
      currentProduct.sizes.forEach((size) => {
        const btn = document.createElement("button");
        btn.className = "size-btn";
        btn.textContent = size;
        if (size === selectedSize) btn.classList.add("active");
        btn.addEventListener("click", () => selectSize(size, btn));
        sizeDiv.appendChild(btn);
      });
    }

    // Actualizar precio principal
    updateModalPrice();

    // Zoom deshabilitado
  } catch (e) {
    console.warn("navigateModal error", e);
  }
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
  // limpiar estado de navegación y listeners
  if (modalKeydownAttached) {
    window.removeEventListener("keydown", onModalKeydown);
    modalKeydownAttached = false;
  }
  currentIndexInVisible = -1;
  // limpiar contexto del modal
  modalOpenContext = null;

  // Reset de estado relacionado con selecciones múltiples para evitar que
  // los selectores queden persistentes si el usuario cierra y vuelve a abrir.
  try {
    selectedSizes = [];
    selectedColors = [];
    selectedSize = null;
    selectedColor = "default";
    selectedColorHex = "#e0e0e0";
    isCustomColor = false;
    quantity = 1;
    __autoAddAfterValidation = false;
    __lastIntent = null;

    // Restaurar el DOM de tallas a su estado simple (botones) si el modal sigue en el DOM
    const sizeDiv = document.getElementById("size-options");
    if (sizeDiv && currentProduct && Array.isArray(currentProduct.sizes)) {
      sizeDiv.innerHTML = "";
      sizeDiv.className = "size-options-zara";
      currentProduct.sizes.forEach((sz) => {
        const btn = document.createElement("button");
        btn.className = "size-btn";
        btn.textContent = sz;
        btn.type = "button";
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          selectSize(sz, btn);
        });
        sizeDiv.appendChild(btn);
      });
    }
  } catch (e) {
    console.warn("closeModal reset error", e);
  }
}

function selectColor(color, custom = false, hexValue = null) {
  selectedColor = color;
  isCustomColor = custom;

  // Handle "original" color selection
  if (color === "original") {
    selectedColorHex = "#8e44ad"; // Purple-ish color to represent "original"
    isCustomColor = false;
  } else {
    selectedColorHex = hexValue || colorMap[color] || "#e0e0e0";
  }

  // Clear color validation error
  const colorError = document.getElementById("color-error");
  if (colorError) colorError.style.display = "none";

  const imgEl = document.getElementById("modal-img");
  // Para productos con una sola imagen (ej. 001-003), siempre usar default
  const hasSingleImage =
    currentProduct &&
    currentProduct.images &&
    Object.keys(currentProduct.images).length === 1;

  // Handle "original" color - always show the default/first image
  if (color === "original" || hasSingleImage) {
    const fallbackSrc =
      currentProduct.images.default ||
      currentProduct.images.blanco ||
      Object.values(currentProduct.images)[0] ||
      "https://via.placeholder.com/560x560?text=Sin+imagen";
    if (imgEl) {
      imgEl.src = fallbackSrc;
      console.log(`Imagen original/fallback: ${fallbackSrc}`);
    }
  } else if (
    !custom &&
    !hasSingleImage &&
    currentProduct.images &&
    currentProduct.images[color]
  ) {
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

  // Aplicar clase para fondos blancos
  try {
    const modalImageContainer = document.getElementById("main-image-container");
    if (modalImageContainer) {
      const whiteNames = ["blanco", "white"];
      const isWhite =
        (!custom && whiteNames.includes(String(color).toLowerCase())) ||
        (custom && String(selectedColorHex || "").toLowerCase() === "#ffffff");
      if (isWhite) {
        modalImageContainer.classList.add("white-background");
      } else {
        modalImageContainer.classList.remove("white-background");
      }
    }
  } catch (e) {
    console.warn("Error aplicando clase de fondo blanco:", e);
  }

  document
    .querySelectorAll(".swatch")
    .forEach((s) => s.classList.remove("active"));
  if (!custom) {
    const btn = Array.from(document.querySelectorAll(".swatch")).find(
      (b) => b.dataset.color === color
    );
    if (btn) btn.classList.add("active");
  }

  // Handle "original" color selection specifically
  if (color === "original") {
    const originalBtn = document.querySelector(".swatch-original");
    if (originalBtn) originalBtn.classList.add("active");
  }

  // Si venimos de una advertencia y ya hay talla seleccionada, auto-agregar
  try {
    const hasColor = selectedColor && selectedColor !== "default";
    const hasSize = !!selectedSize;
    if (__autoAddAfterValidation && hasColor && !hasSize) {
      // Mostrar de inmediato la alerta de talla pendiente
      const sizeButtons = Array.from(
        document.querySelectorAll("#size-options .size-btn")
      );
      const actions = sizeButtons.map((btn) => {
        const s = btn.textContent?.trim();
        return { label: s, action: () => btn.click() };
      });
      showAlert("Selecciona tu talla", actions);
    } else if (__autoAddAfterValidation && hasColor && hasSize) {
      const intent = __lastIntent || "add";
      __autoAddAfterValidation = false; // reset antes de ejecutar
      try {
        closeAlert();
      } catch (e) {}
      // Ejecutar en el siguiente tick para evitar superposición del overlay de alerta
      setTimeout(() => {
        if (intent === "buy") buyNowFromModal();
        else addToCartFromModal();
      }, 0);
    }
  } catch (e) {}

  // cerrar carrito al cambiar opción
  try {
    closeCart();
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

  // cerrar carrito al cambiar talla
  try {
    closeCart();
  } catch (e) {}

  // Recalcular precio inmediatamente para aplicar +RD$50 a XL+
  try {
    updateModalPrice();
  } catch (e) {}

  // Si venimos de una advertencia y ya hay color seleccionado, auto-agregar
  try {
    const hasColor = selectedColor && selectedColor !== "default";
    const hasSize = !!selectedSize;
    if (__autoAddAfterValidation && !hasColor && hasSize) {
      // Mostrar de inmediato la alerta de color pendiente
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
      __autoAddAfterValidation = false; // reset antes de ejecutar
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

function changeQty(delta) {
  quantity = Math.max(1, quantity + delta);
  const qtyEl = document.getElementById("qty-display");
  if (qtyEl) qtyEl.textContent = quantity;
  updateModalPrice();

  // Mostrar mensaje para múltiples artículos
  showMultipleSizeMessage();
}

function showMultipleSizeMessage() {
  const sizeOptionsContainer = document.getElementById("size-options");
  const sizeLabel = document.querySelector(
    ".selection-group-zara:has(#size-options) .selection-label-zara"
  );

  if (!sizeOptionsContainer || !currentProduct) return;

  if (quantity > 1) {
    // Cambiar el label
    if (sizeLabel) {
      sizeLabel.textContent = `TALLAS (${quantity} artículos)`;
    }

    // Inicializar array de tallas si no existe
    if (selectedSizes.length !== quantity) {
      selectedSizes = new Array(quantity).fill(
        selectedSize || currentProduct.sizes[0]
      );
    }
    // Inicializar array de colores por artículo si no existe
    if (selectedColors.length !== quantity) {
      selectedColors = new Array(quantity).fill(null);
    }

    // Limpiar y recrear los selectores
    sizeOptionsContainer.innerHTML = "";
    sizeOptionsContainer.className = "size-options-zara multiple-selectors";

    // Crear selector para cada artículo
    for (let i = 0; i < quantity; i++) {
      const selectorGroup = document.createElement("div");
      selectorGroup.className = "size-selector-group";

      const label = document.createElement("div");
      label.className = "size-selector-label";
      label.textContent = `Artículo ${i + 1}:`;
      selectorGroup.appendChild(label);

      const buttonsRow = document.createElement("div");
      buttonsRow.className = "size-buttons-row";

      currentProduct.sizes.forEach((size) => {
        const btn = document.createElement("button");
        btn.className = "size-btn size-btn-small";
        btn.textContent = size;
        btn.type = "button";

        if (size === selectedSizes[i]) {
          btn.classList.add("active");
        }

        btn.addEventListener("click", (e) => {
          e.preventDefault();
          selectMultipleSize(size, i);
        });

        buttonsRow.appendChild(btn);
      });

      selectorGroup.appendChild(buttonsRow);
      // --- Color selector por artículo ---
      const colorRow = document.createElement("div");
      colorRow.className = "color-buttons-row";

      // Botón original
      const orig = document.createElement("button");
      orig.className = "swatch swatch-small swatch-original";
      orig.textContent = "📷";
      orig.type = "button";
      orig.addEventListener("click", (e) => {
        e.preventDefault();
        selectedColors[i] = "original";
        // marcar activo en este grupo
        const group = selectorGroup;
        group
          .querySelectorAll(".swatch")
          .forEach((s) => s.classList.remove("active"));
        orig.classList.add("active");
        // limpiar error
        const colorError = document.getElementById("color-error");
        if (colorError) colorError.style.display = "none";
        checkAutoAddForMultiple();
      });
      // marcar si ya estaba seleccionado
      if (selectedColors[i] === "original") orig.classList.add("active");
      colorRow.appendChild(orig);

      // Determinar colores disponibles por producto (si está definido) o usar el mapa global
      const availableColors =
        Array.isArray(currentProduct.colors) && currentProduct.colors.length
          ? currentProduct.colors
          : Object.keys(colorMap);
      availableColors.forEach((key) => {
        const hex =
          colorMap[key] || (key && String(key).startsWith("#") ? key : null);
        const btn = document.createElement("button");
        btn.className = "swatch swatch-small";
        btn.dataset.color = key;
        if (hex) btn.style.background = hex;
        btn.title = colorNames[key] || key;
        btn.type = "button";
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          selectedColors[i] = key;
          // marcar activo solo en este grupo
          const group = selectorGroup;
          group
            .querySelectorAll(".swatch")
            .forEach((s) => s.classList.remove("active"));
          btn.classList.add("active");
          const colorError = document.getElementById("color-error");
          if (colorError) colorError.style.display = "none";
          checkAutoAddForMultiple();
        });
        // marcar activo si ya se seleccionó antes
        if (selectedColors[i] && selectedColors[i] === key) {
          btn.classList.add("active");
        }
        colorRow.appendChild(btn);
      });

      // color personalizado por artículo
      const custom = document.createElement("input");
      custom.type = "color";
      custom.className = "swatch-custom";
      custom.addEventListener("change", (e) => {
        selectedColors[i] = e.target.value;
        // desactivar otras swatches en este grupo
        const group = selectorGroup;
        group
          .querySelectorAll(".swatch")
          .forEach((s) => s.classList.remove("active"));
        if (colorRow && colorRow.contains(custom))
          custom.classList.add("active");
        const colorError = document.getElementById("color-error");
        if (colorError) colorError.style.display = "none";
        checkAutoAddForMultiple();
      });
      colorRow.appendChild(custom);

      selectorGroup.appendChild(colorRow);
      sizeOptionsContainer.appendChild(selectorGroup);
    }

    // Agregar mensaje informativo
    const infoMessage = document.createElement("div");
    infoMessage.className = "multiple-size-info";
    infoMessage.innerHTML = `
      <span class="info-icon">💡</span>
      <span class="info-text">Selecciona una talla diferente para cada artículo</span>
    `;
    sizeOptionsContainer.appendChild(infoMessage);
  } else {
    // Restaurar selector simple
    if (sizeLabel) {
      sizeLabel.textContent = "TALLA";
    }

    selectedSizes = []; // Limpiar array
    sizeOptionsContainer.innerHTML = "";
    sizeOptionsContainer.className = "size-options-zara";

    // Recrear botones simples
    currentProduct.sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.className = "size-btn";
      btn.textContent = size;
      btn.type = "button";

      if (size === selectedSize) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        selectSize(size, btn);
      });

      sizeOptionsContainer.appendChild(btn);
    });
  }
}

function selectMultipleSize(size, index) {
  selectedSizes[index] = size;
  console.log(
    `Talla seleccionada: ${size} para artículo ${index + 1}`,
    selectedSizes
  );

  // Actualizar UI - solo el botón del grupo específico
  const selectorGroups = document.querySelectorAll(".size-selector-group");
  if (selectorGroups[index]) {
    const buttons = selectorGroups[index].querySelectorAll(".size-btn");
    buttons.forEach((btn) => btn.classList.remove("active"));

    const selectedBtn = Array.from(buttons).find(
      (btn) => btn.textContent === size
    );
    if (selectedBtn) {
      selectedBtn.classList.add("active");
    }
  }

  // Limpiar errores de validación
  const sizeError = document.getElementById("size-error");
  if (sizeError) sizeError.style.display = "none";

  // Si venimos de una advertencia y ya hay colores/tallas por artículo, auto-agregar
  try {
    if (__autoAddAfterValidation) {
      const allSizesSelected =
        Array.isArray(selectedSizes) &&
        selectedSizes.length === quantity &&
        selectedSizes.every((s) => !!s);
      const allColorsSelected =
        Array.isArray(selectedColors) &&
        selectedColors.length === quantity &&
        selectedColors.every((c) => !!c && c !== "default" && c !== "N/A");
      if (allSizesSelected && allColorsSelected) {
        const intent = __lastIntent || "add";
        __autoAddAfterValidation = false;
        closeAlert();
        setTimeout(() => {
          if (intent === "buy") buyNowFromModal();
          else addToCartFromModal();
        }, 0);
      }
    }
  } catch (e) {}
}

// Comprueba auto-add para múltiples después de seleccionar color/talla
function checkAutoAddForMultiple() {
  try {
    if (!__autoAddAfterValidation) return;
    const allSizesSelected =
      Array.isArray(selectedSizes) &&
      selectedSizes.length === quantity &&
      selectedSizes.every((s) => !!s);
    const allColorsSelected =
      Array.isArray(selectedColors) &&
      selectedColors.length === quantity &&
      selectedColors.every((c) => !!c && c !== "default" && c !== "N/A");
    if (allSizesSelected && allColorsSelected) {
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

function updateModalPrice() {
  if (!currentProduct) return;
  const unit = calculatePrice(
    quantity,
    currentProduct.price,
    selectedSize,
    currentProduct && currentProduct.category
  );
  // Actualizar panel de la izquierda (debajo de la imagen)
  const leftUnitEl = document.getElementById("current-price-left");
  const leftTotalEl = document.getElementById("total-price-left");

  // Reflejar precio/total en el bloque izquierdo del modal
  if (leftUnitEl) leftUnitEl.textContent = `RD$${unit} c/u`;
  if (leftTotalEl) {
    const total = (unit * quantity).toFixed(2);
    const retailPrice = currentProduct.price.retail;
    const savings = (retailPrice - unit) * quantity;
    let text = `Total: RD$${total}`;
    if (savings > 0) {
      text += ` (Ahorras RD$${savings.toFixed(2)})`;
    }
    leftTotalEl.textContent = text;
  }

  // Marcar la fila activa en la tabla de precios (retail / wholesale / dozen)
  try {
    const pricingContainer = document.querySelector(".pricing-tiers-zara");
    if (pricingContainer) {
      const tier =
        quantity >= 12 ? "dozen" : quantity >= 3 ? "wholesale" : "retail";
      // Si el producto es 'body', no existe la fila 'wholesale'
      const isBody = String(currentProduct.category).toLowerCase() === "body";
      // Limpiar estados
      pricingContainer.querySelectorAll(".tier-row").forEach((r) => {
        r.classList.remove("active");
      });
      if (tier === "wholesale" && isBody) {
        // En body no aplicamos wholesale; highlight only retail or dozen
        const chosen =
          quantity >= 12
            ? document.getElementById("tier-row-dozen")
            : document.getElementById("tier-row-retail");
        if (chosen) chosen.classList.add("active");
      } else {
        const row = document.getElementById("tier-row-" + tier);
        if (row) row.classList.add("active");
      }
    }
  } catch (e) {
    // noop
  }
}

// Función para mostrar alerta centrada
function showAlert(message, actions = []) {
  const alertModal = document.getElementById("alert-modal");
  const alertMessage = document.getElementById("alert-message");
  if (!alertModal || !alertMessage) {
    // Fallback nativo
    alert(message);
    return;
  }
  alertMessage.textContent = message;
  // Renderizar acciones si se proveen
  const actionsBox = document.getElementById("alert-actions");
  if (actionsBox) {
    actionsBox.innerHTML = "";
    (actions || []).forEach((a) => {
      const b = document.createElement("button");
      b.className = "alert-btn";
      b.textContent = a.label || "OK";
      b.addEventListener("click", () => {
        try {
          if (typeof a.action === "function") a.action();
        } finally {
          closeAlert();
        }
      });
      actionsBox.appendChild(b);
    });
  }
  alertModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Función para cerrar alerta
function closeAlert() {
  const alertModal = document.getElementById("alert-modal");
  if (alertModal) {
    alertModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Validar selecciones obligatorias con modal centrado
function validateSelections(action = "add") {
  let isValid = true;

  // NOTA: El color ahora es opcional por petición del cliente.
  // Validamos únicamente la(s) talla(s) (si falta talla, bloquear la acción).
  const sizeError = document.getElementById("size-error");
  let missingSize = false;

  if (quantity > 1) {
    missingSize =
      selectedSizes.length !== quantity ||
      selectedSizes.some(
        (size) => !size || size === null || size === undefined
      );
  } else {
    missingSize =
      !selectedSize || selectedSize === null || selectedSize === undefined;
  }

  if (missingSize) {
    if (sizeError) sizeError.style.display = "block";
    isValid = false;
  } else if (sizeError) sizeError.style.display = "none";

  if (missingSize) {
    const sizeButtons = Array.from(
      document.querySelectorAll("#size-options .size-btn")
    );
    const actions = sizeButtons.map((btn) => {
      const s = btn.textContent?.trim();
      return { label: s, action: () => btn.click() };
    });
    showAlert("Selecciona tu talla", actions);
    return false;
  }

  // Validar selección de color - OBLIGATORIO para bodys (001-008)
  const isBodyProduct =
    currentProduct &&
    currentProduct.id &&
    parseInt(currentProduct.id, 10) >= 1 &&
    parseInt(currentProduct.id, 10) <= 8;

  if (isBodyProduct) {
    // Para bodys, el color es SIEMPRE obligatorio
    const colorError = document.getElementById("color-error");
    const hasColor =
      isCustomColor ||
      (selectedColor && selectedColor !== "default" && selectedColor !== "N/A");

    if (!hasColor) {
      if (colorError) colorError.style.display = "block";
      const actions = [
        {
          label: "Elegir color",
          action: () => {
            const el = document.getElementById("color-swatches");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          },
        },
      ];
      showAlert("Por favor selecciona un color antes de continuar", actions);
      return false;
    } else {
      if (colorError) colorError.style.display = "none";
    }
  } else if (
    // Para otros productos, requerir color solo en múltiples artículos de crop-tops
    quantity > 1 &&
    String(action || "").toLowerCase() === "add" &&
    modalOpenContext === "crop-tops"
  ) {
    const colorError = document.getElementById("color-error");
    const missingColor =
      !Array.isArray(selectedColors) ||
      selectedColors.length !== quantity ||
      selectedColors.some((c) => !c || c === "default" || c === "N/A");
    if (missingColor) {
      if (colorError) colorError.style.display = "block";
      const actions = [
        {
          label: "Elegir color",
          action: () => {
            const el = document.getElementById("size-options");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          },
        },
      ];
      showAlert("Selecciona un color para cada artículo", actions);
      return false;
    } else {
      if (colorError) colorError.style.display = "none";
    }
  } else {
    // En los demás casos, asegurarnos de ocultar cualquier mensaje de color
    const colorError = document.getElementById("color-error");
    if (colorError) colorError.style.display = "none";
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
  if (!validateSelections("buy")) {
    // activar auto-add cuando el usuario complete selección
    __autoAddAfterValidation = true;
    return;
  }

  // Cerrar UI que puede tapar el formulario de cliente
  try {
    closeModal();
  } catch (e) {}
  try {
    closeCart();
  } catch (e) {}

  const customer = await collectCustomerInfo();
  if (customer === null) return; // usuario canceló

  let colorKey = null;
  let colorDisplay = "No especificado";
  if (isCustomColor) {
    colorKey = selectedColorHex;
    colorDisplay = `Personalizado (${selectedColorHex})`;
  } else if (
    selectedColor &&
    selectedColor !== "default" &&
    selectedColor !== "N/A"
  ) {
    colorKey = selectedColor;
    colorDisplay =
      selectedColor === "original"
        ? "Original (como en la foto)"
        : colorNames[selectedColor] || selectedColor;
  }

  const unitPrice = calculatePrice(
    quantity,
    currentProduct.price,
    selectedSize,
    currentProduct && currentProduct.category
  );
  const subtotal = unitPrice * quantity;
  const savings = (currentProduct.price.retail - unitPrice) * quantity;

  // Determinar tier
  let tierBadge = "";
  if (quantity >= 12) tierBadge = "🎯 DOCENA";
  else if (quantity >= 3) tierBadge = "📦 MAYOR";
  else tierBadge = "🛍️ DETALLE";

  const colorEmoji = getColorEmoji(colorKey);

  const orderId = `FM-${Date.now().toString().slice(-6)}`;
  const now = new Date();
  const dateStr = now.toLocaleString();

  let message = `FabricaMayorista\n`;
  if (currentProduct && currentProduct.category === "danza") {
    message += `Sección: Danza\n`;
  }
  message += `Pedido: ${orderId}\n`;
  message += `Fecha: ${dateStr}\n`;
  if (customer.name) message += `Cliente: ${customer.name}\n`;
  if (customer.city) message += `Ciudad: ${customer.city}\n`;
  message += `------------------------------\n\n`;
  const displayNameSingle = getDisplayName(currentProduct);
  message += `*${displayNameSingle}*\n`;
  message += `Código: ${currentProduct.code}\n`;
  if (
    quantity > 1 &&
    Array.isArray(selectedSizes) &&
    selectedSizes.length === quantity
  ) {
    // Listar cada artículo con su talla y color
    for (let i = 0; i < selectedSizes.length; i++) {
      const sz = selectedSizes[i];
      const c =
        Array.isArray(selectedColors) && selectedColors[i]
          ? selectedColors[i]
          : null;
      const colorDisp = c
        ? String(c).startsWith("#")
          ? `Personalizado (${c})`
          : colorNames[c] || c
        : "No especificado";
      message += `Artículo ${i + 1}: Talla: ${sz} • Color: ${colorDisp}\n`;
    }
    const tierText =
      quantity >= 12 ? "DOCENA" : quantity >= 3 ? "MAYOR" : "DETALLE";
    message += `Cantidad: ${quantity} un. [${tierText}]\n`;
    message += `Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
    message += `Subtotal: RD$${subtotal.toFixed(2)}\n`;
  } else {
    message += `Talla: ${selectedSize}\n`;
    message += `Color: ${colorDisplay}\n`;
    const tierText =
      quantity >= 12 ? "DOCENA" : quantity >= 3 ? "MAYOR" : "DETALLE";
    message += `Cantidad: ${quantity} un. [${tierText}]\n`;
    message += `Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
    message += `Subtotal: RD$${subtotal.toFixed(2)}\n`;
  }

  if (savings > 0) {
    message += `Ahorro: RD$${savings.toFixed(2)}\n`;
  }

  message += `\nTOTAL: RD$${subtotal.toFixed(2)}\n\n`;
  // Mostrar referencia clara a la docena en el mensaje como pidió el cliente
  message += `Precios por docena, 12+\n`;
  message += `Envíos a toda República Dominicana\n`;
  message += `https://fabricamayorista.local`;

  const whatsappUrl = `https://wa.me/18093027761?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");

  closeModal();
}

function addToCartFromModal() {
  __lastIntent = "add";
  if (!currentProduct) return;
  if (!validateSelections("add")) {
    // activar auto-add cuando el usuario complete selección
    __autoAddAfterValidation = true;
    return;
  }

  let colorKey = null;
  let colorDisplay = "No especificado";
  if (isCustomColor) {
    colorKey = selectedColorHex;
    colorDisplay = `Personalizado (${selectedColorHex})`;
  } else if (
    selectedColor &&
    selectedColor !== "default" &&
    selectedColor !== "N/A"
  ) {
    colorKey = selectedColor;
    colorDisplay =
      selectedColor === "original"
        ? "Original (como en la foto)"
        : colorNames[selectedColor] || selectedColor;
  }
  // Sólo usar imagen específica si existe para ese color. Si no existe, guardar null para mostrar swatch en el carrito.
  const imageToUse =
    !isCustomColor &&
    currentProduct.images &&
    currentProduct.images[selectedColor]
      ? currentProduct.images[selectedColor]
      : null;

  // Guardar la imagen original (default) o la primera imagen disponible para enviarla y mostrarla recoloreada en el carrito
  const imageOriginal =
    currentProduct.images &&
    (currentProduct.images.default ||
      currentProduct.images.blanco ||
      currentProduct.images[
        Object.keys(currentProduct.images).find((k) => k !== "default")
      ])
      ? currentProduct.images.default ||
        currentProduct.images.blanco ||
        currentProduct.images[
          Object.keys(currentProduct.images).find((k) => k !== "default")
        ]
      : null;

  const displayName = getDisplayName(currentProduct);
  let addedItems = [];

  if (quantity > 1 && selectedSizes.length === quantity) {
    // Modo múltiples tallas: agregar cada talla como item separado
    console.log(`Agregando al carrito - Múltiples tallas:`, selectedSizes);
    selectedSizes.forEach((size, idx) => {
      const c =
        Array.isArray(selectedColors) && selectedColors[idx]
          ? selectedColors[idx]
          : null;
      const perColorKey = c && String(c).startsWith("#") ? c : c;
      const perColorDisplay = perColorKey
        ? String(perColorKey).startsWith("#")
          ? `Personalizado (${perColorKey})`
          : colorNames[perColorKey] || perColorKey
        : "No especificado";
      const perImage =
        currentProduct.images && currentProduct.images[perColorKey]
          ? currentProduct.images[perColorKey]
          : null;

      const existing = cart.find(
        (i) =>
          i.id === currentProduct.id &&
          i.colorKey === perColorKey &&
          i.size === size
      );

      if (existing) {
        existing.qty += 1;
        addedItems.push(existing);
      } else {
        const newItem = {
          id: currentProduct.id,
          name: displayName,
          code: currentProduct.code,
          category: currentProduct.category || null,
          basePrice: currentProduct.price,
          colorKey: perColorKey,
          colorDisplay: perColorDisplay,
          colorHex: String(perColorKey).startsWith("#") ? perColorKey : null,
          size: size,
          qty: 1,
          image: perImage,
          imageOriginal:
            currentProduct.images && currentProduct.images.default
              ? currentProduct.images.default
              : null,
        };
        cart.push(newItem);
        addedItems.push(newItem);
      }
    });
  } else {
    // Modo simple: agregar como antes
    const existing = cart.find(
      (i) =>
        i.id === currentProduct.id &&
        i.colorKey === colorKey &&
        i.size === selectedSize
    );

    if (existing) {
      existing.qty += quantity;
      addedItems.push(existing);
    } else {
      const newItem = {
        id: currentProduct.id,
        name: displayName,
        code: currentProduct.code,
        category: currentProduct.category || null,
        basePrice: currentProduct.price,
        colorKey,
        colorDisplay,
        colorHex: selectedColorHex,
        size: selectedSize,
        qty: quantity,
        image: imageToUse,
        imageOriginal:
          currentProduct.images && currentProduct.images.default
            ? currentProduct.images.default
            : null,
      };
      cart.push(newItem);
      addedItems.push(newItem);
    }
  }

  renderCart();
  saveCart();

  // Mostrar panel con información apropiada
  try {
    if (typeof showAddedPanel === "function" && addedItems.length > 0) {
      const message =
        quantity > 1
          ? `${quantity} artículos añadidos al carrito`
          : `${addedItems[0].name} añadido al carrito`;
      showAddedPanel(addedItems[0], message);
    }
  } catch (e) {
    console.warn("showAddedPanel error:", e);
  }
  closeModal();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Carrito vacío</div>';
    totalEl.textContent = "RD$0.00";
    try {
      updateCartBadge(0);
    } catch (e) {}
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const unitPrice = calculatePrice(
      item.qty,
      item.basePrice,
      item.size,
      item.category
    );
    const subtotal = unitPrice * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item-professional";
    const displayName = getDisplayName({
      id: item.id,
      name: item.name,
      code: item.code,
    });

    const imageHtml =
      item.image || item.imageOriginal
        ? `<div class=\"cart-item-image\">\n           <img src=\"${
            item.image || item.imageOriginal
          }\" alt=\"${item.name}\">\n         </div>`
        : `<div class=\"cart-item-image cart-item-no-image\">\n           <div class=\"no-image-placeholder\"></div>\n         </div>`;

    div.innerHTML = `
      ${imageHtml}
      <div class="cart-item-details">
        <div class="cart-item-header">
          <h4 class="cart-item-name">${displayName}</h4>
          <span class="cart-item-code">Código: ${item.code}</span>
        </div>
        <div class="cart-item-specs">
          <span class="cart-spec">Talla: ${item.size}</span>
          <span class="cart-spec">Color: ${
            item.colorDisplay || item.colorKey
          }</span>
        </div>
        <div class="cart-item-pricing">
          <div class="cart-qty-control">
    <button class="qty-btn-cart" onclick="event.preventDefault(); event.stopPropagation(); updateQty(${index}, ${
      item.qty - 1
    })">−</button>
            <span class="qty-display-cart">${item.qty}</span>
    <button class="qty-btn-cart" onclick="event.preventDefault(); event.stopPropagation(); updateQty(${index}, ${
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

  totalEl.textContent = `RD$${total.toFixed(2)}`;
  updateCartBadge(cart.reduce((s, it) => s + it.qty, 0));
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) checkoutBtn.disabled = false;
}

// Actualiza el badge del carrito (círculo de cantidad)
function updateCartBadge(count) {
  const badges = document.querySelectorAll(".cart-badge, #cart-badge");
  badges.forEach((badge) => {
    if (!badge) return;
    badge.textContent = count;
    // Mostrar/ocultar dependiendo del conteo
    const style = badge.style;
    if (style) style.display = count > 0 ? "flex" : "none";
  });
}

function updateQty(index, value) {
  const qty = parseInt(value) || 1;
  if (qty < 1) removeFromCart(index);
  else {
    cart[index].qty = qty;
    renderCart();
    saveCart();
    // Mantener carrito abierto tras actualizar la cantidad
    try {
      const sidebar = document.getElementById("cart-sidebar");
      const overlay = document.getElementById("cart-overlay");
      if (sidebar) sidebar.classList.add("active");
      if (overlay) overlay.classList.add("active");
      attachCartCloseListeners();
    } catch (e) {}
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
  saveCart();
  // Mantener carrito abierto tras eliminar
  try {
    const sidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("cart-overlay");
    if (sidebar) sidebar.classList.add("active");
    if (overlay) overlay.classList.add("active");
    attachCartCloseListeners();
  } catch (e) {}
}

// Búsqueda genérica para páginas que usan app.js y tienen un #products-grid
function renderSearchResultsInGrid() {
  const container = document.getElementById("products-grid");
  if (!container) return;
  const qNorm = normalizeText((searchQuery || "").trim());
  if (!qNorm) {
    container.innerHTML =
      '<div class="empty-state">Escribe en el buscador para encontrar productos</div>';
    return;
  }
  const filtered = products.filter((p) => {
    const hay = `${p.name || ""} ${p.code || p.id || ""} ${getProductKeywords(
      p
    )}`;
    return normalizeText(hay).includes(qNorm);
  });
  if (filtered.length === 0) {
    container.innerHTML =
      '<div class="empty-state">No se encontraron productos</div>';
    return;
  }
  container.innerHTML = "";
  filtered.forEach((p) => container.appendChild(createProductCard(p)));
}

// listeners que dependen del DOM
document.addEventListener("DOMContentLoaded", () => {
  // Ensure shared overlays exist first to avoid layout shifts when opening modal/cart
  try {
    ensureSharedUI();
  } catch (e) {}
  loadCart();
  renderCart();

  // Connect cart buttons
  const cartBtn = document.getElementById("cart-open");
  const fabCart = document.getElementById("fab-cart");
  const closeCart = document.getElementById("close-cart");

  if (cartBtn) cartBtn.addEventListener("click", toggleCart);
  if (fabCart) fabCart.addEventListener("click", toggleCart);
  if (closeCart) closeCart.addEventListener("click", toggleCart);

  // Connect modal buttons (will be created dynamically)
  document.addEventListener("click", (e) => {
    if (e.target.id === "buy-now-btn") {
      buyNowFromModal();
    } else if (e.target.id === "add-to-cart-btn") {
      addToCartFromModal();
    } else if (e.target.closest && e.target.closest("#modal-close")) {
      // Cerrar modal al presionar la X
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    } else if (e.target.id === "modal-prev") {
      // Navegar al producto anterior
      e.preventDefault();
      e.stopPropagation();
      navigateModal(-1);
    } else if (e.target.id === "modal-next") {
      // Navegar al producto siguiente
      e.preventDefault();
      e.stopPropagation();
      navigateModal(1);
    }
  });

  // Centrar automáticamente el tab activo en el sub-nav horizontal
  try {
    const tabs = document.querySelector(".section-tabs");
    if (tabs) {
      // Esperar a que el layout esté listo
      requestAnimationFrame(() => {
        const active =
          tabs.querySelector(".tab-button.active") ||
          tabs.querySelector(".tab-button");
        if (active) {
          const tabsRect = tabs.getBoundingClientRect();
          const activeRect = active.getBoundingClientRect();
          const current = tabs.scrollLeft;
          const delta =
            activeRect.left +
            activeRect.width / 2 -
            (tabsRect.left + tabsRect.width / 2);
          tabs.scrollTo({ left: current + delta, behavior: "auto" });
        }
      });
    }
  } catch (e) {}

  // Press-and-hold para los botones de cantidad (mouse y touch)
  (function initQtyPressAndHold() {
    let holdTimer = null;
    let repeatTimer = null;
    let step = 1;

    function clearTimers() {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      if (repeatTimer) {
        clearInterval(repeatTimer);
        repeatTimer = null;
      }
      step = 1;
    }

    function startHold(delta) {
      // ejecución inicial
      changeQty(delta);
      // después de un breve retardo, comenzar repetición
      holdTimer = setTimeout(() => {
        repeatTimer = setInterval(() => {
          changeQty(delta);
        }, 120);
      }, 350);
    }

    function bindHold(el, delta) {
      if (!el) return;
      // mouse
      el.addEventListener("mousedown", (e) => {
        e.preventDefault();
        startHold(delta);
      });
      // touch
      el.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          startHold(delta);
        },
        { passive: false }
      );
      // liberar
      ["mouseup", "mouseleave", "touchend", "touchcancel", "blur"].forEach(
        (evt) => {
          el.addEventListener(evt, clearTimers);
        }
      );
      // por si sueltan fuera del botón
      document.addEventListener("mouseup", clearTimers);
      document.addEventListener("touchend", clearTimers, { passive: true });
    }

    // esperar a que el DOM tenga los botones del modal (puede abrir/cerrar dinámicamente)
    const observer = new MutationObserver(() => {
      const inc = document.getElementById("qty-increase");
      const dec = document.getElementById("qty-decrease");
      if (inc && !inc.dataset._holdBound) {
        bindHold(inc, 1);
        inc.dataset._holdBound = "1";
      }
      if (dec && !dec.dataset._holdBound) {
        bindHold(dec, -1);
        dec.dataset._holdBound = "1";
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  })();

  // Cerrar modal con tecla Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Ocultar los FABs (redes y carrito) cuando el footer es visible para evitar desorden
  try {
    const fabContainer = document.querySelector(".social-fab-container");
    const cartFab = document.querySelector(".fab-cart");
    const addedPanel = document.getElementById("added-panel");
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
            if (addedPanel) apply(addedPanel, "1rem");
          });
        },
        { root: null, threshold: 0.01 }
      );
      observer.observe(footer);
    }
  } catch (e) {
    // ignore
  }

  const searchInput = document.getElementById("site-search");
  if (searchInput) {
    // Precargar desde ?q= si viene en la URL
    try {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get("q");
      if (qParam) {
        searchInput.value = qParam;
        searchQuery = qParam;
        if (document.getElementById("products-grid")) {
          renderSearchResultsInGrid();
        }
      }
    } catch (e) {}

    const pageCategory = (function () {
      const path = (location.pathname || "").toLowerCase();
      if (path.endsWith("/body.html") || path.endsWith("body.html"))
        return "body";
      if (path.endsWith("/vestidos.html") || path.endsWith("vestidos.html"))
        return "vestidos";
      if (path.endsWith("/faldas.html") || path.endsWith("faldas.html"))
        return "faldas";
      if (path.endsWith("/pantalones.html") || path.endsWith("pantalones.html"))
        return "pantalones";
      if (path.endsWith("/conjuntos.html") || path.endsWith("conjuntos.html"))
        return "conjuntos";
      if (path.endsWith("/enterizos.html") || path.endsWith("enterizos.html"))
        return "enterizos";
      if (path.endsWith("/danza.html") || path.endsWith("danza.html"))
        return "danza";
      return null;
    })();

    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value || "";
      // Si hay un grid genérico en esta página, pintar resultados ahí
      const hasGrid = document.getElementById("products-grid");
      if (hasGrid) {
        if (pageCategory) renderCategoryGrid(pageCategory);
        else renderSearchResultsInGrid();
      }
    });

    // En páginas sin grid (ej. inicio), Enter redirige a blusas con ?q=
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const term = (searchInput.value || "").trim();
        if (!term) return;
        const hasGrid = !!document.getElementById("products-grid");
        const hasCrop = !!document.getElementById("crop-tops-products");
        if (!hasGrid && !hasCrop) {
          // Redirigir según categoría detectada
          const category = detectCategoryFromQuery(term) || "blusas";
          const categoryPages = {
            "crop-tops": "crop-tops.html",
            blusas: "blusas.html",
            vestidos: "vestidos.html",
            faldas: "faldas.html",
            pantalones: "pantalones.html",
            conjuntos: "conjuntos.html",
            enterizos: "enterizos.html",
            danza: "danza.html",
            body: "body.html",
          };
          const dest = categoryPages[category] || "blusas.html";
          window.location.href = `${dest}?q=${encodeURIComponent(term)}`;
        }
      }
    });
  }

  // Si estamos en una página de categoría con grid, renderizarla (vestidos por ahora)
  try {
    const pageCategory = (function () {
      const path = (location.pathname || "").toLowerCase();
      if (path.endsWith("/body.html") || path.endsWith("body.html"))
        return "body";
      if (path.endsWith("/vestidos.html") || path.endsWith("vestidos.html"))
        return "vestidos";
      if (path.endsWith("/faldas.html") || path.endsWith("faldas.html"))
        return "faldas";
      if (path.endsWith("/pantalones.html") || path.endsWith("pantalones.html"))
        return "pantalones";
      if (path.endsWith("/conjuntos.html") || path.endsWith("conjuntos.html"))
        return "conjuntos";
      if (path.endsWith("/enterizos.html") || path.endsWith("enterizos.html"))
        return "enterizos";
      if (path.endsWith("/danza.html") || path.endsWith("danza.html"))
        return "danza";
      return null;
    })();
    if (pageCategory && document.getElementById("products-grid")) {
      renderCategoryGrid(pageCategory);
    }
  } catch (e) {}

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", async () => {
      if (cart.length === 0) {
        alert("Carrito vacío");
        return;
      }

      // Cerrar el carrito para que el formulario no quede tapado
      try {
        closeCart();
      } catch (e) {}

      const customer = await collectCustomerInfo();
      if (customer === null) return; // cancelado

      const note = document.getElementById("note")
        ? document.getElementById("note").value.trim()
        : "";
      const orderId = generateOrderId();
      const now = new Date();
      const dateStr = now.toLocaleString();

      let header = `FabricaMayorista\n`;
      try {
        const hasDanza = cart.some(
          (i) =>
            i &&
            (i.category === "danza" ||
              products.find((p) => p.code === i.code)?.category === "danza")
        );
        if (hasDanza) header += `Sección: Danza\n`;
      } catch (e) {}
      header += `Pedido: ${orderId}\n`;
      header += `Fecha: ${dateStr}\n`;
      if (customer.name) header += `Cliente: ${customer.name}\n`;
      if (customer.city) header += `Ciudad: ${customer.city}\n`;
      header += `------------------------------\n\n`;

      let body = "";
      let totalSavings = 0;

      cart.forEach((i, idx) => {
        const nameForMsg = getDisplayName(i);
        const unitPrice = calculatePrice(
          i.qty,
          i.basePrice,
          i.size,
          i.category
        );
        const subtotal = unitPrice * i.qty;
        const savings = (i.basePrice.retail - unitPrice) * i.qty;
        totalSavings += savings;

        // Determinar tier y emoji
        const tierBadge =
          i.qty >= 12 ? "DOCENA" : i.qty >= 3 ? "MAYOR" : "DETALLE";

        body += `*${idx + 1}) ${nameForMsg}*\n`;
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
        (sum, i) =>
          sum + calculatePrice(i.qty, i.basePrice, i.size, i.category) * i.qty,
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
      footer += `\nPrecios por docena, 12+\n`;
      footer += `Envíos a toda República Dominicana\n`;
      footer += `https://fabricamayorista.local`;

      const msg = header + body + footer;

      // Abrir WhatsApp con texto solamente. Se abre una ventana nueva para evitar bloqueos.
      const outWin = window.open("", "_blank");
      const wa = `https://wa.me/18093027761?text=${encodeURIComponent(msg)}`;
      try {
        if (outWin) outWin.location.href = wa;
        else window.open(wa, "_blank");
      } catch (e) {
        window.open(wa, "_blank");
      }
    });
  }

  const productModal = document.getElementById("product-modal");
  if (productModal)
    productModal.addEventListener("click", (e) => {
      if (e.target.id === "product-modal") closeModal();
    });

  // Setup crop tops cover click functionality
  const cropTopsCover = document.getElementById("croptops-cover");
  if (cropTopsCover) {
    cropTopsCover.addEventListener("click", () => {
      // Redirect to crop-tops.html
      window.location.href = "crop-tops.html";
    });
  }

  // Products are now organized by category, no need for general product rendering on index
});

// Solicitar nombre y ciudad mediante modal y devolver {name, city} o null si se cancela
function collectCustomerInfo() {
  return new Promise((resolve) => {
    try {
      ensureSharedUI();
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

      // Prellenar desde localStorage si existen datos previos
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
        // Guardar para futuras compras
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
      // Foco inteligente: 1) nombre, 2) ciudad, 3) confirmar si ambos llenos
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

// Config: elegir si los mensajes de WhatsApp incluyen emojis o usan solo ASCII
// Cambia a `true` para probar con emojis (si WhatsApp los muestra correctamente en el cliente)
const whatsappUseEmoji = false;
// Config: panel lateral de "añadido a la cesta" (tipo Zara)
// Si es false, se mostrará un toast centrado y no se mostrará el panel a la derecha
const addedPanelEnabled = false;

function buildWhatsAppMessageSingle(
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
  // Usar nombre amigable por categoría (evitar "Artículo N")
  const displayName = getDisplayName(currentProduct);
  if (whatsappUseEmoji) {
    let message = `🛍️ *FabricaMayorista*\n`;
    message += `📋 Pedido: ${orderId}\n`;
    message += `📅 Fecha: ${dateStr}\n`;
    if (customer && customer.name) message += `👤 Cliente: ${customer.name}\n`;
    if (customer && customer.city) message += `📍 Ciudad: ${customer.city}\n`;
    message += `────────────────────────\n\n`;
    message += `*${displayName}*\n`;
    message += `📦 Código: ${currentProduct.code}\n`;
    message += `👕 Talla: ${selectedSize}\n`;
    message += `🎨 Color: ${colorDisplay}\n`;
    message += `📊 Cantidad: ${quantity} un.\n`;
    message += `💰 Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
    message += `💵 Subtotal: RD$${subtotal.toFixed(2)}\n`;
    if (savings > 0) message += `✅ Ahorro: RD$${savings.toFixed(2)}\n`;
    message += `\n💎 *TOTAL: RD$${subtotal.toFixed(2)}*\n`;
    // Indicar docena explícitamente
    message += `\nPrecios por docena, 12+\n`;
    return message;
  }

  // ASCII safe
  let message = `FabricaMayorista\n`;
  message += `Pedido: ${orderId}\n`;
  message += `Fecha: ${dateStr}\n`;
  if (customer && customer.name) message += `Cliente: ${customer.name}\n`;
  if (customer && customer.city) message += `Ciudad: ${customer.city}\n`;
  message += `------------------------------\n\n`;
  message += `*${displayName}*\n`;
  message += `Código: ${currentProduct.code}\n`;
  message += `Talla: ${selectedSize}\n`;
  message += `Color: ${colorDisplay}\n`;
  message += `Cantidad: ${quantity} un.\n`;
  message += `Precio: RD$${unitPrice.toFixed(2)} c/u\n`;
  message += `Subtotal: RD$${subtotal.toFixed(2)}\n`;
  if (savings > 0) message += `Ahorro: RD$${savings.toFixed(2)}\n`;
  message += `\nTOTAL: RD$${subtotal.toFixed(2)}\n`;
  // Indicar docena explícitamente
  message += `\nPrecios por docena, 12+\n`;
  return message;
}

// Tab functionality
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const productSections = document.querySelectorAll(".product-section");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.dataset.section;

      // Remove active class from all tabs and sections
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      productSections.forEach((section) => section.classList.remove("active"));

      // Add active class to clicked tab and corresponding section
      button.classList.add("active");
      document.getElementById(sectionId + "-section").classList.add("active");

      // Render products for the active section
      if (sectionId === "crop-tops") {
        renderCropTopsSection();
      } else if (sectionId === "otros-productos") {
        renderOtrosProductosSection();
      }
    });
  });

  // Initialize with crop tops active
  renderCropTopsSection();
}

// Render products for Crop Tops section
function renderCropTopsSection() {
  const container = document.getElementById("crop-tops-products");
  if (!container) return;

  container.innerHTML = "";
  const q = (searchQuery || "").toLowerCase().trim();

  // Filter crop tops (IDs 009..025)
  const cropTops = products.filter((p) => {
    const n = parseInt(p.id, 10);
    const isCropTop = !Number.isNaN(n) && n >= 9 && n <= 25;

    if (!q) return isCropTop;

    const searchText = (p.name || "") + " " + p.id;
    return isCropTop && searchText.toLowerCase().includes(q);
  });

  cropTops.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });

  // Lista visible según sección
  visibleProductIds = cropTops.map((p) => p.id);

  // Animate cards
  setTimeout(() => {
    container.querySelectorAll(".product").forEach((p) => {
      if (!p.classList.contains("animate")) p.classList.add("animate");
    });
  }, 80);
}

// Render products for Otros Productos section
function renderOtrosProductosSection() {
  const container = document.getElementById("otros-productos-products");
  if (!container) return;

  container.innerHTML = "";
  const q = (searchQuery || "").toLowerCase().trim();

  // Filter other products (not crop tops)
  const others = products.filter((p) => {
    const n = parseInt(p.id, 10);
    const isOther = Number.isNaN(n) || n < 9 || n > 25;

    if (!q) return isOther;

    const searchText = (p.name || "") + " " + p.id;
    return isOther && searchText.toLowerCase().includes(q);
  });

  others.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });

  // Lista visible según sección
  visibleProductIds = others.map((p) => p.id);

  // Animate cards
  setTimeout(() => {
    container.querySelectorAll(".product").forEach((p) => {
      if (!p.classList.contains("animate")) p.classList.add("animate");
    });
  }, 80);
}

// Helper function to create product cards (moved from renderProducts)
function createProductCard(p) {
  const div = document.createElement("div");
  div.className = "product-card";
  const firstImage =
    (p.images &&
      (p.images.default ||
        p.images.blanco ||
        p.images[Object.keys(p.images).find((k) => k !== "default")])) ||
    "";
  const displayName = getDisplayName(p);
  const retail = Number(p.price && p.price.retail ? p.price.retail : 0);
  const wholesale = Number(
    p.price && p.price.wholesale !== undefined ? p.price.wholesale : retail
  );
  const dozen = Number(
    p.price && p.price.dozen !== undefined ? p.price.dozen : retail
  );
  div.innerHTML = `
    <div class="product-card-minimal">
      <div class="product-image-wrapper">
        <img class="product-image-clean"
          src="${firstImage}"
          alt="${displayName}"
          loading="lazy"
          onerror="this.src='https://via.placeholder.com/300x300?text=Sin+imagen'">
        <div class="product-code-overlay">Código: ${p.code}</div>
      </div>
      <div class="product-info-minimal">
        <h3 class="product-name-clean">${displayName}</h3>
        <div class="product-pricing">
          <div class="price-main">
            <span class="price-amount">RD$${retail}</span>
            <span class="price-unit">c/u</span>
          </div>
          <div class="price-tiers">
            ${
              wholesale !== retail
                ? `<div class="tier">Mayor (3+): RD$${wholesale}</div>`
                : ``
            }
            <div class="tier best">Docena (12+): RD$${dozen}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Make the product card clickable
  div.setAttribute("role", "button");
  div.setAttribute("tabindex", "0");
  div.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Establecer el contexto del modal según el contexto de render actual
    // o inferir por rango de id (9..48 => 'crop-tops') para mantener consistencia
    try {
      modalOpenContext =
        currentRenderCategoryContext ||
        (function () {
          const n = parseInt(p.id, 10);
          if (!Number.isNaN(n) && n >= 9 && n <= 48) return "crop-tops";
          return null;
        })();
    } catch (e) {
      modalOpenContext = currentRenderCategoryContext || null;
    }
    openModal(p.id);
  });
  div.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      // Mantener el mismo comportamiento que en el click: setear modalOpenContext
      try {
        modalOpenContext =
          currentRenderCategoryContext ||
          (function () {
            const n = parseInt(p.id, 10);
            if (!Number.isNaN(n) && n >= 9 && n <= 48) return "crop-tops";
            return null;
          })();
      } catch (e) {
        modalOpenContext = currentRenderCategoryContext || null;
      }
      openModal(p.id);
    }
  });

  return div;
}
