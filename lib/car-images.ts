import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const BUCKET = "car-images";

function assertClient() {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }
  return supabase;
}

export function getPublicImageUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}

function extensionForFile(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]+$/.test(fromName)) return fromName;
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  return "jpg";
}

export async function uploadCarImage(slug: string, file: File): Promise<string> {
  const client = assertClient();
  const ext = extensionForFile(file);
  const path = `${slug}/${crypto.randomUUID()}.${ext}`;

  const { error } = await client.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type || `image/${ext}`,
  });

  if (error) throw error;
  return getPublicImageUrl(path);
}

export async function uploadCarImages(slug: string, files: File[]): Promise<string[]> {
  return Promise.all(files.map((file) => uploadCarImage(slug, file)));
}
