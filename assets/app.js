(() => {
  'use strict';
  const DATA = window.KHLOE;
  const STORE = DATA.store;
  const PRODUCTS = DATA.products;
  const WA_NUMBER = STORE.whatsapp.replace(/\D/g, '');

  /* ---------- Escala de tallas ---------- */
  const SLOTS = ['6M', '9M', '12M', '18M', '2A', '3A', '4A', '5A', '6A', '7A', '8A'];
  const SLOT_LONG = ['6 meses', '9 meses', '12 meses', '18 meses', '2 años', '3 años', '4 años', '5 años', '6 años', '7 años', '8 años'];
  const SIZE_MAP = {
    '6-9M': [0, 1], '9-12M': [1, 2], '12-18M': [2, 3], '18-24M': [3, 4],
    '2-3Y': [4, 5], '3-4Y': [5, 6], '4-5Y': [6, 7], '5-6Y': [7, 8], '6-7Y': [8, 9], '7-8Y': [9, 10], '4Y': [6, 6]
  };
  const prettySize = s => s.replace('Y', ' años').replace(/^(\d+)-(\d+)M$/, '$1–$2 m').replace('-', '–');
  const slotsOf = p => {
    const set = new Set();
    p.sizes.forEach(s => { const r = SIZE_MAP[s]; if (r) for (let i = r[0]; i <= r[1]; i++) set.add(i); });
    return set;
  };
  PRODUCTS.forEach(p => { p.slots = slotsOf(p); });

  const money = n => 'S/ ' + n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money0 = n => 'S/ ' + (Math.round(n * 100) / 100).toLocaleString('es-PE', { maximumFractionDigits: 2 });
  const packWord = (p, n) => p.saleType === 'serie' ? (n === 1 ? 'serie' : 'series') : (n === 1 ? 'box' : 'boxes');
  const typeLabel = p => p.saleType === 'serie' ? `Serie de ${p.units}` : `Box de ${p.units}`;
  const sizeSpan = p => `${prettySize(p.sizes[0])} a ${prettySize(p.sizes[p.sizes.length - 1])}`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const icon = id => `<svg class="i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Categorías (círculos) ---------- */
  const has = (p, t) => p.category === t || p.tags.includes(t);
  const CATS = [
    { id: 'nino', label: 'Niño', img: 'https://khloe-shopp-demo.vercel.app/seed/images/cajon-overoles-jeans/03.jpg', test: p => p.tags.includes('Niño') },
    { id: 'nina', label: 'Niña', img: 'https://khloe-shopp-demo.vercel.app/seed/images/box-vestidos-jeans-surtido/03.jpg', test: p => p.tags.includes('Niña') },
    { id: 'vestidos', label: 'Vestidos', img: 'https://khloe-shopp-demo.vercel.app/seed/images/serie-vestidos-jeans-b/02.jpg', test: p => p.tags.includes('Vestidos') },
    { id: 'overoles', label: 'Overoles', img: 'https://khloe-shopp-demo.vercel.app/seed/images/cajon-overoles-jeans/02.jpg', test: p => p.tags.includes('Overoles') },
    { id: 'jeans', label: 'Jeans', img: 'assets/img/serie-conjunto-casaca-jean/03.jpg', test: p => has(p, 'Jeans') },
    { id: 'conjuntos', label: 'Conjuntos', img: 'assets/img/box-conjuntos-nino/02.jpg', test: p => has(p, 'Conjuntos') },
    { id: 'polos', label: 'Polos', img: 'assets/img/serie-polo-dino/03.jpg', test: p => has(p, 'Polos') },
    { id: 'poleras', label: 'Poleras', img: 'assets/img/serie-polera-gatito/03.jpg', test: p => has(p, 'Poleras') },
    { id: 'chompas', label: 'Chompas', img: 'assets/img/serie-chompa-tejida-bebe/02.jpg', test: p => has(p, 'Chompas') },
    { id: 'casacas', label: 'Casacas', img: 'assets/img/serie-casaca-acolchada/02.jpg', test: p => has(p, 'Casacas') },
    { id: 'pijamas', label: 'Pijamas', img: 'assets/img/serie-pijama-animalitos/02.jpg', test: p => has(p, 'Pijamas') },
    { id: 'bebe', label: 'Bebé', img: 'assets/img/serie-enterizo-bebe-deportivo/02.jpg', test: p => has(p, 'Bebé') },
    { id: 'navidad', label: 'Navidad', img: 'https://khloe-shopp-demo.vercel.app/seed/images/serie-vestido-navideno/03.jpg', test: p => p.category === 'Navideña' },
    { id: 'invierno', label: 'Invierno', home: false, img: 'assets/img/serie-chompa-tejida-bebe/02.jpg', test: p => has(p, 'Invierno') || /invierno/i.test(p.details.temporada || '') },
    { id: 'verano', label: 'Verano', home: false, img: 'assets/img/serie-vestido-lino-rosado/02.jpg', test: p => has(p, 'Verano') || /verano/i.test(p.details.temporada || '') },
    { id: 'series', label: 'Series', img: 'https://khloe-shopp-demo.vercel.app/seed/images/serie-vestidos-jeans-c/02.jpg', test: p => p.saleType === 'serie' },
    { id: 'boxes', label: 'Boxes', img: 'https://khloe-shopp-demo.vercel.app/seed/images/box-vestidos-jeans-surtido/02.jpg', test: p => p.saleType !== 'serie' },
    { id: 'todos', label: 'Todo', img: 'https://khloe-shopp-demo.vercel.app/seed/images/serie-vestidos-jeans-a/02.jpg', test: () => true },
    { id: 'nuevo', label: 'Nuevo', home: false, img: 'https://khloe-shopp-demo.vercel.app/seed/images/serie-vestidos-jeans-a/03.jpg', test: p => p.isNew },
    { id: 'favoritos', label: 'Favoritos', home: false, img: 'https://khloe-shopp-demo.vercel.app/seed/images/serie-vestidos-jeans-b/03.jpg', test: p => state.favs.has(p.slug) }
  ];
  const catById = id => CATS.find(c => c.id === id) || CATS.find(c => c.id === 'todos');
  const fromPrice = test => Math.min(...PRODUCTS.filter(test).map(p => p.unitPrice));

  /* ---------- Estado ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('khloe:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('khloe:' + k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } }
  };
  const state = {
    cat: 'todos',
    group: null, // segundo filtro opcional (Niña, Niño, Bebé…) desde el mega menú: #/catalogo/<cat>/<group>
    sizes: new Set(),
    priceMin: 0,
    priceMax: Infinity,
    delivery: 'all', // 'all' | 'inmediata' | 'preventa'
    order: store.get('order', {}),
    contact: store.get('contact', {}),
    favs: new Set(store.get('favs', [])),
    q: '',
    homeTab: 'todos',
    lastSent: null
  };
  const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const haystack = p => norm([p.name, p.category, p.summary, p.saleType === 'serie' ? 'serie series' : 'box boxes pack cajon', ...p.tags].join(' '));
  const matchQ = p => !state.q || norm(state.q).split(/\s+/).filter(Boolean).every(w => haystack(p).includes(w));
  const matches = p => catById(state.cat).test(p)
    && (!state.group || catById(state.group).test(p))
    && matchQ(p)
    && (!state.sizes.size || [...state.sizes].some(i => p.slots.has(i)))
    && p.price >= state.priceMin
    && p.price <= state.priceMax
    && (state.delivery === 'all' || deliveryOf(p) === state.delivery);

  // Tipo de entrega: en data.js cada producto puede llevar "delivery": "preventa"; si no lo trae, es entrega inmediata.
  function deliveryOf(p) { return p.delivery === 'preventa' ? 'preventa' : 'inmediata'; }
  function setDelivery(v) {
    state.delivery = v;
    const r = document.querySelector(`[name="delivery"][value="${v}"]`);
    if (r) r.checked = true;
  }
  document.addEventListener('change', e => {
    if (e.target.name === 'delivery') { state.delivery = e.target.value; applyFilter(); }
  });

  function resetPriceFilter() {
    state.priceMin = 0; state.priceMax = Infinity;
    const allR = document.querySelector('[name="price-range"][value="all"]');
    if (allR) allR.checked = true;
    const minEl = document.querySelector('[data-price-min]');
    const maxEl = document.querySelector('[data-price-max]');
    if (minEl) minEl.value = '';
    if (maxEl) maxEl.value = '';
  }

  /* ---------- Banner ---------- */
  const IMG = (slug, n) => `https://khloe-shopp-demo.vercel.app/seed/images/${slug}/0${n}.jpg`;
  const SLIDES = [
    { tone: 'pink', h1: true, eyebrow: 'Nueva temporada · Por mayor', title: 'Ropa infantil importada', text: 'Series y boxes con stock propio, listos para despachar a todo el Perú.', cat: 'todos', cta: 'Comprar ahora',
      img: IMG('box-vestidos-jeans-surtido', 3), img2: IMG('serie-vestidos-jeans-a', 2) },
    { tone: 'red', eyebrow: 'Colección Navidad', title: 'Vestidos de Navidad', text: 'Blancos con lazo rojo, en serie de tallas para bebé.', cat: 'navidad', cta: 'Ver Navidad',
      img: IMG('serie-vestido-navideno', 2), img2: IMG('serie-vestido-navideno', 3) },
    { tone: 'sky', eyebrow: 'Para ellos', title: 'Overoles jean de niño', text: 'Cajón surtido con parches y aplicaciones.', cat: 'overoles', cta: 'Ver overoles',
      img: IMG('cajon-overoles-jeans', 3), img2: IMG('cajon-overoles-jeans', 2) },
    { tone: 'pink', eyebrow: 'Para dormir', title: 'Pijamas de algodón', text: 'Estampados de animalitos en cuatro colores, de 12 meses a 5 años.', cat: 'pijamas', cta: 'Ver pijamas',
      img: 'assets/img/serie-pijama-animalitos/02.jpg', img2: 'assets/img/serie-pijama-animalitos/03.jpg' },
    { tone: 'sky', eyebrow: 'Temporada de frío', title: 'Chompas, poleras y casacas', text: 'Abrigo para bebés y niños, en series listas para revender.', cat: 'chompas', cta: 'Ver chompas',
      img: 'assets/img/serie-chompa-tejida-bebe/02.jpg', img2: 'assets/img/serie-polera-gatito/03.jpg' }
  ];
  function renderHero() {
    const host = $('[data-hero]');
    host.innerHTML = SLIDES.map((s, i) => {
      const H = s.h1 ? 'h1' : 'h2';
      const href = `#/catalogo${s.cat === 'todos' ? '' : '/' + s.cat}`;
      return `
      <article class="slide t-${s.tone}" aria-roledescription="lámina" aria-label="${i + 1} de ${SLIDES.length}">
        <div class="slide-copy">
          <span class="eyebrow">${esc(s.eyebrow)}</span>
          <${H}>${esc(s.title)}</${H}>
          <p>${esc(s.text)}</p>
          <p class="from">Desde <b class="num">${money(fromPrice(catById(s.cat).test))}</b> <span>c/u</span></p>
          <a class="btn btn-ink" href="${href}">${esc(s.cta)} ${icon('arrow')}</a>
        </div>
        <a class="slide-pics" href="${href}" tabindex="-1" aria-hidden="true">
          <img src="${s.img}" alt="" width="1179" height="1575"${i ? ' loading="lazy"' : ' fetchpriority="high"'}>
          <img src="${s.img2}" alt="" width="1179" height="1575" loading="lazy">
        </a>
      </article>`;
    }).join('');
    const dots = $('[data-hero-dots]');
    dots.innerHTML = SLIDES.map((s, i) => `<button type="button" data-dot="${i}" aria-label="Lámina ${i + 1}: ${esc(s.title)}" aria-current="${i === 0}"></button>`).join('');
    let current = 0;
    const go = i => host.scrollTo({ left: host.children[i].offsetLeft - host.offsetLeft, behavior: reduced.matches ? 'auto' : 'smooth' });
    dots.addEventListener('click', e => { const b = e.target.closest('[data-dot]'); if (b) { go(+b.dataset.dot); hold(); } });
    $('[data-hero-prev]').addEventListener('click', () => { go((current - 1 + SLIDES.length) % SLIDES.length); hold(); });
    $('[data-hero-next]').addEventListener('click', () => { go((current + 1) % SLIDES.length); hold(); });
    host.addEventListener('scroll', () => {
      const i = Math.round(host.scrollLeft / host.clientWidth);
      if (i !== current) { current = i; $$('[data-dot]', dots).forEach((d, j) => d.setAttribute('aria-current', String(j === i))); }
    }, { passive: true });
    // Avance automático suave; se detiene al tocar, enfocar o pasar el mouse.
    let timer = null, paused = false;
    const tick = () => { if (!paused && !document.hidden && state.screen === 'home') go((current + 1) % SLIDES.length); };
    const start = () => { if (!reduced.matches && !timer) timer = setInterval(tick, 5500); };
    const hold = () => { clearInterval(timer); timer = null; paused = true; };
    ['pointerdown', 'focusin', 'mouseenter'].forEach(ev => host.addEventListener(ev, hold, { passive: true }));
    host.addEventListener('mouseleave', () => { paused = false; start(); });
    start();
  }

  /* ---------- Círculos de categoría y talla ---------- */
  function renderCircles() {
    const count = c => PRODUCTS.filter(c.test).length;
    $('[data-cats="home"]').innerHTML = CATS.filter(c => c.home !== false).map(c => `
      <a class="circle" href="#/catalogo${c.id === 'todos' ? '' : '/' + c.id}">
        <span class="disc"><img src="${c.img}" alt="" loading="lazy" width="160" height="160"></span>
        <span class="name">${c.label}</span>
      </a>`).join('');
    const catHost = $('[data-cats="cat"]');
    const paintCatList = () => {
      catHost.innerHTML = CATS.map(c => `
        <button class="circle" type="button" data-cat="${c.id}" aria-pressed="${c.id === state.cat}">
          <span class="disc"><img src="${c.img}" alt="" loading="lazy" width="160" height="160"></span>
          <span class="name">${c.label} <span class="num">${count(c)}</span></span>
        </button>`).join('');
    };
    paintCatList();
    renderCircles.repaintCats = paintCatList;
    catHost.addEventListener('click', e => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      const id = b.dataset.cat;
      history.replaceState(null, '', '#/catalogo' + (id === 'todos' ? '' : '/' + id));
      state.cat = id; state.group = null; applyFilter();
    });

    const sizeBtn = i => `<button class="size" type="button" data-size="${i}" aria-pressed="false" aria-label="${SLOT_LONG[i]}">${SLOTS[i]}</button>`;
    const catSizes = $('[data-sizes="cat"]');
    catSizes.innerHTML = SLOTS.map((_, i) => sizeBtn(i)).join('') + `<button class="clear" type="button" data-clear hidden>Limpiar</button>`;
    catSizes.addEventListener('click', e => {
      if (e.target.closest('[data-clear]')) { state.sizes.clear(); applyFilter(); return; }
      const b = e.target.closest('[data-size]'); if (!b) return;
      const i = +b.dataset.size;
      state.sizes.has(i) ? state.sizes.delete(i) : state.sizes.add(i);
      applyFilter();
    });
  }

  /* ---------- Mega menú de categorías ---------- */
  const GARMENTS = ['vestidos', 'jeans', 'overoles', 'conjuntos', 'polos', 'poleras', 'chompas', 'casacas', 'pijamas'];
  const MEGA = [
    { id: 'nina', label: 'Niña', scope: 'nina', main: ['todos', 'nuevo', 'series', 'boxes'], picks: [...GARMENTS, 'bebe', 'navidad'] },
    { id: 'nino', label: 'Niño', scope: 'nino', main: ['todos', 'nuevo', 'series', 'boxes'], picks: [...GARMENTS, 'bebe'] },
    { id: 'bebe', label: 'Bebé', scope: 'bebe', main: ['todos', 'nuevo', 'series', 'boxes'], picks: [...GARMENTS, 'nina', 'nino'] },
    // Una sección por prenda: "Polos de niña / niño / bebé" + sus modelos
    ...GARMENTS.map(g => ({ id: g, label: catById(g).label, scope: g, garment: true, main: ['todos', 'nuevo', 'series', 'boxes'], picks: ['nina', 'nino', 'bebe'] })),
    { id: 'ropa', label: 'Todas las prendas', scope: null, main: ['todos', 'nuevo', 'nina', 'nino', 'bebe'], picks: GARMENTS },
    { id: 'temporada', label: 'Temporadas', scope: null, main: ['todos', 'nuevo'], picks: ['navidad', 'invierno', 'verano'] },
    { id: 'mayor', label: 'Compra por mayor', scope: null, main: ['todos', 'series', 'boxes', 'favoritos'], products: true }
  ];
  const megaHref = (catId, scope) => {
    if (!scope) return '#/catalogo' + (catId === 'todos' ? '' : '/' + catId);
    return '#/catalogo/' + (catId === 'todos' ? scope : `${catId}/${scope}`);
  };
  const AUDIENCE = { nina: 'niña', nino: 'niño', bebe: 'bebé' };
  const pickLabel = (c, scope) => {
    if (!scope) return c.label;
    if (AUDIENCE[c.id]) return `Bebé ${AUDIENCE[scope === 'bebe' ? c.id : scope]}`;
    return `${c.label} de ${AUDIENCE[scope]}`;
  };
  const MAIN_LABEL ={ todos: 'Ver todo', nuevo: 'Novedades', favoritos: 'Mis favoritos' };
  function megaTile(href, label, img, sub) {
    return `<a class="mtile" href="${href}">
        <span class="mdisc">${img ? `<img src="${img}" alt="" loading="lazy" width="96" height="96">` : `<svg class="i grid4" aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/><circle cx="16.75" cy="16.75" r="3.4"/></svg>`}</span>
        <span class="mname" title="${esc(label)}"><b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</span>
      </a>`;
  }
  function megaPanes(m) {
    const scopeTest = m.scope ? catById(m.scope).test : () => true;
    // Foto representativa sin repetir dentro del mismo panel
    const used = new Set();
    const coverFor = test => {
      const list = PRODUCTS.filter(p => test(p) && scopeTest(p));
      for (const pass of [p => [p.cover], p => p.images.filter(s => s !== p.flyer)]) {
        for (const p of list) for (const src of pass(p)) if (src && !used.has(src)) { used.add(src); return src; }
      }
      return list[0] && list[0].cover;
    };
    const main = m.main.map(id => {
      const c = catById(id);
      if (id !== 'todos' && id !== 'favoritos' && !PRODUCTS.some(p => c.test(p) && scopeTest(p))) return '';
      if (id === 'todos') return megaTile(megaHref('todos', m.scope), m.scope && !m.garment ? `Todo ${m.label}` : MAIN_LABEL.todos, '');
      return megaTile(megaHref(id, m.scope), MAIN_LABEL[id] || c.label, id === 'favoritos' ? c.img : (coverFor(c.test) || c.img));
    }).join('');
    let picks;
    if (m.products) {
      picks = [...PRODUCTS].sort((a, b) => (b.stock === 'casi-agotado') - (a.stock === 'casi-agotado') || b.isNew - a.isNew)
        .slice(0, 14).map(p => megaTile(`#/producto/${p.slug}`, p.name, p.cover, money(p.unitPrice) + ' c/u')).join('');
    } else if (m.garment) {
      // Prenda × público (Polos de niña…) y luego cada modelo de esa prenda
      picks = m.picks.map(id => {
        const c = catById(id);
        const n = PRODUCTS.filter(p => c.test(p) && scopeTest(p)).length;
        if (!n) return '';
        return megaTile(megaHref(m.id, id), `${m.label} de ${AUDIENCE[id]}`, coverFor(c.test) || c.img, `${n} ${n === 1 ? 'modelo' : 'modelos'}`);
      }).join('') + PRODUCTS.filter(scopeTest).map(p => megaTile(`#/producto/${p.slug}`, p.name, p.cover, money(p.unitPrice) + ' c/u')).join('');
    } else {
      picks = m.picks.map(id => {
        const c = catById(id);
        const n = PRODUCTS.filter(p => c.test(p) && scopeTest(p)).length;
        if (!n) return '';
        return megaTile(megaHref(id, m.scope), pickLabel(c, m.scope), coverFor(c.test) || c.img, `${n} ${n === 1 ? 'modelo' : 'modelos'}`);
      }).join('');
    }
    return `
      <section class="mega-main" aria-label="Comprar por categoría">
        <h3 class="mega-h"><svg class="i" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z"/></svg>Comprar por categoría</h3>
        <div class="mgrid mgrid-3">${main}</div>
      </section>
      <section class="mega-picks" aria-label="${m.products ? 'Los más pedidos' : 'Selección para ti'}">
        <h3 class="mega-h plain">${m.products ? 'Los más pedidos' : 'Selección para ti'}</h3>
        <div class="mgrid mgrid-7">${picks}</div>
      </section>`;
  }
  function renderMega() {
    const nav = $('.catnav'), panel = $('[data-mega-panel]'), btn = $('[data-mega-btn]');
    if (!nav || !panel || !btn) return;
    const list = $('[data-mega-list]', panel), body = $('[data-mega-body]', panel);
    list.innerHTML = MEGA.map(m => `<li><button type="button" data-mega-group="${m.id}" aria-pressed="false">${esc(m.label)}${icon('chev')}</button></li>`).join('');
    const canHover = matchMedia('(hover: hover) and (min-width: 900px)');
    let active = null, openT = 0, closeT = 0;
    const isOpen = () => panel.classList.contains('on');
    const show = id => {
      const m = MEGA.find(x => x.id === id) || MEGA[0];
      if (m.id !== active) {
        active = m.id;
        body.innerHTML = megaPanes(m);
        body.classList.remove('swap'); void body.offsetWidth; body.classList.add('swap');
        $$('[data-mega-group]', list).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.megaGroup === m.id)));
      }
    };
    // Resalta solo la pestaña de la barra que abrió el panel
    const markTab = el => {
      $$('.is-mega', nav).forEach(a => { if (a !== el) a.classList.remove('is-mega'); });
      if (el) el.classList.add('is-mega');
    };
    const open = (id, el = null) => {
      clearTimeout(closeT); show(id); markTab(el);
      if (!isOpen()) { panel.hidden = false; requestAnimationFrame(() => panel.classList.add('on')); }
      btn.setAttribute('aria-expanded', 'true'); nav.classList.add('mega-open');
    };
    const close = () => {
      clearTimeout(openT); clearTimeout(closeT);
      if (!isOpen()) return;
      panel.classList.remove('on'); btn.setAttribute('aria-expanded', 'false'); nav.classList.remove('mega-open');
      $$('.is-mega', nav).forEach(a => a.classList.remove('is-mega'));
      setTimeout(() => { if (!isOpen()) panel.hidden = true; }, 220);
    };
    renderMega.close = close;

    // Escritorio: abrir al pasar el mouse (con una pequeña espera para no parpadear)
    nav.addEventListener('mouseover', e => {
      if (!canHover.matches) return;
      const t = e.target.closest('[data-mega]');
      if (t && !panel.contains(t)) {
        clearTimeout(openT); clearTimeout(closeT);
        openT = setTimeout(() => t.dataset.mega === 'all' ? open(active || 'nina') : open(t.dataset.mega, t), isOpen() ? 60 : 140);
      } else if (e.target.closest('.catnav-row') && !t) {
        clearTimeout(openT);
      }
    });
    nav.addEventListener('mouseleave', () => { if (canHover.matches) { clearTimeout(openT); closeT = setTimeout(close, 220); } });
    nav.addEventListener('mouseenter', () => clearTimeout(closeT));
    list.addEventListener('mouseover', e => { const b = e.target.closest('[data-mega-group]'); if (b && canHover.matches) { show(b.dataset.megaGroup); markTab(null); } });
    list.addEventListener('click', e => { const b = e.target.closest('[data-mega-group]'); if (b) show(b.dataset.megaGroup); });
    list.addEventListener('focusin', e => { const b = e.target.closest('[data-mega-group]'); if (b) show(b.dataset.megaGroup); });
    // Clic / toque / teclado en "Categorías"
    btn.addEventListener('click', () => { isOpen() ? close() : open(active || 'nina'); if (isOpen()) $('[data-mega-group][aria-pressed="true"]', list)?.focus({ preventScroll: true }); });
    // Cualquier enlace del panel lleva a su categoría y cierra
    panel.addEventListener('click', e => { if (e.target.closest('a[href]')) close(); });
    document.addEventListener('click', e => { if (isOpen() && !nav.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen()) { close(); btn.focus(); } });
    addEventListener('hashchange', close);
  }

  /* ---------- Tarjetas ---------- */
  const isFav = p => state.favs.has(p.slug);
  const favBtn = (p, cls = 'fav') => `<button class="${cls}" type="button" data-fav="${p.slug}" aria-pressed="${isFav(p)}" aria-label="${isFav(p) ? 'Quitar de' : 'Guardar en'} favoritos: ${esc(p.name)}">${icon('heart')}</button>`;
  // Si algún día el producto trae `compareAt` (precio anterior real por prenda), se muestra tachado con su % de descuento.
  const discount = p => p.compareAt > p.unitPrice ? Math.round((1 - p.unitPrice / p.compareAt) * 100) : 0;
  const scarce = p => p.stock === 'casi-agotado';
  const deliveryTag = p => deliveryOf(p) === 'preventa'
    ? `<span class="dlv dlv-pre">${icon('box')} Preventa</span>`
    : `<span class="dlv dlv-now">${icon('check')} Entrega inmediata</span>`;
  function card(p, variant = '') {
    const alt = p.images.find(src => src !== p.cover && src !== p.flyer);
    const off = discount(p);
    return `
      <article class="card ${variant}" data-slug="${p.slug}">
        <div class="media">
          <a class="ph" href="#/producto/${p.slug}" tabindex="-1" aria-hidden="true">
            <img src="${p.cover}" alt="" loading="lazy" width="1179" height="1540">
            ${alt ? `<img class="ph-alt" src="${alt}" alt="" loading="lazy" width="1179" height="1540">` : ''}
            <span class="badges">${off ? `<b class="b-off">-${off}%</b>` : ''}${p.isNew ? '<b class="b-new">Nuevo</b>' : ''}</span>
            <span class="ph-type">${typeLabel(p)} prendas</span>
          </a>
          ${favBtn(p)}
        </div>
        <div class="body">
          <h3><a href="#/producto/${p.slug}">${esc(p.name)}</a></h3>
          <div class="price-row">
            <p class="price"><b class="num">${money(p.price)}</b><small>${p.saleType === 'serie' ? 'la serie' : 'el box'}</small></p>
            <button class="quick" type="button" data-quick="${p.slug}" aria-label="Agregar 1 ${packWord(p, 1)} de ${esc(p.name)} al pedido">${icon('bagplus')}</button>
          </div>
          <p class="meta"><span class="num">${money(p.unitPrice)}</span> c/u${off ? ` <s class="num">${money(p.compareAt)}</s>` : ''} · ${sizeSpan(p)}</p>
          <p class="tags-row">${deliveryTag(p)}${scarce(p) ? `<span class="hurry">${icon('bolt')} Casi agotado</span>` : ''}</p>
        </div>
      </article>`;
  }

  /* ---------- Ofertas flash ---------- */
  function flashCard(p) {
    return `
      <a class="fcard" href="#/producto/${p.slug}">
        <span class="fimg"><img src="${p.cover}" alt="" loading="lazy" width="1179" height="1540">${p.isNew ? '<b class="b-new">Nuevo</b>' : ''}</span>
        <span class="fprice num">${money(p.unitPrice)}<small> c/u</small></span>
        <span class="fname">${esc(p.name)}</span>
        <span class="fbar${scarce(p) ? ' hot' : ''}"><i style="width:${scarce(p) ? 88 : 46}%"></i><em>${scarce(p) ? 'Casi agotado' : typeLabel(p) + ' prendas'}</em></span>
      </a>`;
  }
  function renderFlash() {
    const list = [...PRODUCTS].sort((a, b) => (scarce(b) - scarce(a)) || (b.isNew - a.isNew) || (a.unitPrice - b.unitPrice));
    $('[data-flash]').innerHTML = list.map(flashCard).join('');
    const cd = $('[data-countdown]');
    const pad = n => String(n).padStart(2, '0');
    const tick = () => {
      const now = new Date();
      const end = new Date(now); end.setHours(24, 0, 0, 0);
      let s = Math.max(0, Math.floor((end - now) / 1000));
      const h = Math.floor(s / 3600); s -= h * 3600;
      const m = Math.floor(s / 60); s -= m * 60;
      const b = cd.querySelectorAll('b');
      b[0].textContent = pad(h); b[1].textContent = pad(m); b[2].textContent = pad(s);
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Pestañas de "Para ti" ---------- */
  const HOME_TABS = ['todos', 'nuevo', 'nina', 'nino', 'bebe', 'vestidos', 'pijamas', 'casacas', 'navidad', 'boxes'];
  function renderHomeTabs() {
    const host = $('[data-home-tabs]');
    host.innerHTML = HOME_TABS.map(id => { const c = catById(id); return `<button type="button" role="tab" data-tab="${id}" aria-selected="${id === state.homeTab}">${id === 'todos' ? 'Recomendados' : c.label}</button>`; }).join('');
    host.addEventListener('click', e => {
      const b = e.target.closest('[data-tab]'); if (!b) return;
      state.homeTab = b.dataset.tab;
      $$('[data-tab]', host).forEach(x => x.setAttribute('aria-selected', String(x === b)));
      paintHomeGrid();
    });
  }
  function paintHomeGrid() {
    const list = PRODUCTS.filter(catById(state.homeTab).test);
    $('[data-grid="home"]').innerHTML = list.length ? list.map(p => card(p)).join('')
      : `<div class="empty"><h3>Pronto llegan más modelos</h3><p>Escríbenos y te avisamos cuando lleguen.</p></div>`;
  }
  function renderGrids() {
    renderHomeTabs();
    paintHomeGrid();
    renderFlash();
    // El grid del catálogo se renderiza dinámicamente en applyFilter()
    wirePlainWa();
  }
  function applyFilter() {
    const sortEl = $('[data-sort]');
    const sortVal = sortEl ? sortEl.value : 'default';

    let filtered = PRODUCTS.filter(p => matches(p));
    if (sortVal === 'price-asc') filtered = [...filtered].sort((a, b) => a.unitPrice - b.unitPrice);
    else if (sortVal === 'price-desc') filtered = [...filtered].sort((a, b) => b.unitPrice - a.unitPrice);
    else if (sortVal === 'new') filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    const grid = $('[data-grid="cat"]');
    const c = catById(state.cat);
    if (filtered.length) {
      grid.innerHTML = filtered.map(p => card(p)).join('');
    } else if (c.id === 'favoritos' && !state.favs.size) {
      grid.innerHTML = `
        <div class="empty" data-empty>
          <span class="disc-ico">${icon('heart')}</span>
          <h3>Aún no tienes favoritos</h3>
          <p>Toca el corazón de cualquier modelo para guardarlo aquí y compararlo después.</p>
          <div class="row"><a class="btn btn-ink" href="#/catalogo">Ver catálogo</a></div>
        </div>`;
    } else {
      grid.innerHTML = `
        <div class="empty" data-empty>
          <span class="disc-ico">${icon('search')}</span>
          <h3>No hay modelos con ese filtro… todavía</h3>
          <p>Prueba otra talla, categoría o búsqueda, o escríbenos y te avisamos cuando llegue.</p>
          <div class="row"><button class="btn btn-ghost" type="button" data-reset>Quitar filtros</button><a class="btn btn-wa" data-wa-plain href="#" target="_blank" rel="noopener">${icon('chat')} Preguntar por WhatsApp</a></div>
        </div>`;
    }
    wirePlainWa();

    if (renderCircles.repaintCats && c.id === 'favoritos') renderCircles.repaintCats();
    $$('[data-cats="cat"] [data-cat]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)));
    $$('[data-sizes="cat"] [data-size]').forEach(b => b.setAttribute('aria-pressed', String(state.sizes.has(+b.dataset.size))));
    const clearBtn = $('[data-sizes="cat"] [data-clear]');
    if (clearBtn) clearBtn.hidden = !state.sizes.size;

    const g = state.group && catById(state.group);
    const title = state.q ? `“${state.q}”` : (c.id === 'todos' ? (g ? g.label : 'Catálogo') : c.label + (g ? ` · ${g.label}` : ''));
    const titleEl = $('[data-cat-title]'); if (titleEl) titleEl.textContent = title;
    const crumb = $('[data-cat-crumb]'); if (crumb) crumb.textContent = state.q ? 'Búsqueda' : (c.id === 'todos' ? 'Catálogo' : c.label);
    const countEl = $('[data-cat-count]');
    if (countEl) countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'modelo' : 'modelos'}`;

    // Chips de filtros activos (removibles)
    const chips = [];
    if (state.q) chips.push(['q', `Búsqueda: ${state.q}`]);
    if (c.id !== 'todos') chips.push(['cat', c.label]);
    if (g) chips.push(['group', g.label]);
    [...state.sizes].sort((a, b) => a - b).forEach(i => chips.push(['size:' + i, 'Talla ' + SLOTS[i]]));
    if (state.delivery !== 'all') chips.push(['delivery', state.delivery === 'preventa' ? 'Preventa' : 'Entrega inmediata']);
    if (state.priceMin > 0 || state.priceMax < Infinity) {
      chips.push(['price', state.priceMax < 90000 ? `S/${state.priceMin} – S/${state.priceMax}` : `Desde S/${state.priceMin}`]);
    }
    const chipHost = $('[data-active-chips]');
    if (chipHost) {
      chipHost.innerHTML = chips.map(([k, l]) => `<button type="button" class="achip" data-unchip="${k}" aria-label="Quitar filtro ${esc(l)}">${esc(l)} ${icon('x')}</button>`).join('')
        + (chips.length > 1 ? `<button type="button" class="achip-clear" data-reset>Limpiar todo</button>` : '');
      chipHost.hidden = !chips.length;
    }
    markNav();
  }
  function clearSearch() {
    state.q = '';
    const inp = $('[data-search-input]'); if (inp) inp.value = '';
  }
  // Menú de categorías del header: marca la activa
  function markNav() {
    const onCat = state.screen === 'catalogo';
    $$('[data-navcat]').forEach(a => {
      if (onCat && !state.q && !state.group && a.dataset.navcat === state.cat) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }
  function toggleFav(slug) {
    const p = PRODUCTS.find(x => x.slug === slug); if (!p) return;
    const on = !state.favs.has(slug);
    on ? state.favs.add(slug) : state.favs.delete(slug);
    store.set('favs', [...state.favs]);
    $$(`[data-fav="${slug}"]`).forEach(b => {
      b.setAttribute('aria-pressed', String(on));
      b.setAttribute('aria-label', `${on ? 'Quitar de' : 'Guardar en'} favoritos: ${p.name}`);
      b.classList.remove('pop'); void b.offsetWidth; if (on) b.classList.add('pop');
    });
    updateFavCount();
    if (state.screen === 'catalogo' && state.cat === 'favoritos') applyFilter();
    else if (renderCircles.repaintCats) { renderCircles.repaintCats(); }
    toast(on ? 'Guardado en favoritos' : 'Quitado de favoritos', on ? 'Ver favoritos' : '', () => { location.hash = '#/catalogo/favoritos'; });
  }
  function updateFavCount() {
    $$('[data-fav-count]').forEach(c => { c.textContent = state.favs.size; c.hidden = !state.favs.size; });
  }
  document.addEventListener('submit', e => {
    if (!e.target.closest('[data-search]')) return;
    e.preventDefault();
    const v = $('[data-search-input]').value.trim();
    state.q = v; state.cat = 'todos'; state.group = null; state.sizes.clear(); resetPriceFilter();
    if (location.hash === '#/catalogo') { state.screen = 'catalogo'; applyFilter(); window.scrollTo(0, 0); }
    else location.hash = '#/catalogo';
    $('[data-search-input]').blur();
  });
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-fav]');
    if (f) { e.preventDefault(); toggleFav(f.dataset.fav); return; }
    // Cualquier enlace a una categoría limpia la búsqueda
    const catLink = e.target.closest('a[href^="#/catalogo"]');
    if (catLink) clearSearch();
    const un = e.target.closest('[data-unchip]');
    if (un) {
      const k = un.dataset.unchip;
      if (k === 'q') clearSearch();
      else if (k === 'cat') { state.cat = state.group || 'todos'; state.group = null; history.replaceState(null, '', '#/catalogo' + (state.cat === 'todos' ? '' : '/' + state.cat)); }
      else if (k === 'group') { state.group = null; history.replaceState(null, '', '#/catalogo' + (state.cat === 'todos' ? '' : '/' + state.cat)); }
      else if (k === 'price') resetPriceFilter();
      else if (k === 'delivery') setDelivery('all');
      else if (k.startsWith('size:')) state.sizes.delete(+k.slice(5));
      applyFilter();
    }
  });
  document.addEventListener('click', e => {
    if (e.target.closest('[data-reset]')) { state.sizes.clear(); state.cat = 'todos'; state.group = null; clearSearch(); resetPriceFilter(); setDelivery('all'); history.replaceState(null, '', '#/catalogo'); applyFilter(); }
    const q = e.target.closest('[data-quick]');
    if (q) {
      const p = PRODUCTS.find(x => x.slug === q.dataset.quick);
      addToOrder(p.slug, 1);
      q.classList.remove('done'); void q.offsetWidth; q.classList.add('done');
      toast(`Agregaste 1 ${packWord(p, 1)} · ${p.units} prendas`, 'Ver pedido', openOrder);
    }
    // Colapsar/expandir grupo de filtro
    const fg = e.target.closest('[data-fg-toggle]');
    if (fg) {
      const body = fg.closest('.filter-group').querySelector('.fg-body');
      const isOpen = fg.getAttribute('aria-expanded') !== 'false';
      body.hidden = isOpen;
      fg.setAttribute('aria-expanded', String(!isOpen));
      fg.textContent = isOpen ? '+' : '−';
    }
    // Ok del filtro de precio
    if (e.target.closest('[data-price-ok]')) {
      const minEl = document.querySelector('[data-price-min]');
      const maxEl = document.querySelector('[data-price-max]');
      const min = parseFloat(minEl?.value);
      const max = parseFloat(maxEl?.value);
      state.priceMin = isNaN(min) ? 0 : min;
      state.priceMax = isNaN(max) ? Infinity : max;
      const customR = document.querySelector('[data-price-custom-radio]');
      if (customR) customR.checked = true;
      applyFilter();
    }
    // Abrir sidebar en mobile
    if (e.target.closest('[data-open-filters]')) {
      document.getElementById('cat-sidebar')?.classList.add('open');
      document.querySelector('[data-filters-scrim]')?.classList.add('on');
    }
    // Cerrar sidebar en mobile
    if (e.target.closest('[data-close-filters]') || e.target.closest('[data-filters-scrim]')) {
      document.getElementById('cat-sidebar')?.classList.remove('open');
      document.querySelector('[data-filters-scrim]')?.classList.remove('on');
    }
  });
  // Ordenar y filtrar precio al cambiar selectores
  document.addEventListener('change', e => {
    if (e.target.closest('[data-sort]')) { applyFilter(); return; }
    if (e.target.name === 'price-range' && e.target.value !== 'custom') {
      if (e.target.value === 'all') {
        state.priceMin = 0; state.priceMax = Infinity;
      } else {
        const parts = e.target.value.split('-');
        state.priceMin = Number(parts[0]);
        state.priceMax = Number(parts[1]);
      }
      const minEl = document.querySelector('[data-price-min]');
      const maxEl = document.querySelector('[data-price-max]');
      if (minEl) minEl.value = state.priceMin > 0 ? state.priceMin : '';
      if (maxEl) maxEl.value = state.priceMax < 90000 ? state.priceMax : '';
      applyFilter();
    }
  });

  /* ---------- Detalle ---------- */
  const PRESETS = [1, 3, 5, 10];
  const MAX_QTY = 99;
  function renderDetail(slug) {
    const p = PRODUCTS.find(x => x.slug === slug);
    const host = $('[data-detail]');
    if (!p) { host.innerHTML = `<div class="sent"><h1>Este modelo ya no está.</h1><a class="btn btn-ink" href="#/catalogo">Ver catálogo</a></div>`; return; }
    const imgs = p.images.slice(1).concat(p.images[0]);
    const d = p.details;
    const rows = [
      ['Tipo', typeLabel(p) + ' prendas'],
      ['Tallas', p.sizes.map(prettySize).join(' · ')],
      d.composicion && ['Composición', d.composicion],
      d.material && ['Material', d.material],
      d.longitud && ['Largo', d.longitud],
      d.temporada && ['Temporada', d.temporada],
      ['Código', p.code]
    ].filter(Boolean);
    const suggest = Math.round(p.unitPrice * 1.7 / 5) * 5;
    const unitName = packWord(p, 2);
    const off = discount(p);
    host.innerHTML = `
      <p class="crumbs"><a href="#/">Inicio</a> <span aria-hidden="true">/</span> <a href="#/catalogo">Catálogo</a> <span aria-hidden="true">/</span> ${esc(p.category)}</p>
      <div class="detail">
        <div class="gallery">
          <div class="thumbs" role="group" aria-label="Fotos">
            ${imgs.map((src, i) => `<button type="button" data-img="${i}" aria-label="Foto ${i + 1}${i === imgs.length - 1 ? ' (afiche)' : ''}" aria-current="${i === 0}"><img src="${src}" alt="" loading="lazy" width="72" height="96"></button>`).join('')}
          </div>
          <div class="main">
            <img data-main src="${imgs[0]}" alt="${esc(p.name)}, foto 1 de ${imgs.length}" width="1179" height="1540">
            <button class="gnav prev" type="button" data-gnav="-1" aria-label="Foto anterior">${icon('chevl')}</button>
            <button class="gnav next" type="button" data-gnav="1" aria-label="Foto siguiente">${icon('chev')}</button>
            <span class="gcount num" data-gcount>1 / ${imgs.length}</span>
          </div>
        </div>
        <div class="info">
          <span class="badges">${p.isNew ? '<b class="b-new">Nuevo</b>' : ''}<b class="b-type">${typeLabel(p)} prendas</b>${scarce(p) ? `<b class="b-hot">${icon('bolt')} Casi agotado</b>` : ''}</span>
          <h1>${esc(p.name)}</h1>
          <p class="sku">Código: <span class="num">${esc(p.code)}</span></p>

          <div class="price-box">
            <div class="big-price"><b class="num">${money(p.unitPrice)}</b><span>por prenda</span>${off ? `<s class="num">${money(p.compareAt)}</s><em class="b-off">-${off}%</em>` : ''}</div>
            <p class="pack">${typeLabel(p)} prendas · <b class="num">${money(p.price)}</b> ${p.saleType === 'serie' ? 'la serie' : 'el box'}</p>
          </div>
          <p class="summary">${esc(p.summary)}</p>

          <div class="block">
            <p class="lbl">Tallas que trae <span>${p.saleType === 'serie' ? 'Una prenda por talla' : 'Surtido'}</span></p>
            <div class="sizes sizes-read" aria-label="Tallas que trae: ${p.sizes.map(prettySize).join(', ')}">
              ${SLOTS.map((s, i) => `<span class="size${p.slots.has(i) ? ' on' : ''}" aria-hidden="true">${s}</span>`).join('')}
            </div>
            <p class="size-note">${p.sizes.map(prettySize).join(' · ')}</p>
          </div>

          <div class="block qty">
            <p class="lbl" id="lbl-qty">Cantidad de ${unitName}</p>
            <div class="qty-row">
              <div class="presets" role="group" aria-labelledby="lbl-qty">
                ${PRESETS.map(n => `<button type="button" class="chip" data-preset="${n}" aria-pressed="${n === 1}"><span class="num">${n}</span></button>`).join('')}
              </div>
              <div class="stepper" role="group" aria-label="Cantidad exacta">
                <button type="button" data-q="-1" aria-label="Quitar una">${icon('minus')}</button>
                <output class="num" data-qty aria-live="polite">1</output>
                <button type="button" data-q="1" aria-label="Agregar una">${icon('plus')}</button>
              </div>
            </div>
            <div class="qty-sum" data-sum aria-live="polite"></div>
            <div class="buy-row">
              <button class="btn btn-ink btn-block" type="button" data-add="${p.slug}">${icon('bag')} Agregar al pedido</button>
              ${favBtn(p, 'fav-lg')}
            </div>
            <p class="added" data-added aria-live="polite"></p>
          </div>

          <ul class="assure">
            <li>${icon('truck')}<div><b>Despacho en 2–3 días hábiles</b><span>Por Shalom. Recoges en la agencia que elijas.</span></div></li>
            <li>${icon('card')}<div><b>Pagas al confirmar</b><span>Yape, Plin o transferencia, coordinado por WhatsApp.</span></div></li>
            <li>${icon('shield')}<div><b>Prendas nuevas y etiquetadas</b><span>Cada una en su bolsa, listas para revender.</span></div></li>
          </ul>

          <details class="acc" open>
            <summary>Saca tu cuenta ${icon('chevd')}</summary>
            <div class="margin">
              <label for="sell">¿A cuánto venderías cada prenda?</label>
              <div class="row">
                <span class="money"><span>S/</span><input id="sell" type="number" inputmode="decimal" min="0" step="1" value="${suggest}" data-sell></span>
                <span class="res" data-res></span>
              </div>
              <small>Cálculo referencial: no incluye el costo de envío.</small>
            </div>
          </details>
          <details class="acc" open>
            <summary>Descripción ${icon('chevd')}</summary>
            <table class="spec"><tbody>${rows.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
          </details>
        </div>
      </div>`;

    let qty = 1;
    const qtyEl = $('[data-qty]', host);
    const minus = $('[data-q="-1"]', host);
    const plus = $('[data-q="1"]', host);
    const sum = $('[data-sum]', host);
    const setQty = v => {
      qty = Math.max(1, Math.min(MAX_QTY, v));
      qtyEl.textContent = qty; minus.disabled = qty <= 1; plus.disabled = qty >= MAX_QTY;
      $$('[data-preset]', host).forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.preset === qty)));
      sum.innerHTML = `<span><b class="num">${qty}</b> ${packWord(p, qty)} = <b class="num">${qty * p.units}</b> prendas</span><b class="num tot">${money(p.price * qty)}</b>`;
      calc();
    };
    host.querySelectorAll('[data-q]').forEach(b => b.addEventListener('click', () => setQty(qty + +b.dataset.q)));
    host.querySelectorAll('[data-preset]').forEach(b => b.addEventListener('click', () => setQty(+b.dataset.preset)));
    $('[data-add]', host).addEventListener('click', () => {
      addToOrder(p.slug, qty);
      $('[data-added]', host).innerHTML = `${icon('check')} Listo: ${qty} ${packWord(p, qty)} (${qty * p.units} prendas) en tu pedido.`;
      toast(`Agregaste ${qty} ${packWord(p, qty)} · ${qty * p.units} prendas`, 'Ver pedido', openOrder);
    });
    const main = $('[data-main]', host);
    let shown = 0;
    const show = i => {
      shown = (i + imgs.length) % imgs.length;
      main.src = imgs[shown]; main.alt = `${p.name}, foto ${shown + 1} de ${imgs.length}`;
      $('[data-gcount]', host).textContent = `${shown + 1} / ${imgs.length}`;
      $$('[data-img]', host).forEach((x, j) => x.setAttribute('aria-current', String(j === shown)));
    };
    $$('[data-img]', host).forEach(b => b.addEventListener('click', () => show(+b.dataset.img)));
    $$('[data-gnav]', host).forEach(b => b.addEventListener('click', () => show(shown + +b.dataset.gnav)));
    // Deslizar la foto con el dedo en móvil
    let x0 = null;
    main.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    main.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(shown + (dx < 0 ? 1 : -1)); x0 = null; }, { passive: true });
    const sell = $('[data-sell]', host);
    const res = $('[data-res]', host);
    function calc() {
      const v = parseFloat(sell.value);
      if (!(v > 0)) { res.innerHTML = 'Escribe un precio para ver tu ganancia.'; return; }
      const total = (v - p.unitPrice) * p.units * qty;
      res.innerHTML = `Ganarías con ${qty} ${packWord(p, qty)}<b class="num ${total < 0 ? 'neg' : ''}">${money0(total)}</b>`;
    }
    sell.addEventListener('input', calc);
    setQty(1);

    const rel = PRODUCTS.filter(x => x.slug !== p.slug)
      .sort((a, b) => (b.tags.filter(t => p.tags.includes(t)).length) - (a.tags.filter(t => p.tags.includes(t)).length))
      .slice(0, 5);
    $('[data-grid="rel"]').innerHTML = rel.map(p => card(p)).join('');
  }

  /* ---------- Pedido ---------- */
  const lines = () => Object.entries(state.order).map(([slug, q]) => ({ p: PRODUCTS.find(x => x.slug === slug), q })).filter(l => l.p && l.q > 0);
  const totals = () => lines().reduce((t, { p, q }) => ({ packs: t.packs + q, units: t.units + q * p.units, amount: t.amount + q * p.price }), { packs: 0, units: 0, amount: 0 });
  function saveOrder() { store.set('order', state.order); updateCount(); }
  function updateCount() {
    const t = totals();
    $$('[data-count]').forEach(c => { c.textContent = t.packs; c.hidden = !t.packs; });
    $$('[data-open-order]').forEach(btn => {
      btn.classList.remove('bump'); void btn.offsetWidth; if (t.packs) btn.classList.add('bump');
      btn.setAttribute('aria-label', `Mi pedido, ${t.packs} ${t.packs === 1 ? 'paquete' : 'paquetes'}`);
    });
  }
  function addToOrder(slug, q) { state.order[slug] = Math.min(MAX_QTY, (state.order[slug] || 0) + q); saveOrder(); renderOrder(); }

  function renderOrder() {
    const body = $('[data-order-body]');
    const foot = $('[data-order-foot]');
    const ls = lines();
    if (!ls.length) {
      body.innerHTML = `<div class="drawer-empty"><span class="disc">${icon('bag')}</span><h3>Tu pedido está vacío</h3><p>Entra por categoría o por talla y agrega las series que quieras.</p><a class="btn btn-ink" href="#/catalogo" data-close-order>Ver catálogo</a></div>`;
      foot.innerHTML = '';
      return;
    }
    const t = totals();
    const c = state.contact;
    body.innerHTML = `
      <div class="sheet">
        ${ls.map(({ p, q }) => `
          <div class="line">
            <img src="${p.cover}" alt="" width="64" height="80">
            <div><h4>${esc(p.name)}</h4><div class="m">${typeLabel(p)} · ${money(p.unitPrice)} c/u</div><div class="m"><span class="num">${q * p.units}</span> prendas</div></div>
            <div class="r">
              <b class="num">${money(p.price * q)}</b>
              <div class="stepper stepper-sm" role="group" aria-label="Cantidad de ${esc(p.name)}">
                <button type="button" data-line="${p.slug}" data-d="-1" aria-label="${q === 1 ? 'Quitar del pedido' : 'Quitar una'}">${icon(q === 1 ? 'x' : 'minus')}</button>
                <output class="num">${q}</output>
                <button type="button" data-line="${p.slug}" data-d="1" aria-label="Agregar una"${q >= MAX_QTY ? ' disabled' : ''}>${icon('plus')}</button>
              </div>
            </div>
          </div>`).join('')}
        <div class="totals num">
          <div><span>Paquetes</span><span>${t.packs}</span></div>
          <div><span>Prendas en total</span><span>${t.units}</span></div>
          <div><span>Precio promedio por prenda</span><span>${money(t.amount / t.units)}</span></div>
          <div class="grand"><span>Total estimado</span><b>${money(t.amount)}</b></div>
        </div>
      </div>
      <form class="form" data-form novalidate>
        <h3>Tus datos para el envío</h3>
        <div class="field" data-f="nombre"><label for="f-nombre">Nombre</label><input id="f-nombre" name="nombre" autocomplete="name" value="${esc(c.nombre || '')}" placeholder="Ej. Rosa Quispe"><p class="err">Escribe tu nombre para saber a quién atendemos.</p></div>
        <div class="field" data-f="celular"><label for="f-cel">Celular</label><input id="f-cel" name="celular" type="tel" inputmode="tel" autocomplete="tel" value="${esc(c.celular || '')}" placeholder="9XX XXX XXX"><p class="err">Necesitamos un celular de 9 dígitos.</p></div>
        <fieldset class="field seg" data-f="destino"><legend>¿Dónde recibes tu pedido?</legend>
          <label><input type="radio" name="destino" value="peru"${c.destino !== 'otro' ? ' checked' : ''}><span>Perú</span></label>
          <label><input type="radio" name="destino" value="otro"${c.destino === 'otro' ? ' checked' : ''}><span>Otro país</span></label>
        </fieldset>
        <div class="intl" data-intl hidden>
          <div class="two">
            <div class="field" data-f="pais"><label for="f-pais">País</label><select id="f-pais" name="pais" data-pais>
              ${['', 'Bolivia', 'Ecuador', 'Otro'].map(x => `<option value="${x}"${x === (c.pais || '') ? ' selected' : ''}${x === '' ? ' disabled' : ''}>${x === '' ? 'Elige…' : x === 'Otro' ? 'Otro país' : x}</option>`).join('')}
            </select><p class="err">Elige el país.</p></div>
            <div class="field" data-f="ciudadIntl"><label for="f-ciudad-intl">Ciudad</label><input id="f-ciudad-intl" name="ciudadIntl" value="${esc(c.ciudadIntl || '')}" placeholder="Ej. Guayaquil"><p class="err">Escribe tu ciudad.</p></div>
          </div>
          <div class="field" data-f="paisOtro" data-pais-otro hidden><label for="f-pais-otro">¿Qué país?</label><input id="f-pais-otro" name="paisOtro" value="${esc(c.paisOtro || '')}" placeholder="Ej. Chile"><p class="err">Escribe el país.</p></div>
          <p class="intl-note">Te escribimos para coordinar el envío y su costo.</p>
        </div>
        <div class="pe" data-pe>
          <div class="two">
            <div class="field" data-f="dep"><label for="f-dep">Departamento</label><select id="f-dep" name="dep" data-dep></select><p class="err">Elige tu departamento.</p></div>
            <div class="field" data-f="prov"><label for="f-prov">Provincia</label><select id="f-prov" name="prov" data-prov></select><p class="err">Elige tu provincia.</p></div>
          </div>
          <div class="field" data-f="agencia"><label for="f-agencia">Agencia Shalom donde recoges</label><select id="f-agencia" name="agencia" data-agencia></select><p class="agencia-dir" data-agencia-dir></p><p class="err">Elige la agencia donde recogerás tu paca.</p></div>
          <div class="field" data-f="agenciaOtra" data-otra hidden><label for="f-otra">Escribe tu agencia</label><input id="f-otra" name="agenciaOtra" value="${esc(c.agenciaOtra || '')}" placeholder="Nombre o dirección de la agencia"><p class="err">Escribe la agencia donde recogerás tu paca.</p></div>
        </div>
        <div class="field"><label for="f-tipo">Es para</label>
          <select id="f-tipo" name="tipo">
            ${['Revender en mi tienda', 'Revender por redes', 'Uso propio / regalo'].map(o => `<option${c.tipo === o ? ' selected' : ''}>${o}</option>`).join('')}
          </select></div>
        <div class="field"><label for="f-nota">Nota <i>(opcional)</i></label><textarea id="f-nota" name="nota" placeholder="Ej. ¿Tienen más modelos de overoles?">${esc(c.nota || '')}</textarea></div>
      </form>`;
    foot.innerHTML = `<button class="btn btn-wa btn-block" type="button" data-send>${icon('chat')} Enviar pedido por WhatsApp</button><p>No se cobra nada aquí. Coordinamos el pago por WhatsApp.</p>`;
    const form = $('[data-form]', body);
    wireAgencias(form, c);
    const pe = $('[data-pe]', form), intl = $('[data-intl]', form), paisSel = $('[data-pais]', form), paisOtro = $('[data-pais-otro]', form);
    const syncDestino = () => {
      const otro = form.destino.value === 'otro';
      pe.hidden = otro; intl.hidden = !otro;
      paisOtro.hidden = !(otro && paisSel.value === 'Otro');
    };
    form.addEventListener('change', e => { if (e.target.name === 'destino' || e.target === paisSel) syncDestino(); });
    syncDestino();
    const save = e => {
      state.contact = Object.fromEntries(new FormData(form)); store.set('contact', state.contact);
      const f = e.target.closest('.field'); if (f) f.classList.remove('bad');
    };
    form.addEventListener('input', save);
    form.addEventListener('change', save);
  }

  /* ---------- Departamento → Provincia → Agencia ---------- */
  const AG = window.KHLOE_AGENCIAS || {};
  const OTRA = 'otra';
  const opt = (v, l, sel, dis) => `<option value="${esc(v)}"${sel ? ' selected' : ''}${dis ? ' disabled' : ''}>${esc(l)}</option>`;
  function wireAgencias(form, c) {
    const dep = $('[data-dep]', form), prov = $('[data-prov]', form), ag = $('[data-agencia]', form);
    const dir = $('[data-agencia-dir]', form), otra = $('[data-otra]', form);
    const fillDep = () => {
      dep.innerHTML = opt('', 'Elige…', !c.dep, true) + Object.keys(AG).sort((a, b) => a.localeCompare(b, 'es')).map(d => opt(d, d, d === c.dep)).join('');
    };
    const fillProv = keep => {
      const provs = dep.value ? Object.keys(AG[dep.value] || {}) : [];
      prov.disabled = !provs.length;
      const sel = keep && provs.includes(c.prov) ? c.prov : (provs.length === 1 ? provs[0] : '');
      prov.innerHTML = opt('', dep.value ? 'Elige…' : 'Primero el departamento', !sel, true) + provs.map(x => opt(x, x, x === sel)).join('');
    };
    const showDir = () => {
      const a = ((AG[dep.value] || {})[prov.value] || []).find(x => x.nombre === ag.value);
      dir.textContent = a ? a.direccion : '';
      otra.hidden = ag.value !== OTRA;
    };
    const fillAg = keep => {
      const list = (dep.value && prov.value) ? (AG[dep.value][prov.value] || []) : [];
      ag.disabled = !prov.value;
      const sel = keep ? c.agencia : '';
      ag.innerHTML = opt('', prov.value ? 'Elige tu agencia…' : 'Primero la provincia', !sel, true)
        + list.map(a => opt(a.nombre, a.nombre, a.nombre === sel)).join('')
        + (prov.value ? opt(OTRA, 'No encuentro mi agencia', sel === OTRA) : '');
      showDir();
    };
    fillDep(); fillProv(true); fillAg(true);
    dep.addEventListener('change', () => { fillProv(false); fillAg(false); });
    prov.addEventListener('change', () => fillAg(false));
    ag.addEventListener('change', showDir);
  }
  function destino(v) {
    if (v.agencia === OTRA) return { agencia: (v.agenciaOtra || '').trim(), dir: '' };
    const a = ((AG[v.dep] || {})[v.prov] || []).find(x => x.nombre === v.agencia);
    return { agencia: v.agencia, dir: a ? a.direccion : '' };
  }
  function validate() {
    const form = $('[data-form]');
    const v = Object.fromEntries(new FormData(form));
    const bad = [];
    if (!v.nombre.trim()) bad.push('nombre');
    if (v.celular.replace(/\D/g, '').replace(/^51/, '').length !== 9) bad.push('celular');
    if (v.destino === 'otro') {
      if (!v.pais) bad.push('pais');
      if (v.pais === 'Otro' && !(v.paisOtro || '').trim()) bad.push('paisOtro');
      if (!(v.ciudadIntl || '').trim()) bad.push('ciudadIntl');
    } else {
      if (!v.dep) bad.push('dep');
      if (!v.prov) bad.push('prov');
      if (!v.agencia) bad.push('agencia');
      if (v.agencia === OTRA && !(v.agenciaOtra || '').trim()) bad.push('agenciaOtra');
    }
    $$('[data-f]', form).forEach(f => f.classList.toggle('bad', bad.includes(f.dataset.f)));
    if (bad.length) { $(`[data-f="${bad[0]}"] input, [data-f="${bad[0]}"] select`, form).focus(); return null; }
    return v;
  }
  function buildMessage(v) {
    const t = totals();
    const out = ['Hola Khloe Shopp, quiero hacer este pedido por mayor:', ''];
    lines().forEach(({ p, q }) => out.push(`• ${q} × ${p.name} (${typeLabel(p).toLowerCase()} · ${q * p.units} prendas · tallas ${p.sizes.map(prettySize).join(', ')}) — ${money(p.price * q)}`));
    out.push('', `Total: ${t.packs} ${t.packs === 1 ? 'paquete' : 'paquetes'} · ${t.units} prendas · ${money(t.amount)}`, '');
    out.push(`Nombre: ${v.nombre.trim()}`, `Celular: ${v.celular.trim()}`);
    if (v.destino === 'otro') {
      const pais = v.pais === 'Otro' ? v.paisOtro.trim() : v.pais;
      out.push(`Destino: ${v.ciudadIntl.trim()}, ${pais} (envío internacional, coordinar)`);
    } else {
      const d = destino(v);
      out.push(`Destino: ${v.prov}, ${v.dep}`);
      out.push(`Agencia Shalom: ${d.agencia}${d.dir ? ' (' + d.dir + ')' : ''}${v.agencia === OTRA ? ' (no está en la lista)' : ''}`);
    }
    out.push(`Es para: ${v.tipo}`);
    if (v.nota.trim()) out.push(`Nota: ${v.nota.trim()}`);
    out.push('', 'Pedido armado desde la web.');
    return out.join('\n');
  }
  function send() {
    const v = validate(); if (!v) return;
    const msg = buildMessage(v);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    state.lastSent = { msg, url };
    window.open(url, '_blank', 'noopener');
    closeOrder();
    location.hash = '#/enviado';
  }
  function renderSent() {
    const host = $('[data-sent]');
    if (!state.lastSent) { location.hash = '#/'; return; }
    host.innerHTML = `
      <span class="disc ok">${icon('check')}</span>
      <h1>Tu pedido se abrió en WhatsApp.</h1>
      <p class="sub">Si WhatsApp no se abrió, toca el botón de abajo. Tu lista sigue guardada aquí por si quieres cambiar algo.</p>
      <ol class="how how-tight">
        <li><span class="step num">1</span>${icon('check')}<h3>Confirmamos stock</h3><p>Te respondemos por WhatsApp.</p></li>
        <li><span class="step num">2</span>${icon('card')}<h3>Coordinamos el pago</h3><p>Por Yape, Plin o transferencia.</p></li>
        <li><span class="step num">3</span>${icon('truck')}<h3>Despachamos en 2–3 días</h3><p>Por Shalom, a la agencia que elegiste.</p></li>
      </ol>
      <div class="row">
        <a class="btn btn-wa" href="${state.lastSent.url}" target="_blank" rel="noopener">${icon('chat')} Abrir WhatsApp otra vez</a>
        <a class="btn btn-ghost" href="#/catalogo">Seguir viendo</a>
      </div>
      <pre>${esc(state.lastSent.msg)}</pre>`;
  }

  /* ---------- Cajón del pedido ---------- */
  let lastFocus = null;
  function openOrder() {
    renderOrder();
    lastFocus = document.activeElement;
    const d = $('#pedido');
    d.classList.add('on'); d.setAttribute('aria-hidden', 'false');
    $('[data-scrim]').classList.add('on');
    document.body.style.overflow = 'hidden';
    setTimeout(() => d.focus(), 60);
  }
  function closeOrder() {
    const d = $('#pedido');
    d.classList.remove('on'); d.setAttribute('aria-hidden', 'true');
    $('[data-scrim]').classList.remove('on');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-open-order]')) { e.preventDefault(); openOrder(); }
    else if (e.target.closest('[data-close-order]') || e.target.closest('[data-scrim]')) closeOrder();
    else if (e.target.closest('[data-send]')) send();
    else {
      const b = e.target.closest('[data-line]');
      if (b) {
        const s = b.dataset.line; state.order[s] = Math.min(MAX_QTY, (state.order[s] || 0) + +b.dataset.d);
        if (state.order[s] <= 0) delete state.order[s];
        saveOrder(); renderOrder();
        const again = $(`[data-line="${s}"][data-d="${b.dataset.d}"]`); if (again) again.focus();
      }
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && $('#pedido').classList.contains('on')) closeOrder();
    if (e.key === 'Enter' && (e.target.dataset.priceMin !== undefined || e.target.dataset.priceMax !== undefined)) {
      e.preventDefault();
      document.querySelector('[data-price-ok]')?.click();
    }
  });

  /* ---------- Toast ---------- */
  let tt;
  function toast(text, action, fn) {
    const t = $('[data-toast]');
    t.innerHTML = `<span>${esc(text)}</span>${action ? `<button type="button">${action}</button>` : ''}`;
    if (action) t.querySelector('button').onclick = () => { t.classList.remove('on'); fn(); };
    t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 3600);
  }

  function wirePlainWa() {
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Khloe Shopp, tengo una consulta sobre sus series.')}`;
    $$('[data-wa-plain]').forEach(a => { a.href = url; });
    const enc = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Khloe Shopp, quiero cotizar un pedido de SHEIN/Temu.')}`;
    $$('[data-wa-encargo]').forEach(a => { a.href = enc; });
  }

  /* ---------- Rutas ---------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    let name = 'home', arg = null;
    if (h.startsWith('catalogo')) {
      name = 'catalogo';
      const [, c, g] = h.split('/');
      state.cat = CATS.some(x => x.id === c) ? c : 'todos';
      state.group = g && g !== state.cat && CATS.some(x => x.id === g) ? g : null;
    }
    else if (h.startsWith('producto/')) { name = 'producto'; arg = h.split('/')[1]; }
    else if (h.startsWith('enviado')) name = 'enviado';
    state.screen = name;
    $$('.screen').forEach(s => s.classList.toggle('on', s.dataset.screen === name));
    const current = name === 'catalogo' ? (state.cat === 'favoritos' ? 'favoritos' : 'catalogo') : h.startsWith('como') ? 'como' : name === 'home' ? 'home' : '';
    $$('[data-nav]').forEach(a => {
      if (a.dataset.nav === current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.getElementById('cat-sidebar')?.classList.remove('open');
    document.querySelector('[data-filters-scrim]')?.classList.remove('on');
    if (name === 'catalogo') applyFilter(); else markNav();
    if (name === 'producto') renderDetail(arg);
    if (name === 'enviado') renderSent();
    const titles = { home: 'Khloe Shopp · Ropa infantil importada por mayor', catalogo: 'Catálogo · Khloe Shopp', enviado: 'Pedido enviado · Khloe Shopp' };
    document.title = name === 'producto' ? `${(PRODUCTS.find(p => p.slug === arg) || {}).name || 'Modelo'} · Khloe Shopp` : titles[name];
    if (h.startsWith('como-pedir')) requestAnimationFrame(() => $('#como-pedir').scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth' }));
    else window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  /* ---------- Inicio ---------- */
  renderHero();
  renderCircles();
  renderMega();
  renderGrids();
  updateCount();
  updateFavCount();
  window.addEventListener('hashchange', route);
  route();
  // Franja de avisos: rota un mensaje cada 4 s
  const msgs = $$('.announce-track p');
  let mi = 0; msgs[0].classList.add('on');
  if (msgs.length > 1 && !reduced.matches) setInterval(() => {
    const prev = mi;
    msgs[prev].classList.replace('on', 'off');
    setTimeout(() => msgs[prev].classList.remove('off'), 500);
    mi = (mi + 1) % msgs.length; msgs[mi].classList.add('on');
  }, 4000);
  const top = $('#top');
  addEventListener('scroll', () => top.classList.toggle('scrolled', scrollY > 8), { passive: true });
})();
