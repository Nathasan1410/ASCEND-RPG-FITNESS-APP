import { createClient } from "./client";

export async function uploadProof(
  file: File,
  userId: string,
  logId: string,
  type: "photo" | "video" | "rank-exam"
): Promise<string> {
  const supabase = createClient();
  
  const bucket = "proof-media";
  const folder = type === "rank-exam" ? "rank-exams" : type === "video" ? "videos" : "photos";
  const extension = file.name.split(".").pop();
  const path = `${folder}/${userId}/${logId}.${extension}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });
    
  if (error) throw error;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
    
  return publicUrl;
}
