import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Boxes,
  ChevronDown,
  FileStack,
  FileText,
  Gauge,
  Hospital,
  Inbox,
  Map,
  Menu,
  Network,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { usuarioActual } from "@/lib/bolsines-data";
import { cn } from "@/lib/utils";

const navPrincipal = [
  { to: "/dashboard", label: "Panel principal", icon: Gauge },
  { to: "/recepcion", label: "Registrar recepción", icon: Inbox },
] as const;

const navModulos = [
  { to: "/documentacion", label: "Documentación", icon: FileText },
  { to: "/remitos", label: "Remitos", icon: FileStack },
  { to: "/bolsines", label: "Bolsines", icon: Boxes },
  { to: "/comisiones", label: "Comisiones Médicas", icon: Hospital },
  { to: "/seguimiento", label: "Seguimiento", icon: Map },
  { to: "/reportes", label: "Reportes", icon: PieChart },
  { to: "/usuarios", label: "Usuarios", icon: Users },
  { to: "/configuracion", label: "Configuración", icon: Settings },
] as const;

const navModelo = [{ to: "/modelo", label: "Modelo de dominio", icon: Network }] as const;

function NavList({
  items,
  pathname,
  onNavigate,
}: {
  items: readonly { to: string; label: string; icon: typeof Gauge }[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-[18px] shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <Link to="/dashboard" onClick={onNavigate} className="flex items-center gap-3 px-2 py-1">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Boxes className="size-5" />
        </span>
        <span>
          <span className="block text-base font-semibold leading-tight">Bolsines</span>
          <span className="block text-xs text-muted-foreground">Comisiones Médicas</span>
        </span>
      </Link>

      <NavList items={navPrincipal} pathname={pathname} onNavigate={onNavigate} />
      <div>
        <p className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Módulos
        </p>
        <NavList items={navModulos} pathname={pathname} onNavigate={onNavigate} />
      </div>
      <div>
        <p className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Arquitectura
        </p>
        <NavList items={navModelo} pathname={pathname} onNavigate={onNavigate} />
      </div>

      <div className="mt-auto rounded-xl bg-surface-variant p-4 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Comisión activa</p>
        <p className="mt-1 leading-relaxed">{usuarioActual.comision}</p>
      </div>
    </div>
  );
}

export function AppLayout({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[272px] border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarBody pathname={pathname} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[272px] bg-sidebar shadow-elevation-3">
            <SidebarBody pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-[272px]">
        <header className="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur">
          <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </Button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-semibold sm:text-xl">{title}</h1>
              {subtitle && (
                <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
              )}
            </div>

            <div className="hidden items-center gap-2 md:flex">{actions}</div>

            <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
              <Bell className="size-5" />
              <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 justify-center rounded-full px-1 text-[10px]">
                3
              </Badge>
            </Button>

            <Separator orientation="vertical" className="hidden h-8 sm:block" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-full p-1 pr-2 transition-colors hover:bg-muted">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary-container text-primary-container-foreground text-xs font-semibold">
                      {usuarioActual.iniciales}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-left sm:block">
                    <span className="block text-sm font-medium leading-tight">
                      {usuarioActual.nombre}
                    </span>
                    <span className="block text-xs text-muted-foreground">{usuarioActual.rol}</span>
                  </span>
                  <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">{usuarioActual.nombre}</p>
                  <p className="text-xs font-normal text-muted-foreground">{usuarioActual.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Legajo {usuarioActual.legajo}</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/configuracion">Preferencias</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/">Cerrar sesión</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
