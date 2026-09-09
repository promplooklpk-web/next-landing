"use client";

import { DashboardShell } from "../../components/dashboard/DashboardShell";
import { CarForm } from "../../components/dashboard/CarForm";

export default function NewCarPage() {
  return (
    <DashboardShell title="เพิ่มรถใหม่">
      <CarForm mode="create" />
    </DashboardShell>
  );
}
