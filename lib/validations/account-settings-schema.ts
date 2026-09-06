import { z } from "zod";

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "現在のパスワードを入力してください"),
    newPassword: z
      .string()
      .min(8, "半角英数字を含む8文字以上で入力してください")
      .regex(/[a-zA-Z]/, "半角英数字を含む8文字以上で入力してください")
      .regex(/[0-9]/, "半角英数字を含む8文字以上で入力してください"),
    newPasswordConfirm: z.string().min(1, "確認のため新しいパスワードを再入力してください"),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "新しいパスワードが一致しません",
    path: ["newPasswordConfirm"],
  });

export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
