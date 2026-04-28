import { ClothesInsertRow } from "@/modules/closet/type";

interface ClothesCardProps {
  item: ClothesInsertRow;
}

const ClothesCard = ({ item }: ClothesCardProps) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* 사진 영역 (임시 목업) */}
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        사진 영역
      </div>

      {/* 정보 영역 */}
      <div className="p-3 flex flex-col gap-1">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {item.brand || "브랜드 없음"}
        </p>
        <p className="text-xs text-gray-500">{item.created_at}</p>
      </div>
    </div>
  );
};

export default ClothesCard;
