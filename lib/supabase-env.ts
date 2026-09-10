import supabaseDefaults from "./supabase-public.json";

export const DEFAULT_SUPABASE_URL = supabaseDefaults.url;
export const DEFAULT_SUPABASE_ANON_KEY = supabaseDefaults.anonKey;

/** Resolve Supabase URL — env override, then baked public default */
export function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
}

/** Resolve anon key — env override, then baked public default */
export function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
}
