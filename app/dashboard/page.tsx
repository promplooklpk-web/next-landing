"use client";

import { useCarStore } from "@/contexts/CarStoreContext";
import { formatPrice } from "@/data/cars";
import { carDetailPath, dashboardEditPath } from "@/lib/car-routes";
import { AppLink } from "../components/AppLink";
import { DashboardShell } from "../components/dashboard/DashboardShell";
import { StatusBadge } from "../components/dashboard/StatusBadge";

const actionBtn =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-4 text-sm font-medium transition";

export default function DashboardPage() {
  const { cars, ready, deleteCar, resetToSeed } = useCarStore();

  const addButton = (
    <AppLink
      href="/dashboard/new/"
      className={`${actionBtn} shrink-0 bg-near-black text-white hover:bg-near-black-hover`}
    >
      + เพิ่มรถ
    </AppLink>
  );

  if (!ready) {
    return (
      <DashboardShell title="จัดการรถ" action={addButton}>
        <p className="text-sm text-muted">กำลังโหลด...</p>
      </DashboardShell>
    );
  }

  function handleDelete(slug: string, name: string) {
    if (window.confirm(`ลบรถ "${name}" ใช่หรือไม่?`)) {
      deleteCar(slug);
    }
  }

  return (
    <DashboardShell title="จัดการรถ" action={addButton}>
      <div className="mb-4 flex justify-end md:mb-6">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("รีเซ็ตข้อมูลเป็นค่าเริ่มต้น?")) resetToSeed();
          }}
          className="min-h-[44px] px-2 text-xs text-muted underline hover:text-foreground"
        >
          รีเซ็ตข้อมูล mock
        </button>
      </div>

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
    </DashboardShell>
  );
}
