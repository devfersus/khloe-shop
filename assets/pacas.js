/* Pacas en PREVENTA (catálogo mayorista "Pacas Kids").
   Para editar precios: cambia "unit" (precio por prenda) de cada paca.
   Si una paca tiene precios distintos por cantidad, usa "tiers" con { units, price } por cada opción.
   Las fotos están en assets/img/<slug>/ (01.jpg a 08.jpg, cover.jpg y cover2.jpg). */
(() => {
  const M_0_24 = ['6-9M', '9-12M', '12-18M', '18-24M'];
  const M_0_18 = ['6-9M', '9-12M', '12-18M'];
  const A_0_6 = [...M_0_24, '2-3Y', '3-4Y', '4-5Y', '5-6Y'];
  const A_0_7 = [...A_0_6, '6-7Y'];
  const A_0_8 = [...A_0_7, '7-8Y'];
  const A_1_7 = ['12-18M', '18-24M', '2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y'];

  const PACAS = [
    { slug: 'paca-rompers-navidenos', name: 'Paca Rompers Navideños Baby', unit: 27, sizeLabel: '0 a 24 meses', sizes: M_0_24, category: 'Navideña', tags: ['Bebé', 'Niña', 'Invierno'], summary: 'Rompers navideños de bebé con vincha a juego: terciopelo, cuadros escoceses y tul.' },
    { slug: 'paca-vestidos-navidenos', name: 'Paca Vestidos Navideños Kids', unit: 30, sizeLabel: '0 a 7 años', sizes: A_0_7, category: 'Navideña', tags: ['Niña', 'Vestidos', 'Invierno'], summary: 'Vestidos navideños en rojo y verde: terciopelo, tul con brillos y lazos.' },
    { slug: 'paca-emprendedora-mixta', name: 'Paca Emprendedora Kids Mixta', sizeLabel: '0 a 7 años', sizes: A_0_7, category: 'Surtido', tags: ['Niña', 'Niño', 'Verano', 'Invierno', 'Jeans', 'Vestidos', 'Conjuntos'],
      tiers: [{ units: 15, price: 420 }, { units: 25, price: 700 }, { units: 50, price: 1390 }, { units: 100, price: 2750 }],
      summary: 'Surtido para empezar tu negocio: verano, invierno, jeans y vestidos en una sola paca.' },
    { slug: 'paca-rompers-baby', name: 'Paca Rompers Baby', unit: 25, sizeLabel: '0 a 24 meses', sizes: M_0_24, category: 'Bebé', tags: ['Bebé', 'Niña', 'Verano'], summary: 'Rompers de bebé con tutú, vuelos y vincha: fresas, princesas, mariquitas y más.' },
    { slug: 'paca-verano-regular', name: 'Paca Verano Regular Kids Mixta', unit: 26, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Conjuntos', tags: ['Niña', 'Niño', 'Verano', 'Conjuntos'], summary: 'Conjuntos y vestidos de verano para niña y niño: shorts, jardineras y camisas.' },
    { slug: 'paca-invierno-regular', name: 'Paca Invierno Regular Kids Mixta', unit: 32, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Conjuntos', tags: ['Niña', 'Niño', 'Invierno', 'Conjuntos'], summary: 'Conjuntos de invierno: buzos, poleras con capucha, casacas y abrigos.' },
    { slug: 'paca-invierno-premium', name: 'Paca Invierno Premium Kids Mixta', unit: 38, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Conjuntos', tags: ['Niña', 'Niño', 'Invierno', 'Conjuntos'], summary: 'Conjuntos de invierno premium con chalecos, polar y aplicaciones.' },
    { slug: 'paca-chaquetas-jeans', name: 'Paca Chaquetas Jeans Kids Mixta', unit: 35, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Jeans', tags: ['Niña', 'Niño', 'Casacas'], summary: 'Chaquetas jean con apliques bordados: conejitos, ositos y lazos.' },
    { slug: 'paca-overoles-jeans', name: 'Paca Overoles Jeans Kids Mixta', unit: 32, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Jeans', tags: ['Niña', 'Niño', 'Overoles'], summary: 'Overoles jean con flores, lazos y parches para niña y niño.' },
    { slug: 'paca-pantalones-jeans', name: 'Paca Pantalones Jeans Kids Mixta', unit: 30, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Jeans', tags: ['Niña', 'Niño'], summary: 'Pantalones jean anchos con flores, corazones y parches.' },
    { slug: 'paca-jeans-surtido', name: 'Paca Jeans Surtido Kids Mixta', unit: 32, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Jeans', tags: ['Niña', 'Niño', 'Conjuntos', 'Overoles'], summary: 'Surtido de jean: conjuntos, overoles, shorts y pantalones.' },
    { slug: 'paca-conjuntos-jeans-regular', name: 'Paca Conjuntos Jeans Regular Kids Mixta', unit: 32, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Jeans', tags: ['Niña', 'Niño', 'Conjuntos'], summary: 'Conjuntos de polera o blusa con pantalón jean.' },
    { slug: 'paca-conjuntos-jeans-premium', name: 'Paca Conjuntos Jeans Premium Kids Mixta', unit: 38, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Jeans', tags: ['Niña', 'Niño', 'Conjuntos'], summary: 'Conjuntos premium con pantalón jean y blusas, poleras o polos con detalle.' },
    { slug: 'paca-conjuntos-jeans-nina-adolescente', name: 'Paca Conjuntos Jeans Niña Adolescente', unit: 40, sizeLabel: '7 a 14 años', sizes: ['7-8Y'], category: 'Jeans', tags: ['Niña', 'Conjuntos'], summary: 'Conjuntos de jean para niña de 7 a 14 años: blusas y poleras con pantalón ancho.' },
    { slug: 'paca-vestidos-jeans-nina', name: 'Paca Vestidos Jeans Niña Kids', unit: 30, sizeLabel: '0 a 7 años', sizes: A_0_7, category: 'Jeans', tags: ['Niña', 'Vestidos'], summary: 'Vestidos jean con flores, bordados y lazos.' },
    { slug: 'paca-vestidos-princesa', name: 'Paca Vestidos de Princesa Kids', unit: 35, sizeLabel: '0 a 6 años', sizes: A_0_6, category: 'Vestidos', tags: ['Niña', 'Vestidos'], summary: 'Vestidos de fiesta tipo princesa con tul, flores y lazos.' },
    { slug: 'paca-vestidos-coreanos-chic', name: 'Paca Vestidos Coreanos Chic Kids', unit: 26, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Vestidos', tags: ['Niña', 'Vestidos', 'Invierno'], summary: 'Vestidos estilo coreano de manga larga con cuellos, lazos y tul.' },
    { slug: 'paca-vestidos-coreanos', name: 'Paca Vestidos Coreanos Kids', unit: 27, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Vestidos', tags: ['Niña', 'Vestidos', 'Verano'], summary: 'Vestidos coreanos de tul con flores y mariposas bordadas.' },
    { slug: 'paca-tejido-baby', name: 'Paca Conjuntos de Tejido Baby Mixta', unit: 38, sizeLabel: '0 a 18 meses', sizes: M_0_18, category: 'Chompas', tags: ['Bebé', 'Niña', 'Niño', 'Invierno', 'Conjuntos'], summary: 'Conjuntos y enterizos tejidos para bebé con gorrito y aplicaciones.' },
    { slug: 'paca-tejido-kids', name: 'Paca Conjuntos de Tejido Kids', unit: 42, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Chompas', tags: ['Niña', 'Invierno', 'Conjuntos'], summary: 'Conjuntos tejidos de cárdigan con falda o pantalón, con bordados.' },
    { slug: 'paca-cardigan-sueteres', name: 'Paca Cárdigan & Suéteres Kids Mixta', unit: 28, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Chompas', tags: ['Niña', 'Niño', 'Invierno'], summary: 'Cárdigans y suéteres tejidos con bordados para niña y niño.' },
    { slug: 'paca-abrigos-regular', name: 'Paca Abrigos Regular Kids Mixta', unit: 30, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Casacas', tags: ['Niña', 'Niño', 'Invierno'], summary: 'Abrigos y casacas con chiporro, gamuza y cuero sintético.' },
    { slug: 'paca-abrigos-premium', name: 'Paca Abrigos Premium Kids Mixta', unit: 35, sizeLabel: '0 a 8 años', sizes: A_0_8, category: 'Casacas', tags: ['Niña', 'Niño', 'Invierno'], summary: 'Abrigos premium: paño, puffer, chiporro y cuellos de peluche.' },
    { slug: 'paca-pijamas', name: 'Paca Pijamas Kids Mixta', unit: 26, sizeLabel: '1 a 7 años', sizes: A_1_7, category: 'Pijamas', tags: ['Niña', 'Niño'], summary: 'Pijamas de dos piezas con botones y estampados de ositos, vaquitas y corazones.' },
    { slug: 'paca-calzado', name: 'Paca Calzado Kids Mixta', unit: 35, sizeLabel: 'Tallas 20 a 30', sizes: [], category: 'Calzado', tags: ['Niña', 'Niño'], summary: 'Zapatillas, botas y zapatos para niña y niño.' },
    { slug: 'paca-calzado-mutoon', name: 'Paca Calzado Mutoon Kids Mixta', unit: 55, sizeLabel: 'Tallas 16 a 25', sizes: [], category: 'Calzado', tags: ['Niña', 'Niño', 'Bebé'], summary: 'Zapatillas de la marca Mutoon para primeros pasos y niños pequeños.' },
    { slug: 'paca-accesorios', name: 'Paca Accesorios Kids Mixta', unit: 15, sizeLabel: 'Niña y niño', sizes: [], category: 'Accesorios', tags: ['Niña', 'Niño'], summary: 'Gorras, lazos, sombreros, gorros, medias, turbantes y lentes.' },
    { slug: 'paca-mochilas-tematicas', name: 'Paca Mochilas Temáticas Kids Mixta', unit: 32, sizeLabel: 'Niña y niño', sizes: [], category: 'Accesorios', tags: ['Niña', 'Niño'], summary: 'Mochilas infantiles temáticas: hongos, ositos, dinosaurios y más.' }
  ];

  const UNITS = [15, 25, 50, 100];
  const FREE_SHIP_FROM = 50;
  const products = window.KHLOE.products;
  PACAS.forEach((c, i) => {
    const tiers = (c.tiers || UNITS.map(units => ({ units, price: units * c.unit })))
      .map(t => ({ units: t.units, price: t.price, unitPrice: Math.round(t.price / t.units * 100) / 100, freeShip: t.units >= FREE_SHIP_FROM }));
    const base = `assets/img/${c.slug}/`;
    const photos = [1, 2, 3, 4, 5, 6, 7, 8].map(n => `${base}0${n}.jpg`);
    products.push({
      id: c.slug,
      code: 'PK-' + String(i + 1).padStart(2, '0'),
      slug: c.slug,
      name: c.name,
      category: c.category,
      tags: c.tags,
      saleType: 'paca',
      delivery: 'preventa',
      units: tiers[0].units,
      price: tiers[0].price,
      unitPrice: tiers[0].unitPrice,
      tiers,
      sizes: c.sizes,
      sizeLabel: c.sizeLabel,
      details: { temporada: c.tags.includes('Invierno') && c.tags.includes('Verano') ? 'Verano e invierno' : c.tags.includes('Invierno') ? 'Invierno' : c.tags.includes('Verano') ? 'Verano' : '' },
      stock: 'preventa',
      isNew: false,
      images: [`${base}cover.jpg`, `${base}cover2.jpg`, ...photos],
      cover: `${base}cover.jpg`,
      flyer: `${base}cover.jpg`,
      summary: c.summary
    });
  });
})();
