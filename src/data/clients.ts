/**
 * Catálogo de clientes publicado en el material comercial de Sonic Publicidad.
 * Los logotipos se extrajeron del propio catálogo y se usan como referencia de
 * marcas atendidas.
 */
export interface Client {
  name: string;
  file: string;
  /** Ajuste del alto óptico respecto al resto de la retícula (1 = normal). */
  scale?: number;
}

export const clients: Client[] = [
  { name: "Visa", file: "visa.png" },
  { name: "Bimbo", file: "bimbo.png" },
  { name: "El Bosque Muebles", file: "el-bosque.png" },
  { name: "Bagó", file: "bago.png" },
  { name: "Veris", file: "veris.png" },
  { name: "Farmacias Medicity", file: "medicity.png" },
  { name: "Splenda", file: "splenda.png" },
  { name: "Tonicorp", file: "tonicorp.png" },
  { name: "McDonald's", file: "mcdonalds.png", scale: 0.82 },
  { name: "Xtrim", file: "xtrim.png" },
  { name: "Pedialyte", file: "pedialyte.png" },
  { name: "De Prati", file: "de-prati.png" },
  { name: "Promart Homecenter", file: "promart.png" },
  { name: "Automotores Continental", file: "automotores-continental.png", scale: 0.9 },
  { name: "Suzuki", file: "suzuki.png", scale: 0.85 },
  { name: "Eucerin", file: "eucerin.png" },
  { name: "Cóndor", file: "condor.png" },
  { name: "Sherwin-Williams", file: "sherwin-williams.png" },
];
