"use client";

import { useEffect, useState } from "react";
import AccordionSelectedField from "../components/AccordionSelectedField";
import Accordion from "../../../shared/ui/accordion/Accordion";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { fetchCodeMap } from "@/modules/closet/api";
import { CodeOption } from "@/modules/closet/type";
import MultiSelectChipGroup from "@/shared/ui/chip/MultiSelectChipGroup";

type MainCategory = "TOP" | "BOTTOM" | "SHOES" | "ACCESSORY" | null;

const ClothesUpload = () => {
  const [mainCategory, setMainCategory] = useState<MainCategory>(null);
  const [selectedMap, setSelectedMap] = useState({
    season: [] as string[],
    tpo: [] as string[],
    category: [] as string[],
    color: [] as string[],
  });
  const [openSection, setOpenSection] = useState({
    season: false as boolean,
    tpo: false as boolean,
    category: false as boolean,
    color: false as boolean,
    brand: false as boolean,
    purchase: false as boolean,
    memo: false as boolean,
  });
  const [brand, setBrand] = useState("");
  const [memo, setMemo] = useState("");
  const [purchaseInfo, setPurchaseInfo] = useState({
    date: "" as string,
    price: "" as string | number,
    link: "" as string,
    product_code: "" as string,
  });

  const [codeMap, setCodeMap] = useState<{
    season: CodeOption[];
    tpo: CodeOption[];
    category_top: CodeOption[];
    category_bottom: CodeOption[];
    category_shoes: CodeOption[];
    category_accessory: CodeOption[];
    color: CodeOption[];
  }>({
    season: [],
    tpo: [],
    category_top: [],
    category_bottom: [],
    category_shoes: [],
    category_accessory: [],
    color: [],
  });

  type SectionField = keyof typeof openSection;
  type SelectField = keyof typeof selectedMap;

  const handleToggleSection = (section: SectionField) => {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSelectItem = (field: SelectField, item: string) => {
    setSelectedMap((prev) => {
      const current = prev[field];

      const next = current.includes(item)
        ? current.filter((el) => el !== item)
        : [...current, item];

      return {
        ...prev,
        [field]: next,
      };
    });
  };

  const handleMainCategoryClick = (category: MainCategory) => {
    setMainCategory(category);
    // 대분류가 바뀌면 이전에 선택했던 소분류(셔츠, 바지 등)는 초기화해주는 게 안전합니다.
    setSelectedMap((prev) => ({ ...prev, category: [] }));
  };

  useEffect(() => {
    const load = async () => {
      const grouped = await fetchCodeMap();
      if (grouped) {
        setCodeMap(grouped);
      }
    };
    load();
  }, []);

  // 대분류 칩에 표시할 데이터 (정적 데이터)
  const mainCategoryOptions = [
    { id: "TOP", name: "상의" },
    { id: "BOTTOM", name: "하의" },
    { id: "SHOES", name: "신발" },
    { id: "ACCESSORY", name: "악세사리" },
  ];
  return (
    <div>
      <div className="">img</div>
      <form action="">
        <AccordionSelectedField
          title={"계절"}
          items={codeMap.season}
          selected={selectedMap.season}
          isOpen={openSection.season}
          onToggle={() => handleToggleSection("season")}
          onSelect={(item) => handleSelectItem("season", item)}
        />
        <AccordionSelectedField
          title={"TPO"}
          items={codeMap.tpo}
          selected={selectedMap.tpo}
          isOpen={openSection.tpo}
          onToggle={() => handleToggleSection("tpo")}
          onSelect={(item) => handleSelectItem("tpo", item)}
        />
        {/* <AccordionSelectedField
          title={"카테고리"}
          items={codeMap.category_top}
          selected={selectedMap.category}
          isOpen={openSection.category}
          onToggle={() => handleToggleSection("category")}
          onSelect={(item) => handleSelectItem("category", item)}
        /> */}
        <Accordion
          title={"카테고리"}
          onClick={() => handleToggleSection("category")}
          selected={codeMap.category_top
            .concat(
              codeMap.category_bottom,
              codeMap.category_shoes,
              codeMap.category_accessory,
            )
            .filter((item) => selectedMap.category.includes(item.code_id))
            .map((item) => item.code_name)
            .join(",")}
          isOpen={openSection.category}
        >
          {/* 1단계 : 대분류 선택 */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">대분류 선택</p>
            <div className="flex gap-2 flex-wrap">
              {mainCategoryOptions.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    handleMainCategoryClick(cat.id as MainCategory)
                  }
                  className={`px-4 py1.5 rounded-full border text-sm ${mainCategory === cat.id ? "bg-black text-white" : "bg-white text-gray-600"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-4 border-gray-100" />
          {/* 단계 2: 소분류 선택 (대분류가 선택되었을 때만 노출) */}

          <div>
            <p className="text-xs text-gray-400 mb-2">상세 카테고리</p>
            {!mainCategory && (
              <p className="text-sm text-gray-300">
                대분류를 먼저 선택해주세요.
              </p>
            )}
            {mainCategory === "TOP" && (
              <MultiSelectChipGroup
                items={codeMap.category_top}
                selected={selectedMap.category}
                onClick={(id) => handleSelectItem("category", id)}
              />
            )}
            {mainCategory === "BOTTOM" && (
              <MultiSelectChipGroup
                items={codeMap.category_bottom}
                selected={selectedMap.category}
                onClick={(id) => handleSelectItem("category", id)}
              />
            )}
            {mainCategory === "SHOES" && (
              <MultiSelectChipGroup
                items={codeMap.category_shoes}
                selected={selectedMap.category}
                onClick={(id) => handleSelectItem("category", id)}
              />
            )}
            {mainCategory === "ACCESSORY" && (
              <MultiSelectChipGroup
                items={codeMap.category_accessory}
                selected={selectedMap.category}
                onClick={(id) => handleSelectItem("category", id)}
              />
            )}
          </div>
        </Accordion>
        <AccordionSelectedField
          title={"색상"}
          items={codeMap.color}
          selected={selectedMap.color}
          isOpen={openSection.color}
          onToggle={() => handleToggleSection("color")}
          onSelect={(item) => handleSelectItem("color", item)}
        />
        <Accordion
          title={"브랜드"}
          onClick={() => handleToggleSection("brand")}
          selected={brand}
          isOpen={openSection.brand}
        >
          <Input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="브랜드를 입력해주세요."
          />
        </Accordion>
        <Accordion
          title={"구매"}
          onClick={() => handleToggleSection("purchase")}
          selected={Object.values(purchaseInfo).filter(Boolean).join(",")}
          isOpen={openSection.purchase}
        >
          <Input
            value={purchaseInfo.price}
            onChange={(e) =>
              setPurchaseInfo((prev) => ({ ...prev, price: e.target.value }))
            }
            placeholder="가격"
          />
          <Input
            value={purchaseInfo.date}
            onChange={(e) =>
              setPurchaseInfo((prev) => ({ ...prev, date: e.target.value }))
            }
            placeholder="구매일"
          />
          <Input
            value={purchaseInfo.link}
            onChange={(e) =>
              setPurchaseInfo((prev) => ({
                ...prev,
                link: e.target.value,
              }))
            }
            placeholder="구매 링크"
          />

          <Input
            value={purchaseInfo.product_code}
            onChange={(e) =>
              setPurchaseInfo((prev) => ({
                ...prev,
                product_code: e.target.value,
              }))
            }
            placeholder="코드"
          />
        </Accordion>
        <Accordion
          title={"메모"}
          onClick={() => handleToggleSection("memo")}
          selected={memo}
          isOpen={openSection.memo}
        >
          <textarea className="w-full h-[100px] rounded border px-3 py-2"></textarea>
        </Accordion>
        <Button value={"저장"} w={"full"} color={"black"} />
      </form>
    </div>
  );
};

export default ClothesUpload;
