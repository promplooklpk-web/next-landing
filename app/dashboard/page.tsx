"use client";

import { useState } from "react";
import { useCarStore } from "@/contexts/CarStoreContext";
import { formatPrice } from "@/data/cars";
import { carDetailPath, dashboardEditPath } from "@/lib/car-routes";
import { AppLink } from "../components/AppLink";
import { DashboardShell } from "../components/dashboard/DashboardShell";
import { StatusBadge } from "../components/dashboard/StatusBadge";

const actionBtn =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-4 text-sm font-medium transition";

export default function DashboardPage() {
  const { cars, ready, loading, error, deleteCar, seedToSupabase, refresh } =
    useCarStore();
  const [seeding, setSeeding] = useState(false);

  const addButton = (
    <AppLink
      href="/dashboard/new/"
      className={`${actionBtn} shrink-0 bg-near-black text-white hover:bg-near-black-hover`}
    >
      + เพิ่มรถ
    </AppLink>
  );

  async function handleDelete(slug: string, name: string) {
    if (!window.confirm(`ลบรถ "${name}" ใช่หรือไม่?`)) return;
    try {
      await deleteCar(slug);
    } catch (err) {
      alert(err instanceof Error ? err.message : "ลบรถไม่สำเร็จ");
    }
  }

  async function handleSeed() {
    if (!window.confirm("เพิ่มข้อมูลรถตัวอย่างลง Supabase?")) return;
    setSeeding(true);
    try {
      await seedToSupabase();
    } catch (err) {
      alert(err instanceof Error ? err.message : "เพิ่มข้อมูลตัวอย่างไม่สำเร็จ");
    } finally {
      setSeeding(false);
    }
  }

  if (!ready || loading) {
    return (
      <DashboardShell title="จัดการรถ" action={addButton}>
        <p className="text-sm text-muted">กำลังโหลดจาก Supabase...</p>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="จัดการรถ" action={addButton}>
      {error && (
        <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          <button
            type="button"
            onClick={() => refresh()}
            className="ml-3 underline"
          >
            ลองอีกครั้ง
          </button>
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center justify-end gap-3 md:mb-6">
        <button
          type="button"
          onClick={handleSeed}
          disabled={seeding}
          className="min-h-[44px] px-2 text-xs text-muted underline hover:text-foreground disabled:opacity-50"
        >
          {seeding ? "กำลังเพิ่มข้อมูลตัวอย่าง..." : "เพิ่มข้อมูลตัวอย่าง"}
        </button>
      </div>

      {cars.length === 0 ? (
        <div className="border border-border bg-white px-6 py-16 text-center">
          <p className="text-sm text-muted">ยังไม่มีรถใน Supabase</p>
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="mt-4 min-h-[44px] bg-near-black px-6 py-2.5 text-sm text-white hover:bg-near-black-hover disabled:opacity-50"
          >
            เพิ่มข้อมูลตัวอย่าง
          </button>
        </div>
      ) : (
        <>
          {/* Mobile: stacked cards */}
          <ul className="space-y-4 md:hidden">
            {cars.map((car) => (
              <li
                key={car.slug}
                className="overflow-hidden border border-border bg-white"
              >
                <div className="flex gap-4 p-4">
                  <div className="h-20 w-28 shrink-0 overflow-hidden bg-surface">
                    {car.images[0] ? (
                      <img
                        src={car.images[0]}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted">
                        ไม่มีรูป
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium leading-snug">
                      {car.brand} {car.model}
                    </p>
                    <p className="mt-0.5 text-sm text-muted">ปี {car.year}</p>
                    <p className="mt-1 text-sm font-medium">
                      ฿{formatPrice(car.price)}
                    </p>
                    <div className="mt-2">
                      <StatusBadge status={car.status} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 border-t border-border p-3">
                  <AppLink
                    href={carDetailPath(car.slug)}
                    className={`${actionBtn} border border-border bg-white text-foreground hover:bg-surface`}
                  >
                    ดู
                  </AppLink>
                  <AppLink
                    href={dashboardEditPath(car.slug)}
                    className={`${actionBtn} border border-border-dark bg-white text-foreground hover:bg-surface`}
                  >
                    แก้ไข
                  </AppLink>
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(car.slug, `${car.brand} ${car.model}`)
                    }
                    className={`${actionBtn} border border-red-200 bg-white text-red-600 hover:bg-red-50`}
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop: table */}
          <div className="hidden border border-border bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs text-muted">
                <tr>
                  <th className="px-4 py-3">รูป</th>
                  <th className="px-4 py-3">รถ</th>
                  <th className="px-4 py-3">ราคา</th>
                  <th className="px-4 py-3">สถานะ</th>
                  <th className="px-4 py-3 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.slug} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      {car.images[0] ? (
                        <img
                          src={car.images[0]}
                          alt=""
                          className="h-12 w-16 object-cover"
                        />
                      ) : (
                        <span className="text-xs text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{car.brand} {car.model}</p>
                      <p className="text-xs text-muted">ปี {car.year}</p>
                    </td>
                    <td className="px-4 py-3">฿{formatPrice(car.price)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={car.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AppLink
                        href={carDetailPath(car.slug)}
                        className="mr-3 text-muted hover:text-foreground"
                      >
                        ดู
                      </AppLink>
                      <AppLink
                        href={dashboardEditPath(car.slug)}
                        className="mr-3 text-muted hover:text-foreground"
                      >
                        แก้ไข
                      </AppLink>
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(car.slug, `${car.brand} ${car.model}`)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </DashboardShell>
  );
}
