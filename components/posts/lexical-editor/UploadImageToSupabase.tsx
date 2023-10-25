import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabaseClient";

export const uploadImageToSupabase = async (
  file: File | null,
  bucketName: string,
  folderName?: string
): Promise<string | null> => {
  if (!file) {
    console.error("No file provided");
    return null;
  }

  try {
    const fileExtension = file.name.split(".").pop();
    const prefix = folderName && folderName.trim() ? `${folderName}/` : "";
    const uniqueFileName = `${prefix}image_${uuidv4()}.${fileExtension}`;
    console.log(uniqueFileName);

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFileName, file, { contentType: file.type });

    if (error) {
      console.error("File upload error:", error.message);
      return null;
    } else {
      console.log("File uploaded successfully:", uniqueFileName);
      const projectUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
      return `${projectUrl}/storage/v1/object/public/${bucketName}/${uniqueFileName}`;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    return null;
  }
};
