"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Car,
  CarStatus,
  FuelType,
  Transmission,
} from "@/data/cars";
import { useCarStore } from "@/contexts/CarStoreContext";
import { emptyCar, generateSlug, statusToSold } from "@/lib/car-store";
import { appPath } from "@/lib/navigation";
import { AppLink } from "../AppLink";

const transmissions: Transmission[] = ["ออโต้", "เกียร์ธรรมดา"];
const fuels: FuelType[] = ["เบนซิน", "ดีเซล", "ไฮบริด"];
const statuses: CarStatus[] = ["ว่าง", "จอง", "ขายแล้ว"];

interface CarFormProps {
  initial?: Car;
  mode: "create" | "edit";
}

export function CarForm({ initial, mode }: CarFormProps) {
  const router = useRouter();
  const { addCar, updateCar } = useCarStore();
  const [form, setForm] = useState<Car>(
    initial ?? { ...emptyCar(), slug: "", features: [], images: [] } as Car
  );
  const [featuresText, setFeaturesText] = useState(
    initial?.features.join(", ") ?? ""
  );
  const [imageUrl, setImageUrl] = useState("");

  function update<K extends keyof Car>(key: K, value: Car[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setForm((f) => ({ ...f, images: [...f.images, reader.result as string] }));
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function addImageUrl() {
    const url = imageUrl.trim();
    if (!url) return;
    setForm((f) => ({ ...f, images: [...f.images, url] }));
    setImageUrl("");
  }

  function removeImage(i: number) {
    setForm((f) => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));
  }

  function moveImage(i: number, dir: -1 | 1) {
    const next = i + dir;
    if (next < 0 || next >= form.images.length) return;
    const imgs = [...form.images];
    [imgs[i], imgs[next]] = [imgs[next], imgs[i]];
    setForm((f) => ({ ...f, images: imgs }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const features = featuresText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const slug =
      form.slug ||
      generateSlug(form.brand, form.model, form.year);
    const car: Car = {
      ...form,
      slug,
      features,
      sold: statusToSold(form.status),
    };

    if (mode === "create") {
      addCar(car);
    } else if (initial) {
      updateCar(initial.slug, car);
    }
    router.push(appPath("/dashboard/"));
  }

  const inputClass =
    "w-full border border-border bg-white px-3 py-2 text-sm focus:border-near-black focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">ยี่ห้อ *</span>
          <input
            required
            className={`${inputClass} mt-1`}
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">รุ่น *</span>
          <input
            required
            className={`${inputClass} mt-1`}
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">ปี *</span>
          <input
            required
            type="number"
            className={`${inputClass} mt-1`}
            value={form.year}
            onChange={(e) => update("year", Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">ราคา (บาท) *</span>
          <input
            required
            type="number"
            className={`${inputClass} mt-1`}
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">เลขไมล์ *</span>
          <input
            required
            type="number"
            className={`${inputClass} mt-1`}
            value={form.mileage}
            onChange={(e) => update("mileage", Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">เกียร์</span>
          <select
            className={`${inputClass} mt-1`}
            value={form.transmission}
            onChange={(e) => update("transmission", e.target.value as Transmission)}
          >
            {transmissions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-muted">เชื้อเพลิง</span>
          <select
            className={`${inputClass} mt-1`}
            value={form.fuel}
            onChange={(e) => update("fuel", e.target.value as FuelType)}
          >
            {fuels.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-muted">สี</span>
          <input
            className={`${inputClass} mt-1`}
            value={form.color}
            onChange={(e) => update("color", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">เครื่องยนต์</span>
          <input
            className={`${inputClass} mt-1`}
            value={form.engine}
            onChange={(e) => update("engine", e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">สถานะ</span>
          <select
            className={`${inputClass} mt-1`}
            value={form.status}
            onChange={(e) => update("status", e.target.value as CarStatus)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
        />
        รถแนะนำ (featured)
      </label>

      <label className="block text-sm">
        <span className="text-muted">จุดเด่น</span>
        <input
          className={`${inputClass} mt-1`}
          value={form.highlights}
          onChange={(e) => update("highlights", e.target.value)}
        />
      </label>

      <label className="block text-sm">
        <span className="text-muted">รายละเอียด</span>
        <textarea
          rows={4}
          className={`${inputClass} mt-1`}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </label>

      <label className="block text-sm">
        <span className="text-muted">ฟีเจอร์ (คั่นด้วย comma)</span>
        <input
          className={`${inputClass} mt-1`}
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="กล้องมองหลัง, Apple CarPlay"
        />
      </label>

      <div className="border border-border p-4">
        <p className="text-sm font-medium">รูปภาพ</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {form.images.map((src, i) => (
            <div key={`${src.slice(0, 32)}-${i}`} className="relative">
              <img
                src={src}
                alt=""
                className="h-20 w-28 object-cover border border-border"
              />
              <div className="mt-1 flex gap-1">
                <button
                  type="button"
                  className="text-xs text-muted hover:text-foreground"
                  onClick={() => moveImage(i, -1)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="text-xs text-muted hover:text-foreground"
                  onClick={() => moveImage(i, 1)}
                >
                  →
                </button>
                <button
                  type="button"
                  className="text-xs text-red-600"
                  onClick={() => removeImage(i)}
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="text-sm"
          />
        </div>
        <div className="mt-3 flex gap-2">
          <input
            className={`${inputClass} flex-1`}
            placeholder="URL รูปภาพ"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={addImageUrl}
            className="border border-border-dark px-4 py-2 text-sm"
          >
            เพิ่ม URL
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-near-black px-6 py-2.5 text-sm text-white hover:bg-near-black-hover"
        >
          {mode === "create" ? "เพิ่มรถ" : "บันทึก"}
        </button>
        <AppLink
          href="/dashboard/"
          className="border border-border px-6 py-2.5 text-sm hover:bg-surface"
        >
          ยกเลิก
        </AppLink>
      </div>
    </form>
  );
}
