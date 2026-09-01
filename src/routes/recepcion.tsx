import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, PackageCheck, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppLayout } from "@/components/app-layout";
import { EstadoBadge } from "@/components/estado-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { bolsines, comisiones, usuarioActual } from "@/lib/bolsines-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recepcion")({
  head: () => ({
    meta: [
      { title: "Registrar recepción de bolsín — Bolsines" },
      {
        name: "description",
        content:
          "Búsqueda de bolsines enviados, verificación de precinto y contenido, y confirmación de la recepción en la Comisión Médica actual.",
      },
      { property: "og:title", content: "Registrar recepción de bolsín — Bolsines" },
      {
        property: "og:description",
        content: "Verifique precinto, remitos y documentación antes de confirmar la recepción.",
      },
    ],
  }),
  component: RecepcionPage,
});

const opciones = [
  {
    value: "conforme",
    titulo: "El contenido coincide con lo registrado",
    detalle: "Se confirma la totalidad de remitos y documentación declarada.",
  },
  {
    value: "faltante",
    titulo: "Falta documentación",
    detalle: "Se registrará un acta de faltante y se notificará a la comisión de origen.",
  },
  {
    value: "incorrecta",
    titulo: "Documentación incorrecta",
    detalle: "El contenido no corresponde al remito declarado.",
  },
  {
    value: "redirigir",
    titulo: "Redirigir documentación a otra área",
    detalle: "La documentación se deriva al área competente dentro de la comisión.",
  },
];

function RecepcionPage() {
  const navigate = useNavigate();
  const [precinto, setPrecinto] = useState("");
  const [origen, setOrigen] = useState("todas");
  const [seleccionado, setSeleccionado] = useState<string | null>("b1");
  const [expandido, setExpandido] = useState<string | null>("r1");
  const [opcion, setOpcion] = useState("conforme");
  const [observaciones, setObservaciones] = useState("");

  const resultados = bolsines.filter(
    (b) =>
      (origen === "todas" || b.comisionOrigen === origen) &&
      b.precinto.toLowerCase().includes(precinto.trim().toLowerCase()),
  );
  const bolsin = bolsines.find((b) => b.id === seleccionado) ?? null;

  return (
    <AppLayout
      title="Registrar recepción de bolsín"
      subtitle="Mesa de Entradas — verificación de precinto y contenido"
    >
      <div className="space-y-6">
        <Card className="rounded-xl shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-base">Comisión Médica actual</CardTitle>
            <CardDescription>Datos tomados de la sesión iniciada</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Comisión receptora</Label>
              <Input readOnly value={usuarioActual.comision} className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Agente responsable</Label>
              <Input readOnly value={usuarioActual.nombre} className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Legajo</Label>
              <Input readOnly value={usuarioActual.legajo} className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Fecha y hora de registro</Label>
              <Input readOnly value="01/09/2026 09:52" className="bg-muted" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-base">Buscar bolsines enviados</CardTitle>
            <CardDescription>Filtre por número de precinto o comisión de origen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-[1fr_1.4fr_auto] md:items-end">
              <div className="space-y-2">
                <Label htmlFor="precinto">Número de precinto</Label>
                <Input
                  id="precinto"
                  placeholder="PRC-884213"
                  value={precinto}
                  onChange={(e) => setPrecinto(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Comisión de origen</Label>
                <Select value={origen} onValueChange={setOrigen}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las comisiones" />
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
              <Button className="rounded-full md:mb-0.5">
                <Search className="size-4" /> Buscar
              </Button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N.º de bolsín</TableHead>
                    <TableHead>Comisión de origen</TableHead>
                    <TableHead>Comisión de destino</TableHead>
                    <TableHead>Precinto</TableHead>
                    <TableHead>Estado actual</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultados.map((b) => (
                    <TableRow
                      key={b.id}
                      className={cn(seleccionado === b.id && "bg-primary-container/40")}
                    >
                      <TableCell className="font-medium">{b.numero}</TableCell>
                      <TableCell className="text-muted-foreground">{b.comisionOrigen}</TableCell>
                      <TableCell className="text-muted-foreground">{b.comisionDestino}</TableCell>
                      <TableCell className="font-mono text-xs">{b.precinto}</TableCell>
                      <TableCell>
                        <EstadoBadge estado={b.estado} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={seleccionado === b.id ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => setSeleccionado(b.id)}
                        >
                          {seleccionado === b.id ? "Seleccionado" : "Seleccionar bolsín"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {resultados.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                        No se encontraron bolsines con los filtros aplicados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {bolsin && (
          <Card className="rounded-xl shadow-elevation-1">
            <CardHeader>
              <CardTitle className="text-base">Contenido del bolsín {bolsin.numero}</CardTitle>
              <CardDescription>
                Precinto {bolsin.precinto} · {bolsin.remitos.length} remito(s) ·{" "}
                {bolsin.remitos.reduce((a, r) => a + r.documentacion.length, 0)} documento(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {bolsin.remitos.map((r) => {
                const abierto = expandido === r.id;
                return (
                  <div key={r.id} className="overflow-hidden rounded-xl border border-border">
                    <button
                      className="flex w-full items-center gap-3 bg-surface-variant/60 px-4 py-3 text-left transition-colors hover:bg-surface-variant"
                      onClick={() => setExpandido(abierto ? null : r.id)}
                    >
                      <ChevronRight
                        className={cn(
                          "size-4 shrink-0 transition-transform",
                          abierto && "rotate-90",
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Remito {r.numero}</p>
                        <p className="text-xs text-muted-foreground">
                          {r.emisor} · {r.fecha}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {r.documentacion.length} documento(s)
                      </span>
                    </button>
                    {abierto && (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Asunto de la documentación</TableHead>
                            <TableHead>Tipo de documento</TableHead>
                            <TableHead>Estado actual</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {r.documentacion.map((d) => (
                            <TableRow key={d.id}>
                              <TableCell className="font-medium">{d.asunto}</TableCell>
                              <TableCell className="text-muted-foreground">{d.tipo}</TableCell>
                              <TableCell>
                                <EstadoBadge estado={d.estado} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                );
              })}

              <Separator className="my-2" />

              <div>
                <h3 className="text-sm font-semibold">Opciones de recepción</h3>
                <RadioGroup value={opcion} onValueChange={setOpcion} className="mt-3 grid gap-3">
                  {opciones.map((o) => (
                    <label
                      key={o.value}
                      htmlFor={o.value}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                        opcion === o.value
                          ? "border-primary bg-primary-container/40"
                          : "border-border hover:bg-muted",
                      )}
                    >
                      <RadioGroupItem id={o.value} value={o.value} className="mt-0.5" />
                      <span>
                        <span className="block text-sm font-medium">{o.titulo}</span>
                        <span className="block text-xs text-muted-foreground">{o.detalle}</span>
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="obs">Observaciones</Label>
                <Textarea
                  id="obs"
                  rows={3}
                  placeholder="Detalle cualquier novedad detectada durante la apertura del bolsín."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => navigate({ to: "/dashboard" })}
                >
                  <X className="size-4" /> Cancelar
                </Button>
                <Button
                  className="rounded-full"
                  onClick={() =>
                    toast.success(`Recepción registrada para ${bolsin.numero}`, {
                      description: opciones.find((o) => o.value === opcion)?.titulo,
                    })
                  }
                >
                  <Check className="size-4" /> Confirmar recepción
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!bolsin && (
          <div className="surface-card flex flex-col items-center gap-2 p-10 text-center">
            <PackageCheck className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Seleccione un bolsín para visualizar su contenido.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
