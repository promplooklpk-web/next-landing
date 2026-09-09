import { Car, cars as seedCars, getCarBySlug } from "@/data/cars";
import { CarRow, rowToCar } from "@/lib/cars-db";

let buildCarsCache: Promise<Car[]> | null = null;

async function fetchCarsFromSupabase(): Promise<Car[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("[build] Supabase env missing — using seed cars only");
    return seedCars;
  }

  try {
    const response = await fetch(
      `${url}/rest/v1/cars?select=*&order=created_at.desc`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Supabase HTTP ${response.status}`);
    }

    const rows = (await response.json()) as CarRow[];
    if (!Array.isArray(rows) || rows.length === 0) {
      console.warn("[build] Supabase returned no cars — using seed cars only");
      return seedCars;
    }

    return rows.map(rowToCar);
  } catch (error) {
    console.warn(
      "[build] Supabase fetch failed — using seed cars only:",
      error instanceof Error ? error.message : error
    );
    return seedCars;
  }
}

/** Cached Supabase inventory for the current build (falls back to seed). */
export function fetchCarsAtBuild(): Promise<Car[]> {
  if (!buildCarsCache) {
    buildCarsCache = fetchCarsFromSupabase();
  }
  return buildCarsCache;
}

/** All slugs to pre-render: union of seed + Supabase. */
export async function getBuildCarSlugs(): Promise<string[]> {
  const dbCars = await fetchCarsAtBuild();
  const slugs = new Set<string>();
  for (const car of seedCars) slugs.add(car.slug);
  for (const car of dbCars) slugs.add(car.slug);
  return [...slugs];
}

/** Resolve car for static generation — prefer Supabase over seed. */
export async function resolveCarAtBuild(slug: string): Promise<Car | undefined> {
  const dbCars = await fetchCarsAtBuild();
  const fromDb = dbCars.find((car) => car.slug === slug);
  if (fromDb) return fromDb;
  return getCarBySlug(slug);
}
