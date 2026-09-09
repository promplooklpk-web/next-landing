"use client";

import { brands, Transmission } from "@/data/cars";

export interface FilterState {
  brand: string;
  maxPrice: string;
  transmission: string;
  minYear: string;
}

interface CarFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}

const transmissions: Transmission[] = ["ออโต้", "เกียร์ธรรมดา"];

export function CarFilters({ filters, onChange, resultCount }: CarFiltersProps) {
  function update(key: keyof FilterState, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-navy">ตัวกรอง</h2>
        <span className="text-sm text-muted">พบ {resultCount} คัน</span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">ยี่ห้อ</label>
          <select
            value={filters.brand}
            onChange={(e) => update("brand", e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="">ทุกยี่ห้อ</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">ราคาสูงสุด</label>
          <select
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="">ไม่จำกัด</option>
            <option value="400000">ไม่เกิน ฿400,000</option>
            <option value="600000">ไม่เกิน ฿600,000</option>
            <option value="800000">ไม่เกิน ฿800,000</option>
            <option value="1000000">ไม่เกิน ฿1,000,000</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">เกียร์</label>
          <select
            value={filters.transmission}
            onChange={(e) => update("transmission", e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="">ทั้งหมด</option>
            {transmissions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">ปีตั้งแต่</label>
          <select
            value={filters.minYear}
            onChange={(e) => update("minYear", e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="">ทุกปี</option>
            <option value="2020">2020 ขึ้นไป</option>
            <option value="2018">2018 ขึ้นไป</option>
            <option value="2016">2016 ขึ้นไป</option>
          </select>
        </div>
      </div>
    </div>
  );
}
