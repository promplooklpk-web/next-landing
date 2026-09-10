import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured =
  supabaseUrl.length > 0 && supabaseAnonKey.length > 0;

/** Shown when NEXT_PUBLIC_* Supabase vars were not set at build time */
export const SUPABASE_CONFIG_ERROR =
  "ไม่พบการตั้งค่า Supabase — ตั้ง NEXT_PUBLIC_SUPABASE_URL และ NEXT_PUBLIC_SUPABASE_ANON_KEY " +
  "ใน Cloudflare Pages (Settings → Environment variables → Build) หรือ GitHub Actions แล้ว deploy ใหม่ " +
  "(ค่า NEXT_PUBLIC จะถูก bake ตอน build เท่านั้น)";

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
