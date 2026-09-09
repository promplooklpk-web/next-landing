"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    "mt-1.5 w-full min-h-[44px] border border-border bg-white px-4 py-3 text-base focus:border-near-black focus:outline-none md:text-sm md:min-h-0 md:py-2";

  const labelClass = "block text-sm";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl pb-28 md:pb-0">
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2 md:gap-4">
          <label className={labelClass}>
            <span className="text-muted">ยี่ห้อ *</span>
            <input
              required
              className={inputClass}
              value={form.brand}
              onChange={(e) => update("brand", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            <span className="text-muted">รุ่น *</span>
            <input
              required
              className={inputClass}
              value={form.model}
              onChange={(e) => update("model", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            <span className="text-muted">ปี *</span>
            <input
              required
              type="number"
              inputMode="numeric"
              className={inputClass}
              value={form.year}
              onChange={(e) => update("year", Number(e.target.value))}
            />
          </label>
          <label className={labelClass}>
            <span className="text-muted">ราคา (บาท) *</span>
            <input
              required
              type="number"
              inputMode="numeric"
              className={inputClass}
              value={form.price}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </label>
          <label className={labelClass}>
            <span className="text-muted">เลขไมล์ *</span>
            <input
              required
              type="number"
              inputMode="numeric"
              className={inputClass}
              value={form.mileage}
              onChange={(e) => update("mileage", Number(e.target.value))}
            />
          </label>
          <label className={labelClass}>
            <span className="text-muted">เกียร์</span>
            <select
              className={inputClass}
              value={form.transmission}
              onChange={(e) => update("transmission", e.target.value as Transmission)}
            >
              {transmissions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            <span className="text-muted">เชื้อเพลิง</span>
            <select
              className={inputClass}
              value={form.fuel}
              onChange={(e) => update("fuel", e.target.value as FuelType)}
            >
              {fuels.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            <span className="text-muted">สี</span>
            <input
              className={inputClass}
              value={form.color}
              onChange={(e) => update("color", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            <span className="text-muted">เครื่องยนต์</span>
            <input
              className={inputClass}
              value={form.engine}
              onChange={(e) => update("engine", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            <span className="text-muted">สถานะ</span>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => update("status", e.target.value as CarStatus)}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex min-h-[44px] items-center gap-3 text-sm">
          <input
            type="checkbox"
            className="h-5 w-5"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
          />
          รถแนะนำ (featured)
        </label>

        <label className={labelClass}>
          <span className="text-muted">จุดเด่น</span>
          <input
            className={inputClass}
            value={form.highlights}
            onChange={(e) => update("highlights", e.target.value)}
          />
        </label>

        <label className={labelClass}>
          <span className="text-muted">รายละเอียด</span>
          <textarea
            rows={4}
            className={`${inputClass} min-h-[120px] resize-y`}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </label>

        <label className={labelClass}>
          <span className="text-muted">ฟีเจอร์ (คั่นด้วย comma)</span>
          <input
            className={inputClass}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder="กล้องมองหลัง, Apple CarPlay"
          />
        </label>

        <div className="border border-border bg-white p-4 md:p-5">
          <p className="text-sm font-medium">รูปภาพ</p>

          {form.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {form.images.map((src, i) => (
                <div key={`${src.slice(0, 32)}-${i}`} className="overflow-hidden border border-border">
                  <img
                    src={src}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="grid grid-cols-3 gap-1 p-2">
                    <button
                      type="button"
                      className="min-h-[36px] text-xs text-muted hover:text-foreground"
                      onClick={() => moveImage(i, -1)}
                      aria-label="เลื่อนไปซ้าย"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="min-h-[36px] text-xs text-red-600 hover:text-red-800"
                      onClick={() => removeImage(i)}
                    >
                      ลบ
                    </button>
                    <button
                      type="button"
                      className="min-h-[36px] text-xs text-muted hover:text-foreground"
                      onClick={() => moveImage(i, 1)}
                      aria-label="เลื่อนไปขวา"
                    >
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 flex min-h-[88px] w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-border bg-surface px-4 py-6 text-sm text-muted transition hover:border-near-black hover:text-foreground"
          >
            <span className="text-2xl leading-none">+</span>
            <span>แตะเพื่ออัปโหลดรูปจากเครื่อง</span>
          </button>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              className={`${inputClass} mt-0 flex-1`}
              placeholder="หรือใส่ URL รูปภาพ"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              type="button"
              onClick={addImageUrl}
              className="min-h-[44px] shrink-0 border border-border-dark px-5 text-sm hover:bg-surface"
            >
              เพิ่ม URL
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 p-4 backdrop-blur-sm md:static md:mt-8 md:border-0 md:bg-transparent md:p-0">
        <div className="mx-auto flex max-w-2xl flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="submit"
            className="min-h-[48px] w-full bg-near-black px-6 py-3 text-base font-medium text-white hover:bg-near-black-hover md:w-auto md:text-sm"
          >
            {mode === "create" ? "เพิ่มรถ" : "บันทึก"}
          </button>
          <AppLink
            href="/dashboard/"
            className="flex min-h-[48px] w-full items-center justify-center border border-border px-6 py-3 text-base hover:bg-surface md:w-auto md:text-sm"
          >
            ยกเลิก
          </AppLink>
        </div>
      </div>
    </form>
  );
}
