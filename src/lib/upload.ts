import { supabase, isSupabaseConfigured } from "./supabase";
import { dataUrlToBlob } from "./image";

const BUCKET = "product-images";

/**
 * Recebe um data URL e devolve a URL final da imagem.
 * - Com Supabase: faz upload no Storage e devolve a URL pública.
 * - Sem Supabase: devolve o próprio data URL (modo demonstração).
 */
export async function persistImage(dataUrl: string): Promise<string> {
  if (!isSupabaseConfigured || !supabase) return dataUrl;
  const blob = dataUrlToBlob(dataUrl);
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
    contentType: "image/jpeg",
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
