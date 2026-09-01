import { createFileRoute } from "@tanstack/react-router";
import { Download, PackageX, Send, ShuffleIcon, TruckIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { distribucionEstados, porComision, serieMensual } from "@/lib/bolsines-data";

export const Route = createFileRoute("/reportes")({
  head: () => ({
    meta: [
      { title: "Reportes operativos — Bolsines" },
      {
        name: "description",
        content:
          "Indicadores de bolsines en tránsito, recibidos, documentación rechazada y redirigida, con gráficos de línea, barras y torta.",
      },
      { property: "og:title", content: "Reportes operativos — Bolsines" },
      {
        property: "og:description",
        content: "Indicadores y gráficos de la operación de bolsines entre Comisiones Médicas.",
      },
    ],
  }),
  component: ReportesPage,
});

const tarjetas = [
  { label: "Bolsines en tránsito", valor: "24", detalle: "6 con demora estimada", icon: TruckIcon },
  { label: "Bolsines recibidos", valor: "191", detalle: "Acumulado del mes", icon: Send },
  {
    label: "Documentación rechazada",
    valor: "12",
    detalle: "3 por faltante de folios",
    icon: PackageX,
  },
  {
    label: "Documentación redirigida",
    valor: "9",
    detalle: "Derivada a áreas competentes",
    icon: ShuffleIcon,
  },
];

const colores = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  fontSize: 12,
};

function ReportesPage() {
  return (
    <AppLayout
      title="Reportes"
      subtitle="Indicadores de gestión — período agosto/septiembre 2026"
      actions={
        <Button variant="outline" className="rounded-full">
          <Download className="size-4" /> Exportar PDF
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tarjetas.map((t) => (
          <Card key={t.label} className="rounded-xl shadow-elevation-1">
            <CardContent className="flex items-start gap-4 pt-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-container text-primary-container-foreground">
                <t.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{t.label}</p>
                <p className="text-2xl font-semibold tracking-tight">{t.valor}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.detalle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card className="rounded-xl shadow-elevation-1 xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Evolución mensual</CardTitle>
            <CardDescription>Bolsines enviados y recibidos</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={serieMensual} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="enviados"
                  name="Enviados"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="recibidos"
                  name="Recibidos"
                  stroke="var(--color-chart-3)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-base">Bolsines por comisión</CardTitle>
            <CardDescription>Volumen procesado en el mes</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={porComision} margin={{ left: -18, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="comision" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                <Bar
                  dataKey="bolsines"
                  name="Bolsines"
                  fill="var(--color-chart-1)"
                  radius={[8, 8, 0, 0]}
                  barSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-elevation-1">
          <CardHeader>
            <CardTitle className="text-base">Distribución por estado</CardTitle>
            <CardDescription>Participación sobre el total gestionado</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Pie
                  data={distribucionEstados}
                  dataKey="valor"
                  nameKey="estado"
                  innerRadius={62}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {distribucionEstados.map((_, i) => (
                    <Cell key={i} fill={colores[i % colores.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
