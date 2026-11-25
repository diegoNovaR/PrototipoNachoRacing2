// Todos los textos y datos de la página. Editar aquí sin tocar el diseño.
// Fuente de cada dato: docs/superpowers/specs/2026-11-25-landing-nacho-racing-design.md §3
const img = (name, alt) => ({ src: `./assets/img/opt/${name}.jpg`, alt });

export const content = {
  brand: {
    name: 'Nacho Racing',
    tagline: 'Especialistas en Subaru y motores de alto rendimiento. Armamos, potenciamos y preparamos tu auto para la calle y la pista.',
    location: 'Sachaca · Arequipa · Perú',
    motto: 'Servicio de calidad al mejor precio del mercado.',
  },
  hero: {
    stage: [
      img('bloque-boxer-abierto', 'Motor bóxer abierto en el taller Nacho Racing'),
      img('boxer-en-soporte', 'Motor bóxer armado sobre soporte en Nacho Racing'),
    ],
  },
  contact: {
    whatsappDisplay: '957 616 607',
    address: 'Carretera Variante de Uchumayo km 1.5, Sachaca, Arequipa',
    reference: 'A la derecha del grifo Petroamérica · frente a Cruz del Sur',
    hours: 'Lunes a viernes · 9:00 – 18:00',
    facebook: 'https://www.facebook.com/profile.php?id=100063466035254',
    mapsQuery: 'NACHO RACING, Sachaca, Arequipa',
    mapsCoords: '-16.4076536,-71.5615751',
    mapsUrl: 'https://www.google.com/maps/place/NACHO+RACING/@-16.4076536,-71.5615751,17z/data=!4m6!3m5!1s0x91424bc4501f5291:0x37516992ad557288!8m2!3d-16.4076536!4d-71.5615751',
  },
  stats: [
    { value: '1er', label: 'Puesto · Copa RPG Piques 2023' },
    { value: '2.9K', label: 'Seguidores en Facebook' },
    { value: 'L–V', label: '9:00 – 18:00' },
  ],
  specialties: ['Subaru', 'EJ20 · EJ25 · FA20', 'EVO 4G63', 'Armado de motores', 'Turbo', 'Pista'],
  workshop: {
    eyebrow: 'El taller',
    title: 'Donde los autos vuelven a rugir',
    text: 'Nuestro taller en Sachaca: elevadores, bancos de armado y los autos de nuestros clientes en un solo lugar.',
    images: [
      img('taller-subarus', 'Subarus de clientes en los elevadores del taller'),
      img('subaru-sti-celeste', 'Subaru Impreza STI celeste en el taller'),
      img('taller-interior', 'Zona de armado de motores con soportes rojos'),
      img('autos-taller-rojos', 'Autos deportivos estacionados en el taller Nacho Racing'),
      img('evento-subaru', 'Subaru preparado por Nacho Racing en evento con público'),
      img('taller-patio', 'Patio del taller con autos de clientes'),
      img('subaru-gc8', 'Subaru Impreza GC8 plateado'),
      img('taller-audi', 'Audi de clientes bajo el techo del taller'),
      img('evento-morado', 'Auto morado en evento de autos'),
      img('subaru-sti-plata', 'Subaru STI plateado con aros negros'),
      img('taller-banco', 'Banco de trabajo con piezas y herramientas'),
      img('rally-158', 'Auto de rally 158 en el taller'),
    ],
  },
  chapters: [
    {
      id: 'desarmamos', number: '01', title: 'Desarmamos',
      text: 'Abrimos el bóxer hasta el último perno para saber exactamente qué necesita.',
      waMessage: 'Hola Nacho Racing, quiero una revisión de mi motor',
      images: [img('bloque-boxer-abierto', 'Bloque bóxer abierto mostrando cilindros y espárragos')],
    },
    {
      id: 'armamos', number: '02', title: 'Armamos',
      text: 'Bloques bóxer EJ/FA y Mitsubishi 4G63 armados a mano, con medidas y torques controlados.',
      waMessage: 'Hola Nacho Racing, quiero cotizar el armado de un motor',
      images: [
        img('taller-motores-soportes', 'Motores armados sobre soportes rojos en el taller'),
        img('bloque-armado', 'Bloque de motor armado y limpio sobre banco de trabajo'),
      ],
    },
    {
      id: 'potenciamos', number: '03', title: 'Potenciamos',
      text: 'Turbo, intercooler, admisión y líneas de alimentación para más potencia confiable.',
      waMessage: 'Hola Nacho Racing, quiero cotizar un upgrade de turbo',
      images: [img('turbo', 'Turbo de carcasa azul con gorra Nacho Racing')],
    },
    {
      id: 'competimos', number: '04', title: 'Competimos',
      text: 'Motores preparados para piques y rally. Nuestros autos salen del taller a la pista.',
      waMessage: 'Hola Nacho Racing, quiero preparar mi auto para competencia',
      images: [
        img('rally-158', 'Auto de rally número 158 preparado por Nacho Racing'),
        img('rally-639', 'Auto de competencia número 639'),
        img('evento-pista', 'Subaru de Nacho Racing en evento de pista'),
        img('trofeos', 'Trofeos ganados con gorras Nacho Racing'),
      ],
    },
  ],
  achievements: [
    'Piloto Dany Pérez · 1er puesto categoría Super Turismo y 2do en la general',
    '1er puesto · Copa RPG Piques Legales 2023',
  ],
  team: {
    title: 'Las manos detrás de cada motor',
    text: 'Un equipo que vive los fierros y la pista. Gracias por confiar en nuestro trabajo.',
    images: [
      img('equipo-grupo', 'Equipo de Nacho Racing reunido en el taller'),
      img('equipo-uniforme', 'Mecánicos de Nacho Racing con uniforme'),
      img('mecanicos', 'Dos mecánicos de Nacho Racing en el taller'),
    ],
  },
  visit: { title: 'Visítanos en el taller' },
};
