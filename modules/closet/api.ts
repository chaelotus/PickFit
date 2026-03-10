import { createClient } from "@/shared/lib/supabase/client";

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
