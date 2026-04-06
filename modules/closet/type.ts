export type ClosetRow = {
  id: number;
  created_at: string;
  updated_at: string;
  category: string;
  season: string;
  color: string;
  image_url: string;
  min_temp: number;
  max_temp: number;
};
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
