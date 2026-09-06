import { z } from "zod";

export const contactSchema = z.object({
  type: z.string().min(1, "お問い合わせの種類を選択してください"),
  subject: z.string().trim().min(1, "件名を入力してください").max(100),
  message: z
    .string()
    .trim()
    .min(1, "お問い合わせ内容を入力してください")
    .max(1000, "1000文字以内で入力してください"),
  email: z
    .string()
    .trim()
    .min(1, "連絡先メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),
});

export type ContactInput = z.infer<typeof contactSchema>;
