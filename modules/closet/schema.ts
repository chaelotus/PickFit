import { z } from "zod";

export const clothesSchema = z.object({
  // --- 필수 항목 ---
  image_url: z.string().url("이미지 주소가 올바르지 않습니다."),
  season: z.array(z.string()).min(1, "계절을 선택해 주세요."),
  tpo: z.array(z.string()).min(1, "TPO를 선택해 주세요."),
  category: z.array(z.string()).min(1, "카테고리를 선택해 주세요."),
  // --- 선택 항목 ---
  color: z.array(z.string()).optional(),
  brand: z.string().optional(),
  price: z.number().optional(),
  // 구매 정보
  purchaseInfo: z
    .object({
      date: z.string().optional(),
      // 가격 빈 문자열이 들어올수도, 숫자가 들어올수도
      price: z.string().or(z.number()).optional(),
      link: z
        .string()
        .url("올바른 URL 주소를 입력해주세요.")
        .or(z.literal(""))
        .optional(),
      product_code: z.string().optional(),
    })
    .optional(),
  memo: z.string().optional(),
});
