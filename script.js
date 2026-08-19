/**
 * ATLAM DOCES - Lógica Frontend & Interatividade
 * Cardápio dinâmico, Carrinho/Sacola de WhatsApp, FAQ Accordion e Navegação
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Componentes
  initHeader();
  initProducts();
  initTestimonials();
  initFAQ();
  initCartAndOrderModal();
  initScrollAnimations();
  initDynamicConfigLinks();
});

/* --------------------------------------------------------------------------
   1. Atualização Dinâmica de Links da Marca (WhatsApp, Instagram, etc)
   -------------------------------------------------------------------------- */
function initDynamicConfigLinks() {
  if (typeof ATLAM_CONFIG === 'undefined') return;

  const phone = ATLAM_CONFIG.brand.whatsappNumber;
  const instagram = ATLAM_CONFIG.brand.instagramUrl;
  const location = ATLAM_CONFIG.brand.location;

  // Botões genéricos de WhatsApp
  document.querySelectorAll('.btn-whatsapp-general').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const defaultMsg = encodeURIComponent("Olá! Vim pelo site da Atlam Doces e gostaria de informações sobre os brownies e encomendas.");
      window.open(`https://wa.me/${phone}?text=${defaultMsg}`, '_blank');
    });
  });

  // Botões de Kits de Presentes
  document.querySelectorAll('.btn-whatsapp-kit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const kitMsg = encodeURIComponent("Olá! Vim pelo site da Atlam Doces e gostaria de montar um kit de presente personalizado.");
      window.open(`https://wa.me/${phone}?text=${kitMsg}`, '_blank');
    });
  });

  // Links do Instagram
  document.querySelectorAll('.link-instagram').forEach(link => {
    link.href = instagram;
  });

  // Textos de localização e atendimento
  document.querySelectorAll('.brand-location-text').forEach(el => {
    el.textContent = location;
  });

  document.querySelectorAll('.brand-hours-text').forEach(el => {
    el.textContent = ATLAM_CONFIG.brand.hours;
  });
}

/* --------------------------------------------------------------------------
   2. Header & Menu Mobile
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.mobile-drawer .nav-link');

  // Efeito de scroll no Header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle do Drawer Mobile
  function toggleDrawer(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      toggle.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (toggle) {
    toggle.addEventListener('click', () => toggleDrawer());
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => toggleDrawer(false));
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });
}

/* --------------------------------------------------------------------------
   3. Catálogo de Produtos & Filtros de Categoria
   -------------------------------------------------------------------------- */
let cart = {};

function initProducts() {
  const grid = document.getElementById('products-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!grid || typeof ATLAM_CONFIG === 'undefined') return;

  function renderProducts(category = 'todos') {
    grid.innerHTML = '';
    
    const filtered = category === 'todos' 
      ? ATLAM_CONFIG.products 
      : ATLAM_CONFIG.products.filter(p => p.category === category);

    filtered.forEach(prod => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image-box">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
          <span class="product-badge">${prod.badge}</span>
        </div>
        <div class="product-body">
          <h3 class="product-title">${prod.name}</h3>
          <p class="product-desc">${prod.description}</p>
          <div class="product-footer">
            <div class="product-price-box">
              <span class="product-price-label">Valor</span>
              <span class="product-price-value">${prod.priceDisplay}</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <button class="btn-add-bag" data-id="${prod.id}" title="Adicionar à sacola de pedido">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </button>
              <button class="btn-order-single" data-name="${prod.name}">
                <span>Quero este</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;

      // Evento Pedido Direto
      const directBtn = card.querySelector('.btn-order-single');
      directBtn.addEventListener('click', () => {
        const phone = ATLAM_CONFIG.brand.whatsappNumber;
        const msg = encodeURIComponent(`Olá! Vim pelo site da Atlam Doces e gostaria de pedir o ${prod.name}.`);
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
      });

      // Evento Adicionar à Sacola
      const addBtn = card.querySelector('.btn-add-bag');
      addBtn.addEventListener('click', () => {
        addToCart(prod.id);
      });

      grid.appendChild(card);
    });
  }

  // Filtragem
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      renderProducts(cat);
    });
  });

  // Render inicial
  renderProducts('todos');
}

/* --------------------------------------------------------------------------
   4. Sacola Interativa / Modal de Montagem de Pedido
   -------------------------------------------------------------------------- */
function initCartAndOrderModal() {
  const modalBackdrop = document.getElementById('order-modal-backdrop');
  const openModalBtns = document.querySelectorAll('.trigger-order-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const sendWhatsAppBtn = document.getElementById('send-cart-whatsapp');

  function openModal() {
    renderCartItems();
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      sendOrderViaWhatsApp();
    });
  }
}

function addToCart(productId) {
  if (cart[productId]) {
    cart[productId]++;
  } else {
    cart[productId] = 1;
  }
  updateCartBadge();
  showToast('Brownie adicionado à sua sacola!');
}

function updateCartQuantity(productId, delta) {
  if (cart[productId]) {
    cart[productId] += delta;
    if (cart[productId] <= 0) {
      delete cart[productId];
    }
  }
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const totalCount = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const badges = document.querySelectorAll('.cart-badge-count');
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? 'flex' : 'none';
  });
}

function renderCartItems() {
  const container = document.getElementById('modal-items-list');
  const subtotalEl = document.getElementById('modal-subtotal');
  const totalEl = document.getElementById('modal-total');

  if (!container || typeof ATLAM_CONFIG === 'undefined') return;

  const itemKeys = Object.keys(cart);

  if (itemKeys.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--text-cream-muted);">
        <p style="margin-bottom: 12px;">Sua sacola de brownies está vazia.</p>
        <p style="font-size: 0.85rem;">Escolha seus sabores favoritos no cardápio!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'R$ 0,00';
    if (totalEl) totalEl.textContent = 'R$ 0,00';
    return;
  }

  container.innerHTML = '';
  let subtotal = 0;

  itemKeys.forEach(id => {
    const prod = ATLAM_CONFIG.products.find(p => p.id === id);
    if (!prod) return;

    const qty = cart[id];
    const itemTotal = prod.price * qty;
    subtotal += itemTotal;

    const row = document.createElement('div');
    row.className = 'order-item-row';
    row.innerHTML = `
      <div>
        <div class="order-item-name">${prod.name}</div>
        <div class="order-item-price">${prod.price > 0 ? `R$ ${(prod.price).toFixed(2).replace('.', ',')}` : 'Sob consulta'}</div>
      </div>
      <div class="quantity-controls">
        <button class="qty-btn" onclick="updateCartQuantity('${id}', -1)">-</button>
        <span style="font-weight: 600; min-width: 20px; text-align: center; color: var(--rose-label);">${qty}</span>
        <button class="qty-btn" onclick="updateCartQuantity('${id}', 1)">+</button>
      </div>
    `;
    container.appendChild(row);
  });

  const formattedSubtotal = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  if (subtotalEl) subtotalEl.textContent = formattedSubtotal;
  if (totalEl) totalEl.textContent = formattedSubtotal;
}

function sendOrderViaWhatsApp() {
  if (typeof ATLAM_CONFIG === 'undefined') return;

  const itemKeys = Object.keys(cart);
  if (itemKeys.length === 0) {
    alert('Por favor, adicione pelo menos um item à sacola.');
    return;
  }

  const deliverySelect = document.getElementById('order-delivery-location');
  const notesInput = document.getElementById('order-notes');

  const locationVal = deliverySelect ? deliverySelect.value : 'Aparecida de Goiânia';
  const notesVal = notesInput ? notesInput.value.trim() : '';

  let message = `Olá, *Atlam Doces*! Vim pelo site e gostaria de fazer o seguinte pedido:\n\n`;
  message += `🍫 *ITENS SELECIONADOS:*\n`;

  let total = 0;
  itemKeys.forEach(id => {
    const prod = ATLAM_CONFIG.products.find(p => p.id === id);
    if (prod) {
      const qty = cart[id];
      const lineTotal = prod.price * qty;
      total += lineTotal;
      const priceText = prod.price > 0 ? `R$ ${lineTotal.toFixed(2).replace('.', ',')}` : 'Sob consulta';
      message += `• ${qty}x ${prod.name} (${priceText})\n`;
    }
  });

  message += `\n💰 *VALOR ESTIMADO:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
  message += `📍 *ENTREGA / CIDADE:* ${locationVal}\n`;

  if (notesVal) {
    message += `📝 *OBSERVAÇÕES / DEDICATÓRIA:* ${notesVal}\n`;
  }

  message += `\nComo podemos combinar a entrega e o pagamento?`;

  const phone = ATLAM_CONFIG.brand.whatsappNumber;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

/* --------------------------------------------------------------------------
   5. Depoimentos
   -------------------------------------------------------------------------- */
function initTestimonials() {
  const container = document.getElementById('testimonials-grid');
  if (!container || typeof ATLAM_CONFIG === 'undefined') return;

  container.innerHTML = '';
  ATLAM_CONFIG.testimonials.forEach(item => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    let starsHtml = '';
    for (let i = 0; i < item.rating; i++) {
      starsHtml += `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }

    card.innerHTML = `
      <div class="stars-row">${starsHtml}</div>
      <p class="testimonial-text">"${item.text}"</p>
      <div class="testimonial-author">
        <div>
          <span class="author-name">${item.name}</span>
          <div style="font-size: 0.75rem; color: var(--text-cream-muted);">${item.location}</div>
        </div>
        <span class="author-tag">${item.tag}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   6. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFAQ() {
  const container = document.getElementById('faq-container');
  if (!container || typeof ATLAM_CONFIG === 'undefined') return;

  container.innerHTML = '';
  ATLAM_CONFIG.faqs.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = `faq-item ${index === 0 ? 'active' : ''}`;
    item.innerHTML = `
      <button class="faq-trigger" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span>${faq.question}</span>
        <span class="faq-icon-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      <div class="faq-content" style="${index === 0 ? 'max-height: 200px;' : ''}">
        <div class="faq-content-inner">
          <p>${faq.answer}</p>
        </div>
      </div>
    `;

    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Fecha todos os outros se desejar accordion exclusivo
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });

    container.appendChild(item);
  });
}

/* --------------------------------------------------------------------------
   7. Animações de Revelação ao Rolar (Scroll Reveal)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.process-card, .product-card, .feature-item, .testimonial-card, .texture-frame').forEach(el => {
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   8. Helper de Notificação Toast
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-caramel);">
      <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
