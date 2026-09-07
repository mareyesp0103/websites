/**
 * PROCESO DE TRABAJO
 *
 * Las etapas reflejan lo que el catálogo declara que Sonic Publicidad ejecuta:
 * coordinación, producción, instalación, supervisión, desinstalación y entrega
 * de reporte fotográfico. No se añaden etapas que el material no respalde.
 */
export interface ProcessStep {
  n: number;
  title: string;
  body: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: "Cuéntanos tu objetivo",
    body: "Ciudad, fechas, presupuesto referencial y qué necesitas lograr. Con eso empezamos.",
    icon: "MessageSquare",
  },
  {
    n: 2,
    title: "Seleccionamos los medios",
    body: "Armamos la combinación de formatos del catálogo que responde a tu objetivo y confirmamos disponibilidad de cada espacio.",
    icon: "ListChecks",
  },
  {
    n: 3,
    title: "Coordinamos producción y aprobaciones",
    body: "Gestionamos la producción del material y los permisos que corresponda: aprobación de artes del centro comercial o del Municipio, según el formato.",
    icon: "FileCheck2",
  },
  {
    n: 4,
    title: "Instalamos y ejecutamos",
    body: "Instalación de los elementos o salida del equipo operativo, coordinada con nuestros aliados estratégicos a nivel nacional.",
    icon: "Wrench",
  },
  {
    n: 5,
    title: "Supervisamos en sitio",
    body: "Nuestro equipo supervisa la activación mientras está en marcha, para que se ejecute como fue contratada.",
    icon: "Eye",
  },
  {
    n: 6,
    title: "Entregamos reporte y desinstalamos",
    body: "Reporte fotográfico de la ejecución y desinstalación de los elementos al cierre de la campaña.",
    icon: "Camera",
  },
];

/** Diferenciales declarados en el catálogo — sin cifras que no estén respaldadas. */
export interface Strength {
  title: string;
  body: string;
  icon: string;
}

export const strengths: Strength[] = [
  {
    title: "Velocidad de respuesta",
    body: "Los aliados estratégicos a nivel nacional existen para dar celeridad a los proyectos: es el principio con el que opera Sonic Publicidad.",
    icon: "Zap",
  },
  {
    title: "Cobertura nacional real",
    body: "Bicibanners, mochilas tipo banner y pasacalles se activan en simultáneo en todo el país; el Metro de Quito y las vallas móviles cubren Quito y Guayaquil.",
    icon: "MapPin",
  },
  {
    title: "Equipo capacitado",
    body: "Personal con experiencia en activaciones, especializado en coordinación, ejecución y supervisión integral.",
    icon: "Users",
  },
  {
    title: "Supervisión en sitio",
    body: "Las activaciones con personal incluyen supervisión mientras la campaña está en marcha, no sólo al inicio.",
    icon: "Eye",
  },
  {
    title: "Producción e instalación",
    body: "Producción del material, instalación y desinstalación coordinadas por el mismo equipo que contrata el espacio.",
    icon: "Wrench",
  },
  {
    title: "Reporte de ejecución",
    body: "Entrega de reporte fotográfico como constancia de que la campaña salió como fue contratada.",
    icon: "Camera",
  },
];
