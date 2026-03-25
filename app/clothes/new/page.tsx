"use client";

import { useState } from "react";
import AccordionSelectedField from "../components/AccordionSelectedField";
import Accordion from "../../../shared/ui/accordion/Accordion";

const SEASON = ["봄", "여름", "가을", "겨울"];
const TPO = [
  "데일리",
  "직장",
  "데이트",
  "경조사",
  "여행",
  "홈웨어",
  "파티",
  "운동",
  "특별한날",
  "기타",
];
const CATEGORY = [
  "티셔츠",
  "긴팔티",
  "카라티",
  "셔츠",
  "맨투맨",
  "후드티",
  "니트",
  "가디건",
  "파자마",
  "기타",
];

const ClothesUpload = () => {
  const [selectedMap, setSelectedMap] = useState({
    season: [] as string[],
    tpo: [] as string[],
    category: [] as string[],
  });
  const [openSection, setOpenSection] = useState({
    season: false as boolean,
    tpo: false as boolean,
    category: false as boolean,
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
  return (
    <div>
      <div className="">img</div>
      <form action="">
        <AccordionSelectedField
          title={"계절"}
          items={SEASON}
          selected={selectedMap.season}
          isOpen={openSection.season}
          onToggle={() => handleToggleSection("season")}
          onSelect={(item) => handleSelectItem("season", item)}
        />
        <AccordionSelectedField
          title={"TPO"}
          items={TPO}
          selected={selectedMap.tpo}
          isOpen={openSection.tpo}
          onToggle={() => handleToggleSection("tpo")}
          onSelect={(item) => handleSelectItem("tpo", item)}
        />
        <AccordionSelectedField
          title={"카테고리"}
          items={CATEGORY}
          selected={selectedMap.category}
          isOpen={openSection.category}
          onToggle={() => handleToggleSection("category")}
          onSelect={(item) => handleSelectItem("category", item)}
        />
        <Accordion
          title={"브랜드"}
          onClick={() => handleToggleSection("brand")}
          selected={brand}
          isOpen={openSection.brand}
        >
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="브랜드를 입력해주세요."
          />
        </Accordion>
        <Accordion
          title={"구매"}
          onClick={() => handleToggleSection("purchase")}
          selected={Object.values(purchaseInfo).filter(Boolean).join(",")}
          isOpen={openSection.purchase}
        >
          <input
            value={purchaseInfo.price}
            onChange={(e) =>
              setPurchaseInfo((prev) => ({ ...prev, price: e.target.value }))
            }
            className="w-full rounded border px-3 py-2"
            placeholder="가격"
          />
          <input
            value={purchaseInfo.date}
            onChange={(e) =>
              setPurchaseInfo((prev) => ({ ...prev, date: e.target.value }))
            }
            className="w-full rounded border px-3 py-2"
            placeholder="구매일"
          />
          <input
            value={purchaseInfo.link}
            onChange={(e) =>
              setPurchaseInfo((prev) => ({ ...prev, link: e.target.value }))
            }
            className="w-full rounded border px-3 py-2"
            placeholder="구매 링크"
          />
          <input
            value={purchaseInfo.product_code}
            onChange={(e) =>
              setPurchaseInfo((prev) => ({
                ...prev,
                product_code: e.target.value,
              }))
            }
            className="w-full rounded border px-3 py-2"
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
      </form>
    </div>
  );
};

export default ClothesUpload;
