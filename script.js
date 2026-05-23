/* ============================================================
   ShopMart — script.js
   Products use real Unsplash images (no API key needed).
   ============================================================ */

/* ── 1. PRODUCT DATA ─────────────────────────────────────────
   Real photos from Unsplash (direct CDN links, always free).
   Format: ?w=400&q=75 keeps file size small.
   ──────────────────────────────────────────────────────────── */
const products = [
  // Electronics
  {
    id: 1, name: "Sony WH-1000XM5 Headphones", cat: "electronics",
    price: 24999, rating: 4.8,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=75"
  },
  {
    id: 2, name: "Apple Watch Series 9", cat: "electronics",
    price: 41999, rating: 4.7,
    img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=75"
  },
  {
    id: 3, name: "Portable Bluetooth Speaker", cat: "electronics",
    price: 3499, rating: 4.4,
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=75"
  },
  {
    id: 4, name: "MacBook Pro Laptop", cat: "electronics",
    price: 129999, rating: 4.9,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=75"
  },
  {
    id: 5, name: "Canon DSLR Camera", cat: "electronics",
    price: 54999, rating: 4.6,
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=75"
  },

  // Fashion
  {
    id: 6, name: "Men's Classic White Shirt", cat: "fashion",
    price: 1299, rating: 4.2,
    img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=75"
  },
  {
    id: 7, name: "Women's Running Shoes", cat: "fashion",
    price: 4599, rating: 4.5,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=75"
  },
  {
    id: 8, name: "Leather Handbag", cat: "fashion",
    price: 3299, rating: 4.3,
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=75"
  },
  {
    id: 9, name: "Classic Sunglasses", cat: "fashion",
    price: 1799, rating: 4.1,
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=75"
  },
  {
    id: 10, name: "Denim Jacket", cat: "fashion",
    price: 2799, rating: 4.4,
    img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=75"
  },

  // Home
  {
    id: 11, name: "Coffee Maker Machine", cat: "home",
    price: 5499, rating: 4.6,
    img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&q=75"
  },
  {
    id: 12, name: "Ceramic Mug Set (4 pcs)", cat: "home",
    price: 799, rating: 4.7,
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=75"
  },
  {
    id: 13, name: "Modern Table Lamp", cat: "home",
    price: 1599, rating: 4.3,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=75"
  },
  {
    id: 14, name: "Scented Candle Set", cat: "home",
    price: 649, rating: 4.8,
    img: "https://images.unsplash.com/photo-1603905731579-c8b0e05d1d43?w=400&q=75"
  },

  // Sports
  {
    id: 15, name: "Professional Yoga Mat", cat: "sports",
    price: 1199, rating: 4.5,
    img: "https://images.unsplash.com/photo-1601925228008-0e0aa35a87b9?w=400&q=75"
  },
  {
    id: 16, name: "Stainless Water Bottle", cat: "sports",
    price: 699, rating: 4.6,
    img: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=400&q=75"
  },
  {
    id: 17, name: "Dumbbell Set (5–20 kg)", cat: "sports",
    price: 4999, rating: 4.4,
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=75"
  },
  {
    id: 18, name: "Running Armband + Earphones", cat: "sports",
    price: 899, rating: 4.2,
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=75"
  },
];


/* ── 2. STATE ────────────────────────────────────────────────── */
let cart        = [];           // { ...product, qty }
let activeCat   = "all";
let sortVal     = "";
let searchQuery = "";


/* ── 3. DOM REFS ─────────────────────────────────────────────── */
const grid           = document.getElementById("grid");
const noResults      = document.getElementById("noResults");
const resultCount    = document.getElementById("resultCount");
const searchInput    = document.getElementById("searchInput");
const sortSelect     = document.getElementById("sortSelect");
const filtersEl      = document.getElementById("filters");

const cartBtn        = document.getElementById("cartBtn");
const cartCount      = document.getElementById("cartCount");
const cartPanel      = document.getElementById("cartPanel");
const overlay        = document.getElementById("overlay");
const closeCart      = document.getElementById("closeCart");
const cartList       = document.getElementById("cartList");
const cartEmpty      = document.getElementById("cartEmpty");
const cartFooter     = document.getElementById("cartFooter");
const cartTotal      = document.getElementById("cartTotal");

const checkoutBtn    = document.getElementById("checkoutBtn");
const modalOverlay   = document.getElementById("modalOverlay");
const closeModal     = document.getElementById("closeModal");
const orderSummary   = document.getElementById("orderSummary");
const placeOrderBtn  = document.getElementById("placeOrder");

const successOverlay = document.getElementById("successOverlay");
const continueBtn    = document.getElementById("continueShopping");


/* ── 4. RENDER PRODUCTS ─────────────────────────────────────── */
function renderProducts() {
  let list = [...products];

  // Filter by category
  if (activeCat !== "all") list = list.filter(p => p.cat === activeCat);

  // Filter by search
  if (searchQuery) {
    list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Sort
  if (sortVal === "lh")     list.sort((a, b) => a.price - b.price);
  if (sortVal === "hl")     list.sort((a, b) => b.price - a.price);
  if (sortVal === "rating") list.sort((a, b) => b.rating - a.rating);

  grid.innerHTML = "";

  if (!list.length) {
    noResults.classList.remove("hidden");
    resultCount.textContent = "";
    return;
  }

  noResults.classList.add("hidden");
  resultCount.textContent = `${list.length} product${list.length > 1 ? "s" : ""} found`;

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img class="card-img" src="${p.img}" alt="${p.name}" loading="lazy" />
      <div class="card-body">
        <span class="card-cat">${p.cat}</span>
        <p class="card-name">${p.name}</p>
        <p class="card-rating">
          ${"★".repeat(Math.floor(p.rating))}${"☆".repeat(5 - Math.floor(p.rating))}
          <span>${p.rating}</span>
        </p>
        <p class="card-price">₹${p.price.toLocaleString("en-IN")}</p>
      </div>
      <button class="add-btn" data-id="${p.id}">+ Add to Cart</button>
    `;
    card.querySelector(".add-btn").addEventListener("click", () => addToCart(p.id));
    grid.appendChild(card);
  });
}


/* ── 5. CART LOGIC ──────────────────────────────────────────── */
function addToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...products.find(p => p.id === id), qty: 1 });
  }
  refreshCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  refreshCart();
}

function refreshCart() {
  // Update badge
  const total = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = total;

  cartList.innerHTML = "";

  if (!cart.length) {
    cartEmpty.classList.remove("hidden");
    cartFooter.classList.add("hidden");
    return;
  }

  cartEmpty.classList.add("hidden");
  cartFooter.classList.remove("hidden");

  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <img class="ci-img" src="${item.img}" alt="${item.name}" />
      <div class="ci-info">
        <p class="ci-name">${item.name}</p>
        <p class="ci-meta">₹${item.price.toLocaleString("en-IN")} × ${item.qty}</p>
      </div>
      <div class="ci-qty">
        <button class="q-btn" data-id="${item.id}" data-d="-1">−</button>
        <span class="q-num">${item.qty}</span>
        <button class="q-btn" data-id="${item.id}" data-d="1">+</button>
      </div>
      <button class="ci-del" data-id="${item.id}" title="Remove">🗑</button>
    `;
    cartList.appendChild(li);
  });

  // Qty buttons
  cartList.querySelectorAll(".q-btn").forEach(btn => {
    btn.addEventListener("click", () => changeQty(+btn.dataset.id, +btn.dataset.d));
  });

  // Delete buttons
  cartList.querySelectorAll(".ci-del").forEach(btn => {
    btn.addEventListener("click", () => {
      cart = cart.filter(i => i.id !== +btn.dataset.id);
      refreshCart();
    });
  });

  // Grand total
  const grand = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotal.textContent = `₹${grand.toLocaleString("en-IN")}`;
}


/* ── 6. CHECKOUT ────────────────────────────────────────────── */
function openCheckout() {
  if (!cart.length) return;

  let html = "";
  cart.forEach(i => {
    html += `<div class="os-row"><span>${i.name} ×${i.qty}</span><span>₹${(i.price*i.qty).toLocaleString("en-IN")}</span></div>`;
  });
  const grand = cart.reduce((s, i) => s + i.price * i.qty, 0);
  html += `<div class="os-row total"><span>Grand Total</span><span>₹${grand.toLocaleString("en-IN")}</span></div>`;
  orderSummary.innerHTML = html;

  cartPanel.classList.add("hidden");
  overlay.classList.add("hidden");
  modalOverlay.classList.remove("hidden");
}

placeOrderBtn.addEventListener("click", () => {
  cart = [];
  refreshCart();
  modalOverlay.classList.add("hidden");
  successOverlay.classList.remove("hidden");
});

continueBtn.addEventListener("click", () => {
  successOverlay.classList.add("hidden");
});


/* ── 7. EVENT LISTENERS ─────────────────────────────────────── */

// Cart open/close
cartBtn.addEventListener("click", () => {
  cartPanel.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
const closeCartFn = () => {
  cartPanel.classList.add("hidden");
  overlay.classList.add("hidden");
};
closeCart.addEventListener("click", closeCartFn);
overlay.addEventListener("click", closeCartFn);

// Checkout
checkoutBtn.addEventListener("click", openCheckout);
closeModal.addEventListener("click", () => modalOverlay.classList.add("hidden"));
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) modalOverlay.classList.add("hidden");
});

// Search
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value;
  renderProducts();
});

// Category filter
filtersEl.addEventListener("click", e => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeCat = btn.dataset.cat;
  renderProducts();
});

// Sort
sortSelect.addEventListener("change", () => {
  sortVal = sortSelect.value;
  renderProducts();
});

// Mobile hamburger (simple toggle – nav links are inline on desktop)
document.getElementById("hamburger").addEventListener("click", () => {
  const sf = document.querySelector(".search-input");
  sf.style.display = sf.style.display === "none" ? "block" : "none";
});


/* ── 8. INIT ─────────────────────────────────────────────────── */
renderProducts();