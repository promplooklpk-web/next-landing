"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppLink } from "../../components/AppLink";
import { useCarStore } from "@/contexts/CarStoreContext";
import { getCarBySlug } from "@/data/cars";
import { CarDetailView } from "../../components/CarDetailView";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { MobileFloatingCTA } from "../../components/MobileFloatingCTA";

function CarViewContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const { getCar, ready } = useCarStore();

  if (!slug) {
    return (
      <main className="px-6 py-24 text-center">
        <p className="text-muted">ไม่พบรถ</p>
        <AppLink href="#cars" className="mt-4 inline-block text-sm underline">
          กลับหน้ารถในร้าน
        </AppLink>
      </main>
    );
  }

  const staticCar = getCarBySlug(slug);
  const car = ready ? (getCar(slug) ?? staticCar) : staticCar;

  if (!car) {
    return (
      <main className="px-6 py-24 text-center">
        <p className="text-muted">ไม่พบรถที่ต้องการ</p>
        <AppLink href="#cars" className="mt-4 inline-block text-sm underline">
          กลับหน้ารถในร้าน
        </AppLink>
      </main>
    );
  }

  return (
    <main className="pt-12 md:pt-14">
      <CarDetailView car={car} />
    </main>
  );
}

export default function CarViewPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="px-6 py-24 text-center text-sm text-muted">
            กำลังโหลด...
          </main>
        }
      >
        <CarViewContent />
      </Suspense>
      <Footer />
      <MobileFloatingCTA />
    </>
  );
}
