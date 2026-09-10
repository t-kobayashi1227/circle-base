import { z } from "zod";

function calculateAge(birthdate: Date, today = new Date()): number {
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age -= 1;
  }
  return age;
}

export const signupSchema = z
  .object({
    realName: z.string().trim().min(1, "実名を入力してください").max(100),
    displayName: z.string().trim().min(1, "表示名を入力してください").max(50),
    email: z.string().trim().email("メールアドレスの形式が正しくありません"),
    password: z.string().min(8, "パスワードは8文字以上で入力してください"),
    birthdate: z.string().min(1, "生年月日を入力してください"),
    guardianConsent: z.boolean(),
  })
  .refine(
    (data) => calculateAge(new Date(data.birthdate)) >= 18 || data.guardianConsent,
    {
      message: "18歳未満の場合は保護者の同意が必要です",
      path: ["guardianConsent"],
    },
  );

export type SignupInput = z.infer<typeof signupSchema>;

export function isMinor(birthdate: Date): boolean {
  return calculateAge(birthdate) < 18;
}

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください")
    .email("メールアドレスの形式が正しくありません"),
  password: z.string().min(1, "パスワードを入力してください"),
  remember: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const profileUpdateSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "ニックネームを入力してください")
    .max(20, "20文字以内で入力してください"),
  gender: z.string(),
  ageRange: z.string(),
  area: z.string().min(1, "お住まいのエリアを選択してください"),
  bio: z
    .string()
    .trim()
    .min(1, "自己紹介を入力してください")
    .max(200, "200文字以内で入力してください"),
  interests: z.array(z.string()).min(1, "趣味・関心を1つ以上選択してください"),
  visibility: z.enum(["public", "members", "private"]),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
