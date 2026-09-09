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
import { cars as seedCars } from "@/data/cars";
import { generateSlug, loadCars, saveCars, statusToSold } from "@/lib/car-store";

interface CarStoreContextValue {
  cars: Car[];
  ready: boolean;
  getCar: (slug: string) => Car | undefined;
  addCar: (car: Car) => void;
  updateCar: (slug: string, car: Car) => void;
  deleteCar: (slug: string) => void;
  resetToSeed: () => void;
}

const CarStoreContext = createContext<CarStoreContextValue | null>(null);

export function CarStoreProvider({ children }: { children: React.ReactNode }) {
  const [cars, setCars] = useState<Car[]>(seedCars);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCars(loadCars());
    setReady(true);
  }, []);

  const persist = useCallback((next: Car[]) => {
    setCars(next);
    saveCars(next);
  }, []);

  const getCar = useCallback(
    (slug: string) => cars.find((c) => c.slug === slug),
    [cars]
  );

  const addCar = useCallback(
    (car: Car) => {
      const slug =
        car.slug ||
        generateSlug(car.brand, car.model, car.year);
      const entry: Car = {
        ...car,
        slug,
        sold: statusToSold(car.status),
      };
      persist([...cars, entry]);
    },
    [cars, persist]
  );

  const updateCar = useCallback(
    (slug: string, car: Car) => {
      const entry: Car = {
        ...car,
        slug: car.slug || slug,
        sold: statusToSold(car.status),
      };
      persist(cars.map((c) => (c.slug === slug ? entry : c)));
    },
    [cars, persist]
  );

  const deleteCar = useCallback(
    (slug: string) => {
      persist(cars.filter((c) => c.slug !== slug));
    },
    [cars, persist]
  );

  const resetToSeed = useCallback(() => {
    persist([...seedCars]);
  }, [persist]);

  const value = useMemo(
    () => ({
      cars,
      ready,
      getCar,
      addCar,
      updateCar,
      deleteCar,
      resetToSeed,
    }),
    [cars, ready, getCar, addCar, updateCar, deleteCar, resetToSeed]
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
