"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { brands } from "@/data/cars";

export function QuickSearch() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (maxPrice) params.set("maxPrice", maxPrice);
    const query = params.toString();
    router.push(`/cars/${query ? `?${query}` : ""}`);
  }

  return (
    <section className="relative z-10 -mt-8 mx-4 md:mx-auto md:max-w-4xl">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-lg md:flex-row md:items-end md:p-6"
      >
        <div className="flex-1">
          <label htmlFor="brand" className="mb-1 block text-xs font-medium text-muted">
            ยี่ห้อ
          </label>
          <select
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm"
          >
            <option value="">ทุกยี่ห้อ</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="maxPrice" className="mb-1 block text-xs font-medium text-muted">
            ราคาสูงสุด
          </label>
          <select
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm"
          >
            <option value="">ไม่จำกัด</option>
            <option value="400000">ไม่เกิน ฿400,000</option>
            <option value="600000">ไม่เกิน ฿600,000</option>
            <option value="800000">ไม่เกิน ฿800,000</option>
            <option value="1000000">ไม่เกิน ฿1,000,000</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light"
        >
          ค้นหารถ
        </button>
      </form>
    </section>
  );
}
