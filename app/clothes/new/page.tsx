"use client";

import { useEffect, useState } from "react";
import AccordionSelectedField from "../components/AccordionSelectedField";
import Accordion from "../../../shared/ui/accordion/Accordion";
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { fetchCodeMap } from "@/modules/closet/api";
import { CodeOption } from "@/modules/closet/type";

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

  const [codeMap, setCodeMap] = useState<{
    season: CodeOption[];
    tpo: CodeOption[];
    category_top: CodeOption[];
    category_bottom: CodeOption[];
    category_shoes: CodeOption[];
    category_accessory: CodeOption[];
  }>({
    season: [],
    tpo: [],
    category_top: [],
    category_bottom: [],
    category_shoes: [],
    category_accessory: [],
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

  useEffect(() => {
    const load = async () => {
      const grouped = await fetchCodeMap();
      if (grouped) {
        setCodeMap(grouped);
      }
    };
    load();
  }, []);

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
        <AccordionSelectedField
          title={"카테고리"}
          items={codeMap.category_top}
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
