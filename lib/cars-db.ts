import { Car, CarStatus, FuelType, Transmission, cars as seedCars } from "@/data/cars";
import { generateSlug, statusToSold } from "@/lib/car-store";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface CarRow {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuel: string;
  color: string;
  engine: string;
  description: string;
  highlights: string;
  features: string[];
  images: string[];
  status: CarStatus;
  sold: boolean;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

function assertClient() {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }
  return supabase;
}

export function rowToCar(row: CarRow): Car {
  return {
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    year: row.year,
    price: row.price,
    mileage: row.mileage,
    transmission: row.transmission as Transmission,
    fuel: row.fuel as FuelType,
    color: row.color,
    engine: row.engine,
    description: row.description ?? "",
    highlights: row.highlights ?? "",
    features: row.features ?? [],
    images: row.images ?? [],
    status: row.status,
    sold: row.sold,
    featured: row.featured,
  };
}

export function carToRow(car: Car): Omit<CarRow, "id" | "created_at" | "updated_at"> {
  const slug = car.slug || generateSlug(car.brand, car.model, car.year);
  const sold = statusToSold(car.status);
  return {
    slug,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    transmission: car.transmission,
    fuel: car.fuel,
    color: car.color,
    engine: car.engine,
    description: car.description,
    highlights: car.highlights,
    features: car.features,
    images: car.images,
    status: car.status,
    sold,
    featured: car.featured,
  };
}

export async function fetchAllCars(): Promise<Car[]> {
  const client = assertClient();
  const { data, error } = await client
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as CarRow[]).map(rowToCar);
}

export async function fetchCarBySlug(slug: string): Promise<Car | null> {
  const client = assertClient();
  const { data, error } = await client
    .from("cars")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToCar(data as CarRow) : null;
}

export async function insertCar(car: Car): Promise<Car> {
  const client = assertClient();
  const row = carToRow(car);
  const { data, error } = await client
    .from("cars")
    .insert(row)
    .select()
    .single();

  if (error) throw error;
  return rowToCar(data as CarRow);
}

export async function updateCarBySlug(slug: string, car: Car): Promise<Car> {
  const client = assertClient();
  const row = carToRow({ ...car, slug: car.slug || slug });
  const { data, error } = await client
    .from("cars")
    .update(row)
    .eq("slug", slug)
    .select()
    .single();

  if (error) throw error;
  return rowToCar(data as CarRow);
}

export async function deleteCarBySlug(slug: string): Promise<void> {
  const client = assertClient();
  const { error } = await client.from("cars").delete().eq("slug", slug);
  if (error) throw error;
}

export async function seedCarsToSupabase(): Promise<number> {
  const client = assertClient();
  const rows = seedCars.map(carToRow);
  const { data, error } = await client
    .from("cars")
    .upsert(rows, { onConflict: "slug" })
    .select("slug");

  if (error) throw error;
  return data?.length ?? rows.length;
}

export async function fetchCarsWithAutoSeed(): Promise<Car[]> {
  const cars = await fetchAllCars();
  if (cars.length === 0) {
    await seedCarsToSupabase();
    return fetchAllCars();
  }
  return cars;
}
