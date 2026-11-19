/*
  Agencias Shalom para el selector de "Mi pedido".
  Lista PARCIAL para la demo, tomada a mano del buscador oficial https://shalom.com.pe/agencias (14-11-2026).
  Estructura: departamento → provincia → [agencias]. Para producción, completar y revisar cada cierto tiempo.
*/
window.KHLOE_AGENCIAS = {
  "Amazonas": {
    "Chachapoyas": [
      { "nombre": "Chachapoyas Co Dos de Mayo", "direccion": "Jr. Dos de Mayo cdra. 15 s/n, junto al terminal de combis ETSA" },
      { "nombre": "Chachapoyas Jr. Grau", "direccion": "Jr. Grau 270" }
    ]
  },
  "Arequipa": {
    "Arequipa": [
      { "nombre": "Av. Parra 379", "direccion": "Av. Parra 379, Arequipa" },
      { "nombre": "Mall Lambramani", "direccion": "Av. Lambramani 325, dentro del mall (sótano -4)" },
      { "nombre": "Av. Lima – Alto Selva Alegre", "direccion": "Av. Lima 406, Alto Selva Alegre" },
      { "nombre": "Plaza La Tomilla", "direccion": "Av. Ramón Castilla 1000-B, Cayma" },
      { "nombre": "Av. Pumacahua", "direccion": "Urb. San Felipe, Av. Pumacahua Lt. 14, Cerro Colorado" },
      { "nombre": "Zamacola", "direccion": "Calle Yavarí 507-B, Zamacola, Cerro Colorado" }
    ]
  },
  "Ayacucho": {
    "Huamanga": [
      { "nombre": "Ayacucho Co", "direccion": "AA.HH. Complejo Artesanal T1 Lt. 1, a una cuadra del terminal Libertadores" },
      { "nombre": "Carmen Alto", "direccion": "AA.HH. Carmen Alto Mz. B1 Lt. 9, Carmen Alto" },
      { "nombre": "San Juan Bautista", "direccion": "Av. Venezuela 431, Urb. Aprovisa, San Juan Bautista" },
      { "nombre": "Jesús Nazareno", "direccion": "Jr. José María Eguren 451, Jesús Nazareno" }
    ]
  },
  "Cusco": {
    "Cusco": [
      { "nombre": "Cusco Co Vía Evitamiento", "direccion": "Av. Evitamiento s/n, San Sebastián" },
      { "nombre": "Av. Antonio Lorena", "direccion": "Prolong. Av. Antonio Lorena 140, Santiago" },
      { "nombre": "Cachimayo – San Sebastián", "direccion": "Urb. Cachimayo A-37, Av. La Cultura, San Sebastián" },
      { "nombre": "San Jerónimo", "direccion": "Calle Ciro Alegría 224-226, San Jerónimo" },
      { "nombre": "Tica Tica", "direccion": "Arco Ticatica Pustipata Lt. A-11-2" }
    ]
  },
  "Junín": {
    "Huancayo": [
      { "nombre": "Huancayo Jr. Ica", "direccion": "Jr. Ica 1143, Huancayo" },
      { "nombre": "Terminal Los Andes", "direccion": "Av. Ferrocarril s/n, counter 14, frente al Open Plaza" },
      { "nombre": "Chilca Co Leoncio Prado", "direccion": "Jr. Leoncio Prado 656, Chilca" },
      { "nombre": "Pio Pata", "direccion": "Av. Huancavelica 1201, El Tambo" }
    ]
  },
  "La Libertad": {
    "Trujillo": [
      { "nombre": "Óvalo Huanchaco Co", "direccion": "Carretera Vía de Evitamiento 576.2, Huanchaquito Alto" },
      { "nombre": "Calle Liverpool", "direccion": "Calle Liverpool 329, Urb. Santa Isabel" },
      { "nombre": "Atahualpa", "direccion": "Calle Atahualpa 481, a media cuadra de Av. Los Incas" },
      { "nombre": "Calle Santa Cruz – América Sur", "direccion": "Calle Santa Cruz 389, Chicago" },
      { "nombre": "Av. Larco", "direccion": "Av. Larco 865" },
      { "nombre": "Av. Tahuantinsuyo", "direccion": "Av. Tahuantinsuyo 739, La Esperanza" },
      { "nombre": "Wichanzao", "direccion": "Mz. 1 Lt. 23 AA.HH. Wichanzao, La Esperanza" },
      { "nombre": "Jr. Cahuide", "direccion": "Jr. Cahuide 342, El Porvenir" },
      { "nombre": "Moche", "direccion": "Calle Elio Jacobo Mz. D Lt. 13, Moche" }
    ]
  },
  "Lambayeque": {
    "Chiclayo": [
      { "nombre": "Av. Víctor R. Haya Co", "direccion": "Av. Víctor Raúl Haya de la Torre 2470, La Victoria" },
      { "nombre": "Calle Tacna", "direccion": "Calle Tacna 1095, a espaldas de Makro" },
      { "nombre": "Miraflores Chiclayo", "direccion": "Av. Panamericana 975, PP.JJ. Luis Alberto Sánchez" },
      { "nombre": "Av. Las Américas", "direccion": "Av. Las Américas Mz. D Lt. 42, Urb. Monterrico" },
      { "nombre": "Calle Tahuantinsuyo", "direccion": "Calle Tahuantinsuyo 995, José Leonardo Ortiz" },
      { "nombre": "Monsefú", "direccion": "Av. Venezuela 221, Monsefú" }
    ]
  },
  "Lima": {
    "Lima": [
      { "nombre": "Av. México Co", "direccion": "Av. México 1125, La Victoria" },
      { "nombre": "Jr. Raymondi", "direccion": "Jr. Antonio Raymondi 113, La Victoria" },
      { "nombre": "Av. Canadá", "direccion": "Av. Canadá 1603, La Victoria" },
      { "nombre": "Av. Las Palmeras", "direccion": "Av. Las Palmeras 5236, Urb. Villa Norte, Los Olivos" },
      { "nombre": "Av. Angélica Gamarra", "direccion": "Av. Angélica Gamarra 621, Urb. El Trébol, Los Olivos" },
      { "nombre": "Pro", "direccion": "Av. Los Próceres Mz. PP2 Lt. 21, Urb. Puertas de Pro, Los Olivos" }
    ]
  },
  "Piura": {
    "Piura": [
      { "nombre": "Av. Raúl Mata La Cruz", "direccion": "Av. Raúl Mata La Cruz Mz. C Lt. 11, Urb. Los Jardines" },
      { "nombre": "Av. Luis Eguiguren", "direccion": "Av. Málaga Mz. A Lt. 20 Int. 105" },
      { "nombre": "Av. Tacna – Castilla", "direccion": "Av. Tacna 503, Castilla" },
      { "nombre": "Catacaos", "direccion": "Av. Francisco Bolognesi Mz. 60 Lt. 37, Catacaos" },
      { "nombre": "Calle Emaús", "direccion": "Calle Tres 102, Zona Industrial II, 26 de Octubre" }
    ]
  }
};
