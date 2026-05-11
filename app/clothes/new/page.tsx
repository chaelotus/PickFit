"use client";

import { useStorage } from "@/shared/hooks/useStorage";
import { Camera, Image as ImageIcon, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageSourceOption from "../components/ImageSourceOption";
import { ImageSourceOptionProps } from "@/modules/closet/type";

const ImageUploadPage = () => {
  const router = useRouter();
  const { uploadImage, isUploading } = useStorage("clothes");

  const UPLOAD_OPTIONS: ImageSourceOptionProps[] = [
    { id: "album", icon: ImageIcon, label: "앨범에서 선택", type: "file" },
    {
      id: "camera",
      icon: Camera,
      label: "카메라로 촬영",
      type: "file",
      capture: "environment",
    },
    { id: "store", icon: ShoppingBag, label: "온라인 스토어", type: "button" },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const publicUrl = await uploadImage(file, "clothes");
      router.push(
        `/clothes/new/details?image=${encodeURIComponent(publicUrl)}`,
      );
    } catch (error) {
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleButtonClick = (id: string = "") => {
    if (id === "store") {
      console.log(
        "온라인 스토어에서 이미지 선택 기능은 아직 구현되지 않았습니다.",
      );
    }
  };
  return (
    <div className="flex flex-col gap-6 ">
      <header>
        <h1 className="text-2xl font-bold">사진 등록</h1>
        <p className="text-gray-500">옷의 사진을 먼저 등록해 주세요.</p>
      </header>

      <div className="grid grid-cols-2 gap-2">
        {UPLOAD_OPTIONS.map((option) => (
          <ImageSourceOption
            key={option.id}
            icon={option.icon}
            label={option.label}
            type={option.type}
            capture={option.capture}
            onChange={option.type == "file" ? handleFileChange : undefined}
            onClick={
              option.type == "button"
                ? () => handleButtonClick(option.id)
                : undefined
            }
          />
        ))}
      </div>

      {isUploading && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
          <p className="font-medium animate-pulse">
            이미지를 업로드 중입니다...
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPage;
