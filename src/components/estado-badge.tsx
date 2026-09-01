import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  "En tránsito": "bg-info/10 text-info border-info/25",
  Recibido: "bg-success/10 text-success border-success/25",
  Recibida: "bg-success/10 text-success border-success/25",
  "Pendiente de recepción": "bg-warning/15 text-warning-foreground border-warning/30",
  Pendiente: "bg-warning/15 text-warning-foreground border-warning/30",
  Observado: "bg-destructive/10 text-destructive border-destructive/25",
  Observada: "bg-destructive/10 text-destructive border-destructive/25",
  Redirigido: "bg-primary/10 text-primary border-primary/25",
  Registrada: "bg-muted text-muted-foreground border-border",
};

export function EstadoBadge({ estado, className }: { estado: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium",
        map[estado] ?? "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      {estado}
    </span>
  );
}
