export type EstadoBolsin =
  | "En tránsito"
  | "Recibido"
  | "Pendiente de recepción"
  | "Observado"
  | "Redirigido";

export interface Documentacion {
  id: string;
  asunto: string;
  tipo: string;
  estado: string;
}

export interface Remito {
  id: string;
  numero: string;
  emisor: string;
  fecha: string;
  documentacion: Documentacion[];
}

export interface Bolsin {
  id: string;
  numero: string;
  comisionOrigen: string;
  comisionDestino: string;
  precinto: string;
  estado: EstadoBolsin;
  salida: string;
  remitos: Remito[];
  ultimaPosicion: string;
  ultimaActualizacion: string;
  responsableDestino: string;
  x: number; // % sobre el mapa
  y: number;
}

export const comisiones = [
  "Comisión Médica N.º 1 — CABA",
  "Comisión Médica N.º 4 — La Plata",
  "Comisión Médica N.º 7 — Rosario",
  "Comisión Médica N.º 10 — Córdoba",
  "Comisión Médica N.º 15 — Mendoza",
  "Comisión Médica N.º 22 — Salta",
];

export const usuarioActual = {
  nombre: "Lucía Fernández",
  legajo: "EMP-10482",
  rol: "Responsable de Mesa de Entradas",
  comision: "Comisión Médica N.º 4 — La Plata",
  iniciales: "LF",
  email: "lfernandez@comisionesmedicas.gob.ar",
};

export const bolsines: Bolsin[] = [
  {
    id: "b1",
    numero: "BOL-2026-000418",
    comisionOrigen: "Comisión Médica N.º 1 — CABA",
    comisionDestino: "Comisión Médica N.º 4 — La Plata",
    precinto: "PRC-884213",
    estado: "En tránsito",
    salida: "01/09/2026 07:40",
    ultimaPosicion: "Autopista Bs. As. – La Plata, km 38",
    ultimaActualizacion: "01/09/2026 09:12",
    responsableDestino: "Lucía Fernández",
    x: 38,
    y: 46,
    remitos: [
      {
        id: "r1",
        numero: "REM-2026-01187",
        emisor: "Mesa de Entradas CABA",
        fecha: "31/08/2026",
        documentacion: [
          {
            id: "d1",
            asunto: "Expediente de incapacidad laboral — Pérez, Javier",
            tipo: "Expediente médico",
            estado: "Registrada",
          },
          {
            id: "d2",
            asunto: "Estudios complementarios — RMN columna lumbar",
            tipo: "Estudio complementario",
            estado: "Registrada",
          },
        ],
      },
      {
        id: "r2",
        numero: "REM-2026-01188",
        emisor: "Servicio Homologación",
        fecha: "31/08/2026",
        documentacion: [
          {
            id: "d3",
            asunto: "Acuerdo de homologación N.º 3391/26",
            tipo: "Acta de homologación",
            estado: "Registrada",
          },
        ],
      },
    ],
  },
  {
    id: "b2",
    numero: "BOL-2026-000419",
    comisionOrigen: "Comisión Médica N.º 7 — Rosario",
    comisionDestino: "Comisión Médica N.º 4 — La Plata",
    precinto: "PRC-884219",
    estado: "Pendiente de recepción",
    salida: "31/08/2026 16:05",
    ultimaPosicion: "Centro de distribución Zárate",
    ultimaActualizacion: "01/09/2026 08:35",
    responsableDestino: "Lucía Fernández",
    x: 55,
    y: 30,
    remitos: [
      {
        id: "r3",
        numero: "REM-2026-01201",
        emisor: "Mesa de Entradas Rosario",
        fecha: "30/08/2026",
        documentacion: [
          {
            id: "d4",
            asunto: "Dictamen médico — Sosa, María Elena",
            tipo: "Dictamen",
            estado: "Registrada",
          },
          {
            id: "d5",
            asunto: "Notificación fehaciente a la ART",
            tipo: "Notificación",
            estado: "Pendiente",
          },
        ],
      },
    ],
  },
  {
    id: "b3",
    numero: "BOL-2026-000421",
    comisionOrigen: "Comisión Médica N.º 10 — Córdoba",
    comisionDestino: "Comisión Médica N.º 4 — La Plata",
    precinto: "PRC-884230",
    estado: "En tránsito",
    salida: "01/09/2026 05:20",
    ultimaPosicion: "Ruta Nacional 9, km 412",
    ultimaActualizacion: "01/09/2026 09:48",
    responsableDestino: "Lucía Fernández",
    x: 26,
    y: 22,
    remitos: [
      {
        id: "r4",
        numero: "REM-2026-01214",
        emisor: "Mesa de Entradas Córdoba",
        fecha: "31/08/2026",
        documentacion: [
          {
            id: "d6",
            asunto: "Solicitud de junta médica — Quiroga, Ramón",
            tipo: "Solicitud",
            estado: "Registrada",
          },
          {
            id: "d7",
            asunto: "Historia clínica foliada (48 fs.)",
            tipo: "Historia clínica",
            estado: "Registrada",
          },
          {
            id: "d8",
            asunto: "Certificado de alta médica",
            tipo: "Certificado",
            estado: "Observada",
          },
        ],
      },
    ],
  },
  {
    id: "b4",
    numero: "BOL-2026-000410",
    comisionOrigen: "Comisión Médica N.º 15 — Mendoza",
    comisionDestino: "Comisión Médica N.º 4 — La Plata",
    precinto: "PRC-884188",
    estado: "Recibido",
    salida: "29/08/2026 11:00",
    ultimaPosicion: "Comisión Médica N.º 4 — La Plata",
    ultimaActualizacion: "30/08/2026 10:05",
    responsableDestino: "Lucía Fernández",
    x: 70,
    y: 62,
    remitos: [
      {
        id: "r5",
        numero: "REM-2026-01102",
        emisor: "Mesa de Entradas Mendoza",
        fecha: "28/08/2026",
        documentacion: [
          {
            id: "d9",
            asunto: "Expediente de reagravación — Molina, Carlos",
            tipo: "Expediente médico",
            estado: "Recibida",
          },
        ],
      },
    ],
  },
];

export const estadisticas = [
  { label: "Bolsines en tránsito", value: 24, delta: "+3 vs. ayer", tone: "info" as const },
  { label: "Recepciones del día", value: 17, delta: "+8%", tone: "success" as const },
  { label: "Documentación observada", value: 5, delta: "-2 vs. ayer", tone: "warning" as const },
  { label: "Documentación redirigida", value: 9, delta: "+1", tone: "primary" as const },
];

export const actividadReciente = [
  {
    hora: "09:48",
    texto: "BOL-2026-000421 actualizó su posición en Ruta Nacional 9, km 412.",
  },
  {
    hora: "09:12",
    texto: "BOL-2026-000418 ingresó al radio de la CM N.º 4 — La Plata.",
  },
  {
    hora: "08:35",
    texto: "Precinto PRC-884219 verificado en centro de distribución Zárate.",
  },
  {
    hora: "08:02",
    texto: "Recepción confirmada de BOL-2026-000410 con contenido conforme.",
  },
  {
    hora: "07:41",
    texto: "Remito REM-2026-01188 asociado al bolsín BOL-2026-000418.",
  },
];

export const serieMensual = [
  { mes: "Mar", enviados: 142, recibidos: 131 },
  { mes: "Abr", enviados: 168, recibidos: 160 },
  { mes: "May", enviados: 155, recibidos: 149 },
  { mes: "Jun", enviados: 189, recibidos: 178 },
  { mes: "Jul", enviados: 174, recibidos: 170 },
  { mes: "Ago", enviados: 203, recibidos: 191 },
];

export const porComision = [
  { comision: "CM 1", bolsines: 64 },
  { comision: "CM 4", bolsines: 51 },
  { comision: "CM 7", bolsines: 38 },
  { comision: "CM 10", bolsines: 45 },
  { comision: "CM 15", bolsines: 27 },
  { comision: "CM 22", bolsines: 19 },
];

export const distribucionEstados = [
  { estado: "Recibidos", valor: 191 },
  { estado: "En tránsito", valor: 24 },
  { estado: "Observados", valor: 12 },
  { estado: "Redirigidos", valor: 9 },
];

export const usuarios = [
  {
    nombre: "Lucía Fernández",
    legajo: "EMP-10482",
    rol: "Responsable de Mesa de Entradas",
    comision: "CM N.º 4 — La Plata",
    estado: "Activo",
  },
  {
    nombre: "Martín Álvarez",
    legajo: "EMP-10233",
    rol: "Administrador del sistema",
    comision: "CM N.º 1 — CABA",
    estado: "Activo",
  },
  {
    nombre: "Sofía Peralta",
    legajo: "EMP-11907",
    rol: "Operadora de documentación",
    comision: "CM N.º 7 — Rosario",
    estado: "Activo",
  },
  {
    nombre: "Diego Ibarra",
    legajo: "EMP-10874",
    rol: "Auditor médico",
    comision: "CM N.º 10 — Córdoba",
    estado: "Licencia",
  },
];
