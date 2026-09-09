import { CarStatus } from "@/data/cars";

const styles: Record<CarStatus, string> = {
  ว่าง: "border-near-black/20 bg-white text-near-black",
  จอง: "border-border-dark bg-surface text-foreground",
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
