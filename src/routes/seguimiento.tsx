import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Clock, MapPin, Navigation, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppLayout } from "@/components/app-layout";
import { EstadoBadge } from "@/components/estado-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { bolsines, comisiones } from "@/lib/bolsines-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/seguimiento")({
  head: () => ({
    meta: [
      { title: "Seguimiento de bolsines — Bolsines" },
      {
        name: "description",
        content:
          "Mapa interactivo con la posición de los bolsines en tránsito, última actualización y notificación al responsable de destino.",
      },
      { property: "og:title", content: "Seguimiento de bolsines — Bolsines" },
      {
        property: "og:description",
        content: "Posición en tiempo real de los bolsines en tránsito entre Comisiones Médicas.",
      },
    ],
  }),
  component: SeguimientoPage,
});

function SeguimientoPage() {
  const [precinto, setPrecinto] = useState("");
  const [destino, setDestino] = useState("todas");
  const [activo, setActivo] = useState("b1");

  const visibles = bolsines.filter(
    (b) =>
      (destino === "todas" || b.comisionDestino === destino) &&
      b.precinto.toLowerCase().includes(precinto.trim().toLowerCase()),
  );
  const bolsin = bolsines.find((b) => b.id === activo) ?? bolsines[0]!;

  return (
    <AppLayout
      title="Seguimiento de bolsines"
      subtitle="Posición estimada de las unidades en tránsito"
    >
      <Card className="rounded-xl shadow-elevation-1">
        <CardContent className="grid gap-4 pt-6 md:grid-cols-[1fr_1.4fr_auto] md:items-end">
          <div className="space-y-2">
            <Label htmlFor="pre">Número de precinto</Label>
            <Input
              id="pre"
              placeholder="PRC-884213"
              value={precinto}
              onChange={(e) => setPrecinto(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Comisión de destino</Label>
            <Select value={destino} onValueChange={setDestino}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las comisiones</SelectItem>
                {comisiones.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="rounded-full">
            <Search className="size-4" /> Filtrar
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card className="overflow-hidden rounded-xl shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-base">Mapa de traslados</CardTitle>
            <CardDescription>
              {visibles.length} unidad(es) visibles · actualización cada 5 minutos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[420px] overflow-hidden rounded-xl border border-border bg-primary-container/30">
              <svg className="absolute inset-0 size-full" aria-hidden>
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="var(--color-border)"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <path
                  d="M 8% 88% C 30% 60%, 46% 52%, 78% 18%"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeDasharray="7 7"
                  opacity="0.5"
                />
                <path
                  d="M 12% 20% C 34% 40%, 52% 48%, 82% 74%"
                  fill="none"
                  stroke="var(--color-info)"
                  strokeWidth="2"
                  strokeDasharray="7 7"
                  opacity="0.4"
                />
              </svg>

              {visibles.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActivo(b.id)}
                  style={{ left: `${b.x}%`, top: `${b.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  aria-label={`Bolsín ${b.numero}`}
                >
                  <span
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-elevation-2 transition-transform",
                      activo === b.id
                        ? "scale-105 border-primary bg-primary text-primary-foreground"
                        : "border-border bg-surface text-foreground hover:scale-105",
                    )}
                  >
                    <MapPin className="size-3.5" />
                    {b.numero.slice(-6)}
                  </span>
                </button>
              ))}

              <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-3 py-1 text-[11px] text-muted-foreground shadow-elevation-1">
                Región Centro · Buenos Aires — Córdoba — Santa Fe
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-base">Detalle de la unidad</CardTitle>
            <CardDescription>Información del bolsín seleccionado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground">N.º de bolsín</p>
              <p className="text-lg font-semibold">{bolsin.numero}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{bolsin.precinto}</p>
            </div>
            <EstadoBadge estado={bolsin.estado} />
            <Separator />
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <Navigation className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Última posición</p>
                  <p>{bolsin.ultimaPosicion}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Hora de actualización</p>
                  <p>{bolsin.ultimaActualizacion}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Comisión de destino</p>
                  <p>{bolsin.comisionDestino}</p>
                  <p className="text-xs text-muted-foreground">
                    Responsable: {bolsin.responsableDestino}
                  </p>
                </div>
              </div>
            </div>
            <Button
              className="w-full rounded-full"
              onClick={() =>
                toast.success("Notificación enviada", {
                  description: `Se avisó al responsable de ${bolsin.comisionDestino}.`,
                })
              }
            >
              <BellRing className="size-4" /> Notificar al responsable de destino
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
