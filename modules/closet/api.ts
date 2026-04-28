import { createClient } from "@/shared/lib/supabase/client";
import {
  ClothesFormValues,
  ClothesInsertRow,
  CodeMap,
  CodeOption,
} from "./type";

const supabase = createClient();

export const fetchClothes = async () => {
  return await supabase
    .from("clothes")
    .select(`*,created_at::date`)
    .order("created_at", { ascending: false });
};

// 옷 item 등록
export const insertClothes = async (formData: ClothesFormValues) => {
  const payload: ClothesInsertRow = {
    category: formData.category.join(","), // 배열을 콤마로 연결해서 저장
    tpo: formData.tpo.join(","),
    season: formData.season.join(","),
    color: formData.color?.join(",") || "",
    brand: formData.brand,
    price: Number(formData.purchaseInfo?.price) || 0,
    purchase_date: formData.purchaseInfo?.date || null,
    purchase_link: formData.purchaseInfo?.link,
    item_code: formData.purchaseInfo?.product_code,
    memo: formData.memo,
  };
  return await supabase.from("clothes").insert(payload);
};

// code_tbl에서 필요한 code들을 모두 가져와서 code_id를 key로, code_name을 value로 하는 객체로 반환하는 함수
export const fetchCodeMap = async () => {
  const { data, error } = await supabase
    .from("code_tbl")
    .select("code_id, p_id, code_name, disp_order,intro")
    .in("p_id", [
      "SEASON",
      "TPO",
      "CATEGORY_TOP",
      "CATEGORY_BOTTOM",
      "CATEGORY_SHOES",
      "CATEGORY_ACCESSORY",
      "COLOR",
    ])
    .order("disp_order", { ascending: true });

  if (error) {
    console.log(error);
    return;
  }

  const initialmap: CodeMap = {
    season: [],
    tpo: [],
    category_top: [],
    category_bottom: [],
    category_shoes: [],
    category_accessory: [],
    color: [],
  };

  const grouped = (data ?? []).reduce((acc, item) => {
    const key = item.p_id.toLowerCase() as keyof CodeMap;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item as CodeOption);
    return acc;
  }, initialmap);

  return grouped;
};
