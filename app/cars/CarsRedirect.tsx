"use client";

import { useEffect } from "react";
import { BASE_PATH } from "@/lib/site";

export function CarsRedirect() {
  useEffect(() => {
    window.location.replace(`${BASE_PATH}/#cars`);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <p className="text-muted">
        กำลังนำทางไปหน้ารถในร้าน…{" "}
        <a href="/#cars" className="text-accent hover:underline">
          คลิกที่นี่
        </a>
      </p>
    </main>
  );
}
