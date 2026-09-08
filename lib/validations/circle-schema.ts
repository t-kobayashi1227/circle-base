import { z } from "zod";

// サークル作成・編集で共通利用するフォームスキーマ。
// DBの circles テーブル（supabase/migrations 参照）に1:1で対応する項目のみを扱う。
export const circleFormSchema = z
  .object({
    type: z.enum(["ongoing", "one_time"], { error: "サークルの種別を選択してください" }),
    name: z
      .string()
      .trim()
      .min(1, "サークル名を入力してください")
      .max(40, "40文字以内で入力してください"),
    categoryMajorId: z.string().min(1, "大カテゴリを選択してください"),
    categoryMinorId: z.string().min(1, "小カテゴリを選択してください"),
    isCitywide: z.boolean(),
    areaId: z.string(),
    location: z.string().trim().min(1, "活動場所・行き先を入力してください"),
    schedule: z.string().trim().min(1, "活動頻度・時間を入力してください"),
    eventDate: z.string().trim(),
    description: z
      .string()
      .trim()
      .min(10, "10文字以上で入力してください")
      .max(500, "500文字以内で入力してください"),
    requirements: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
  })
  .refine((data) => data.isCitywide || data.areaId.length > 0, {
    message: "エリアを選択するか、市内全域を選択してください",
    path: ["areaId"],
  })
  .refine((data) => data.type !== "one_time" || data.eventDate.length > 0, {
    message: "単発募集の場合は開催日を入力してください",
    path: ["eventDate"],
  });

export type CircleFormInput = z.input<typeof circleFormSchema>;

export const circleUpdatePostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "活動内容を入力してください")
    .max(2000, "2000文字以内で入力してください"),
});

export type CircleUpdatePostInput = z.infer<typeof circleUpdatePostSchema>;

export const reportSchema = z.object({
  targetType: z.enum(["circle", "user"]),
  targetId: z.uuid(),
  reason: z.string().trim().min(1, "通報理由を入力してください").max(1000),
});

export type ReportInput = z.infer<typeof reportSchema>;
