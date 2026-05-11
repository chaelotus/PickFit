import { useState } from "react";
import { createClient } from "@/shared/lib/supabase/client";

export const useStorage = (bucketName: string) => {
  const [isUploading, setIsUploading] = useState(false);

  const supabase = createClient();

  const uploadImage = async (file: File, folder: string = "general") => {
    try {
      setIsUploading(true);

      // 1. 고유한 파일 이름 생성
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // 2. Supabase Storage에 파일 업로드
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. public URL 생성
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };
  return { uploadImage, isUploading };
};
