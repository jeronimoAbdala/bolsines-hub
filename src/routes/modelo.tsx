import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/modelo")({
  head: () => ({
    meta: [
      { title: "Modelo de dominio — Bolsines" },
      {
        name: "description",
        content:
          "Visualización UML de las entidades del sistema Bolsines: Sesión, Usuario, Empleado, Comisión Médica, Bolsín, Remito y Documentación.",
      },
      { property: "og:title", content: "Modelo de dominio — Bolsines" },
      {
        property: "og:description",
        content: "Entidades y relaciones del dominio del sistema Bolsines.",
      },
    ],
  }),
  component: ModeloPage,
});

interface Entidad {
  nombre: string;
  estereotipo: string;
  atributos: string[];
}

const cadenas: { titulo: string; descripcion: string; entidades: Entidad[] }[] = [
  {
    titulo: "Contexto de sesión",
    descripcion: "Sesión → Usuario → Empleado → Comisión Médica",
    entidades: [
      {
        nombre: "Sesion",
        estereotipo: "«entity»",
        atributos: ["id: UUID", "inicio: DateTime", "vigente: Boolean"],
      },
      {
        nombre: "Usuario",
        estereotipo: "«entity»",
        atributos: ["nombreUsuario: String", "rol: Rol", "activo: Boolean"],
      },
      {
        nombre: "Empleado",
        estereotipo: "«entity»",
        atributos: ["legajo: String", "apellidoNombre: String", "cargo: String"],
      },
      {
        nombre: "ComisionMedica",
        estereotipo: "«entity»",
        atributos: ["numero: Integer", "denominacion: String", "domicilio: String"],
      },
    ],
  },
  {
    titulo: "Contenido del bolsín",
    descripcion: "Bolsín → Remitos → Documentación",
    entidades: [
      {
        nombre: "Bolsin",
        estereotipo: "«aggregate root»",
        atributos: ["numero: String", "precinto: String", "estado: EstadoBolsin"],
      },
      {
        nombre: "Remito",
        estereotipo: "«entity»",
        atributos: ["numero: String", "fechaEmision: Date", "emisor: String"],
      },
      {
        nombre: "Documentacion",
        estereotipo: "«entity»",
        atributos: ["asunto: String", "folios: Integer", "observaciones: String"],
      },
    ],
  },
  {
    titulo: "Clasificación documental",
    descripcion: "Documentación → Tipo de documento · Estado",
    entidades: [
      {
        nombre: "Documentacion",
        estereotipo: "«entity»",
        atributos: ["asunto: String", "folios: Integer"],
      },
      {
        nombre: "TipoDocumento",
        estereotipo: "«value object»",
        atributos: ["codigo: String", "descripcion: String"],
      },
      {
        nombre: "Estado",
        estereotipo: "«value object»",
        atributos: ["nombre: String", "ambito: String", "vigenteDesde: Date"],
      },
    ],
  },
];

const capas = [
  { capa: "Frontend Web", detalle: "React · TanStack Router · Material Design 3" },
  { capa: "Controllers", detalle: "Adaptadores HTTP/JSON — validación de entrada" },
  { capa: "Gestores (casos de uso)", detalle: "GestorRecepcionBolsin, GestorSeguimiento" },
  { capa: "Entidades", detalle: "Bolsin, Remito, Documentacion, ComisionMedica" },
  { capa: "Repositorios", detalle: "Persistencia JDBC/JPA sobre PostgreSQL" },
];

function EntidadCard({ e }: { e: Entidad }) {
  return (
    <div className="w-full min-w-[220px] overflow-hidden rounded-xl border border-border bg-surface shadow-elevation-1">
      <div className="border-b border-border bg-primary-container/50 px-4 py-2.5">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{e.estereotipo}</p>
        <p className="text-sm font-semibold text-primary-container-foreground">{e.nombre}</p>
      </div>
      <ul className="space-y-1 px-4 py-3">
        {e.atributos.map((a) => (
          <li key={a} className="font-mono text-xs text-muted-foreground">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ModeloPage() {
  return (
    <AppLayout
      title="Modelo de dominio"
      subtitle="Entidades y relaciones inspiradas en Clean Architecture"
    >
      <div className="grid gap-6 xl:grid-cols-3">
        {cadenas.map((c) => (
          <Card key={c.titulo} className="rounded-xl shadow-elevation-1">
            <CardHeader>
              <CardTitle className="text-base">{c.titulo}</CardTitle>
              <CardDescription>{c.descripcion}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {c.entidades.map((e, i) => (
                <div key={e.nombre + i} className="space-y-2">
                  <EntidadCard e={e} />
                  {i < c.entidades.length - 1 && (
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <ArrowDown className="size-4" />
                      <span>1 … *</span>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 rounded-xl shadow-elevation-1">
        <CardHeader>
          <CardTitle className="text-base">Arquitectura de la solución</CardTitle>
          <CardDescription>
            Frontend web sobre backend Java en capas y base de datos relacional
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-5">
          {capas.map((c, i) => (
            <div
              key={c.capa}
              className="rounded-xl border border-border bg-surface-variant/60 p-4"
              style={{ opacity: 1 - i * 0.06 }}
            >
              <p className="text-sm font-semibold">{c.capa}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.detalle}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppLayout>
  );
}
