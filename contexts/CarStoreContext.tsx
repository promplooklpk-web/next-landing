"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Car } from "@/data/cars";
import {
  deleteCarBySlug,
  fetchCarsWithAutoSeed,
  insertCar,
  seedCarsToSupabase,
  updateCarBySlug,
} from "@/lib/cars-db";
import { generateSlug, statusToSold } from "@/lib/car-store";
import { isSupabaseConfigured, SUPABASE_CONFIG_ERROR } from "@/lib/supabase";

interface CarStoreContextValue {
  cars: Car[];
  ready: boolean;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getCar: (slug: string) => Car | undefined;
  addCar: (car: Car) => Promise<void>;
  updateCar: (slug: string, car: Car) => Promise<void>;
  deleteCar: (slug: string) => Promise<void>;
  seedToSupabase: () => Promise<void>;
}

const CarStoreContext = createContext<CarStoreContextValue | null>(null);

export function CarStoreProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError(SUPABASE_CONFIG_ERROR);
      setCars([]);
      setLoading(false);
      setReady(true);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchCarsWithAutoSeed();
      setCars(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "โหลดข้อมูลรถไม่สำเร็จ";
      setError(message);
    } finally {
      setLoading(false);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getCar = useCallback(
    (slug: string) => cars.find((c) => c.slug === slug),
    [cars]
  );

  const addCar = useCallback(async (car: Car) => {
    const slug = car.slug || generateSlug(car.brand, car.model, car.year);
    const entry: Car = {
      ...car,
      slug,
      sold: statusToSold(car.status),
    };
    const saved = await insertCar(entry);
    setCars((prev) => [saved, ...prev.filter((c) => c.slug !== saved.slug)]);
  }, []);

  const updateCar = useCallback(async (slug: string, car: Car) => {
    const entry: Car = {
      ...car,
      slug: car.slug || slug,
      sold: statusToSold(car.status),
    };
    const saved = await updateCarBySlug(slug, entry);
    setCars((prev) => prev.map((c) => (c.slug === slug ? saved : c)));
  }, []);

  const deleteCar = useCallback(async (slug: string) => {
    await deleteCarBySlug(slug);
    setCars((prev) => prev.filter((c) => c.slug !== slug));
  }, []);

  const seedToSupabase = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await seedCarsToSupabase();
      const data = await fetchCarsWithAutoSeed();
      setCars(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "เพิ่มข้อมูลตัวอย่างไม่สำเร็จ";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      cars,
      ready,
      loading,
      error,
      refresh,
      getCar,
      addCar,
      updateCar,
      deleteCar,
      seedToSupabase,
    }),
    [
      cars,
      ready,
      loading,
      error,
      refresh,
      getCar,
      addCar,
      updateCar,
      deleteCar,
      seedToSupabase,
    ]
  );

  return (
    <CarStoreContext.Provider value={value}>{children}</CarStoreContext.Provider>
  );
}

export function useCarStore() {
  const ctx = useContext(CarStoreContext);
  if (!ctx) throw new Error("useCarStore must be used within CarStoreProvider");
  return ctx;
}
