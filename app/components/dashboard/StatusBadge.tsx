import { CarStatus } from "@/data/cars";

const styles: Record<CarStatus, string> = {
  ว่าง: "border-accent/40 bg-accent/10 text-accent",
  จอง: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  ขายแล้ว: "border-border bg-surface text-muted",
};

export function StatusBadge({ status }: { status: CarStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
