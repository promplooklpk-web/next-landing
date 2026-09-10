"use client";

import { useEffect } from "react";
import { homeHash } from "@/lib/navigation";

export function CarsRedirect() {
  useEffect(() => {
    window.location.replace(homeHash("cars"));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <p className="text-muted">
        กำลังนำทางไปหน้ารถในร้าน…{" "}
        <a href={homeHash("cars")} className="text-accent hover:underline">
          คลิกที่นี่
        </a>
      </p>
    </main>
  );
}
