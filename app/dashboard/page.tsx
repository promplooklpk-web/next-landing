"use client";

import { useCarStore } from "@/contexts/CarStoreContext";
import { formatPrice } from "@/data/cars";
import { carDetailPath, dashboardEditPath } from "@/lib/car-routes";
import { AppLink } from "../components/AppLink";
import { DashboardShell } from "../components/dashboard/DashboardShell";

export default function DashboardPage() {
  const { cars, ready, deleteCar, resetToSeed } = useCarStore();

  if (!ready) {
    return (
      <DashboardShell title="จัดการรถ">
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
    <DashboardShell title="จัดการรถ">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <AppLink
          href="/dashboard/new/"
          className="bg-near-black px-5 py-2.5 text-sm text-white hover:bg-near-black-hover"
        >
          + เพิ่มรถ
        </AppLink>
        <button
          type="button"
          onClick={() => {
            if (window.confirm("รีเซ็ตข้อมูลเป็นค่าเริ่มต้น?")) resetToSeed();
          }}
          className="text-xs text-muted underline hover:text-foreground"
        >
          รีเซ็ตข้อมูล mock
        </button>
      </div>

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
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
                <td className="px-4 py-3">{car.status}</td>
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
