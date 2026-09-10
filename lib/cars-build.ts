import { Car, cars as seedCars, getCarBySlug } from "@/data/cars";
import { CarRow, rowToCar } from "@/lib/cars-db";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase-env";
import { BUILD_TIME_CAR_SLUGS } from "@/lib/static-car-slugs";

let buildCarsCache: Promise<Car[]> | null = null;

async function fetchCarsFromSupabase(): Promise<Car[]> {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

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

/** Slugs with pre-rendered HTML at build time (from prebuild script). */
export { BUILD_TIME_CAR_SLUGS, isStaticCarSlug } from "@/lib/static-car-slugs";

/** All slugs to pre-render — matches BUILD_TIME_CAR_SLUGS from prebuild. */
export async function getBuildCarSlugs(): Promise<string[]> {
  return [...BUILD_TIME_CAR_SLUGS];
}

/** Resolve car for static generation — prefer Supabase over seed. */
export async function resolveCarAtBuild(slug: string): Promise<Car | undefined> {
  const dbCars = await fetchCarsAtBuild();
  const fromDb = dbCars.find((car) => car.slug === slug);
  if (fromDb) return fromDb;
  return getCarBySlug(slug);
}
