"use client";

import { use } from "react";
import { useCarStore } from "@/contexts/CarStoreContext";
import { DashboardShell } from "../../../components/dashboard/DashboardShell";
import { CarForm } from "../../../components/dashboard/CarForm";
import { AppLink } from "../../../components/AppLink";

export function EditCarBySlugClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getCar, ready } = useCarStore();

  if (!ready) {
    return (
      <DashboardShell title="แก้ไขรถ">
        <p className="text-sm text-muted">กำลังโหลด...</p>
      </DashboardShell>
    );
  }

  const car = getCar(slug);
  if (!car) {
    return (
      <DashboardShell title="แก้ไขรถ">
        <p className="text-sm text-muted">
          ไม่พบรถ —{" "}
          <AppLink href="/dashboard/" className="underline">กลับแดชบอร์ด</AppLink>
        </p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="แก้ไขรถ">
      <CarForm mode="edit" initial={car} />
    </DashboardShell>
  );
}
