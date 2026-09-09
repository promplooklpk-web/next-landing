"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCarStore } from "@/contexts/CarStoreContext";
import { DashboardShell } from "../../components/dashboard/DashboardShell";
import { CarForm } from "../../components/dashboard/CarForm";
import { AppLink } from "../../components/AppLink";

function EditCarContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { getCar, ready } = useCarStore();

  if (!slug) {
    return <p className="text-sm text-muted">ไม่พบ slug รถ</p>;
  }

  if (!ready) {
    return <p className="text-sm text-muted">กำลังโหลด...</p>;
  }

  const car = getCar(slug);
  if (!car) {
    return (
      <p className="text-sm text-muted">
        ไม่พบรถ —{" "}
        <AppLink href="/dashboard/" className="underline">กลับแดชบอร์ด</AppLink>
      </p>
    );
  }

  return <CarForm mode="edit" initial={car} />;
}

export default function EditCarPage() {
  return (
    <DashboardShell title="แก้ไขรถ">
      <Suspense fallback={<p className="text-sm text-muted">กำลังโหลด...</p>}>
        <EditCarContent />
      </Suspense>
    </DashboardShell>
  );
}
