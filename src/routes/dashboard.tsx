import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Inbox, Map, Plus } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppLayout } from "@/components/app-layout";
import { EstadoBadge } from "@/components/estado-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { actividadReciente, bolsines, estadisticas, serieMensual } from "@/lib/bolsines-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Panel principal — Bolsines" },
      {
        name: "description",
        content:
          "Panel de control con estadísticas de bolsines en tránsito, recepciones del día y actividad reciente entre Comisiones Médicas.",
      },
      { property: "og:title", content: "Panel principal — Bolsines" },
      {
        property: "og:description",
        content: "Estadísticas de bolsines en tránsito, recepciones y actividad reciente.",
      },
    ],
  }),
  component: DashboardPage,
});

const toneClass = {
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  primary: "bg-primary/10 text-primary",
} as const;

function DashboardPage() {
  return (
    <AppLayout
      title="Panel principal"
      subtitle="Resumen operativo del 1 de septiembre de 2026"
      actions={
        <>
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/seguimiento">
              <Map className="size-4" /> Seguimiento
            </Link>
          </Button>
          <Button className="rounded-full" asChild>
            <Link to="/recepcion">
              <Plus className="size-4" /> Registrar recepción
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {estadisticas.map((s) => (
          <Card key={s.label} className="rounded-xl shadow-elevation-1">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${toneClass[s.tone]}`}
                >
                  {s.delta}
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-xl shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-base">Circulación de bolsines</CardTitle>
            <CardDescription>Enviados vs. recibidos por mes</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={serieMensual} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="gEnv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="enviados"
                  name="Enviados"
                  stroke="var(--color-chart-1)"
                  fill="url(#gEnv)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="recibidos"
                  name="Recibidos"
                  stroke="var(--color-chart-3)"
                  fill="url(#gRec)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-base">Actividad reciente</CardTitle>
            <CardDescription>Últimos movimientos registrados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {actividadReciente.map((a) => (
              <div key={a.hora} className="flex gap-3">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm leading-snug">{a.texto}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Hoy {a.hora} h</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-xl shadow-elevation-1">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">Bolsines dirigidos a esta comisión</CardTitle>
            <CardDescription>Pendientes de recepción y en tránsito</CardDescription>
          </div>
          <Button variant="ghost" className="rounded-full" asChild>
            <Link to="/bolsines">
              Ver todos <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N.º de bolsín</TableHead>
                  <TableHead>Comisión de origen</TableHead>
                  <TableHead>Precinto</TableHead>
                  <TableHead>Salida</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bolsines.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.numero}</TableCell>
                    <TableCell className="text-muted-foreground">{b.comisionOrigen}</TableCell>
                    <TableCell className="font-mono text-xs">{b.precinto}</TableCell>
                    <TableCell className="text-muted-foreground">{b.salida}</TableCell>
                    <TableCell>
                      <EstadoBadge estado={b.estado} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="rounded-full" asChild>
                        <Link to="/recepcion">
                          <Inbox className="size-4" /> Recepcionar
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
