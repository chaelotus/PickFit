"use client";

import { useEffect, useState } from "react";
import ClothesCard from "./components/ClothesCard";
import { fetchClothes } from "@/modules/closet/api";
import { ClothesInsertRow } from "@/modules/closet/type";

const ClothesList = () => {
  const [clothes, setClothes] = useState<ClothesInsertRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const clothes = await fetchClothes();
      console.log("clothes", clothes);
      setClothes(clothes.data || []);
    };
    load();
  }, []);

  return (
    <div className="">
      {/* 모바일 기준 3열 그리드 적용 (grid-cols-3) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {clothes.map((item) => (
          <ClothesCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ClothesList;
