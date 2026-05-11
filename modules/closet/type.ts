import { z } from "zod";
import { clothesSchema } from "./schema";
import { LucideIcon } from "lucide-react";

export type CodeOption = {
  code_id: string;
  p_id: string;
  code_name: string;
  disp_order: number;
  intro: string;
};
export type CodeMap = {
  season: CodeOption[];
  tpo: CodeOption[];
  category_top: CodeOption[];
  category_bottom: CodeOption[];
  category_shoes: CodeOption[];
  category_accessory: CodeOption[];
  color: CodeOption[];
};

export type ClothesFormValues = z.infer<typeof clothesSchema>;

// DB에 실제로 들어갈 타입
export interface ClothesInsertRow {
  id?: string | number;
  category: string;
  season: string;
  color: string;
  // image_url: string;
  tpo: string;
  brand?: string | null;
  price?: number | null;
  purchase_date?: string | null;
  purchase_link?: string | null;
  item_code?: string | null;
  memo?: string | null;
  created_at?: string;
}

export interface ImageSourceOptionProps {
  id?: string;
  icon: LucideIcon;
  label: string;
  type?: "file" | "button";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  capture?: "environment" | "user";
}
