"use client";

import { useEffect, useState } from "react";
import AccordionSelectedField from "../components/AccordionSelectedField";
import Accordion from "../../../shared/ui/accordion/Accordion";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { fetchCodeMap, insertClothes } from "@/modules/closet/api";
import { CodeOption } from "@/modules/closet/type";
import MultiSelectChipGroup from "@/shared/ui/chip/MultiSelectChipGroup";
import { clothesSchema } from "@/modules/closet/schema";

type MainCategory = "TOP" | "BOTTOM" | "SHOES" | "ACCESSORY" | null;

const ClothesUpload = () => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      season: selectedMap.season,
      tpo: selectedMap.tpo,
      category: selectedMap.category,
      color: selectedMap.color,
      brand,
      purchaseInfo,
      memo,
    };
    // zod 검증
    const result = clothesSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as string;
        if (!newErrors[fieldName]) newErrors[fieldName] = err.message;
      });
      setFormErrors(newErrors);

      // 에러가 있는 첫 번째 위치로 스크롤
      const firstErrorField = result.error.issues[0].path[0];
      const element = document.getElementById(
        `field-${firstErrorField.toString()}`,
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setFormErrors({});
    console.log("Supabase Data", result.data);
    // 폼 저장
    // insert
    insertClothes(result.data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <div className="">img</div> */}
        <AccordionSelectedField
          id="season"
          title={"계절"}
          items={codeMap.season}
          selected={selectedMap.season}
          error={formErrors.season}
          isOpen={openSection.season}
          onToggle={() => handleToggleSection("season")}
          onSelect={(item) => handleSelectItem("season", item)}
        />
        <AccordionSelectedField
          id="tpo"
          title={"TPO"}
          items={codeMap.tpo}
          selected={selectedMap.tpo}
          error={formErrors.tpo}
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
        <div id="field-category" className="flex flex-col gap-1 mb-4">
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
          {formErrors.category && (
            <p className="text-red-500 text-xs px-1 font-medium animate-in fade-in duration-300">
              {formErrors.category}
            </p>
          )}
        </div>

        <AccordionSelectedField
          id="color"
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
          <textarea
            className="w-full h-[100px] rounded border px-3 py-2"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력해주세요."
          ></textarea>
        </Accordion>
        <Button value={"저장"} w={"full"} color={"black"} type="submit" />
      </form>
    </div>
  );
};

export default ClothesUpload;
