import { createClient } from "@/shared/lib/supabase/client";
import { CodeMap, CodeOption } from "./type";

const supabase = createClient();

export const fetchClothes = async () => {
  return await supabase.from("clothes").select("*");
};

export const insertClothes = async (payload: {
  season: string;
  color: string;
  category: string;
}) => {
  return await supabase.from("clothes").insert(payload);
};

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
