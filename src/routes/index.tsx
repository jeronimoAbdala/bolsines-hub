import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Boxes, Lock, ShieldCheck, User } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ingreso — Bolsines | Comisiones Médicas" },
      {
        name: "description",
        content:
          "Acceso al sistema Bolsines para la gestión de envío y recepción de bolsines de documentación entre Comisiones Médicas.",
      },
      { property: "og:title", content: "Ingreso — Bolsines | Comisiones Médicas" },
      {
        property: "og:description",
        content: "Acceso al sistema de gestión de bolsines entre Comisiones Médicas.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("lfernandez");
  const [clave, setClave] = useState("••••••••");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full bg-primary-container blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -right-32 size-[460px] rounded-full bg-accent blur-3xl"
      />

      <div className="relative grid w-full max-w-5xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-elevation-1">
            <ShieldCheck className="size-4 text-primary" />
            Sistema interno — acceso autorizado
          </span>
          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight">
            Gestión de bolsines entre Comisiones Médicas
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Registre el envío y la recepción de bolsines, controle precintos, remitos y
            documentación asociada, y siga en tiempo real el traslado entre sedes.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "Comisiones", v: "36" },
              { k: "Bolsines/mes", v: "1.240" },
              { k: "Trazabilidad", v: "100%" },
            ].map((s) => (
              <div key={s.k} className="surface-card px-4 py-3">
                <dt className="text-xs text-muted-foreground">{s.k}</dt>
                <dd className="mt-1 text-xl font-semibold text-primary">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="surface-card mx-auto w-full max-w-md p-8 shadow-elevation-3">
          <div className="flex flex-col items-center text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Boxes className="size-7" />
            </span>
            <h1 className="mt-4 text-2xl font-semibold">Bolsines</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingrese sus credenciales institucionales
            </p>
          </div>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="usuario"
                  className="pl-9"
                  autoComplete="username"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="nombre.apellido"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clave">Contraseña</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="clave"
                  type="password"
                  className="pl-9"
                  autoComplete="current-password"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <Checkbox defaultChecked /> Mantener sesión
              </label>
              <a href="#" className="font-medium text-primary hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full">
              Iniciar sesión
            </Button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
            El uso de este sistema queda registrado en la auditoría institucional.
          </p>
        </div>
      </div>
    </div>
  );
}
