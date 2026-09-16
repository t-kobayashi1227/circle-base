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
    location: z.string().trim().min(1, "主な活動場所を入力してください"),
    locationAccess: z.string().trim().max(300, "300文字以内で入力してください").optional().default(""),
    scheduleFrequency: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
    scheduleTime: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
    memberCount: z.string().trim().max(50, "50文字以内で入力してください").optional().default(""),
    foundedAt: z.string().trim().max(50, "50文字以内で入力してください").optional().default(""),
    eventDate: z.string().trim(),
    description: z
      .string()
      .trim()
      .min(10, "10文字以上で入力してください")
      .max(500, "500文字以内で入力してください"),
  })
  .refine((data) => data.isCitywide || data.areaId.length > 0, {
    message: "エリアを選択するか、市内全域を選択してください",
    path: ["areaId"],
  })
  .refine((data) => data.type !== "one_time" || data.eventDate.length > 0, {
    message: "単発募集の場合は開催日を入力してください",
    path: ["eventDate"],
  })
  .refine((data) => data.scheduleFrequency.trim().length > 0, {
    message: "活動頻度を入力してください",
    path: ["scheduleFrequency"],
  });

export type CircleFormInput = z.input<typeof circleFormSchema>;

// 「メンバー募集」タブ専用のスキーマ。一言・求める方は募集種別を問わず表示するが、
// 募集対象・人数・参加費・申し込み方法は継続団体（ongoing）のみが対象。
export const circleRecruitFormSchema = z.object({
  recruitTagline: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
  requirements: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
  recruitTarget: z.string().trim().max(200, "200文字以内で入力してください").optional().default(""),
  recruitCapacity: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
  recruitCost: z.string().trim().max(200, "200文字以内で入力してください").optional().default(""),
  recruitHowToApply: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
});

export type CircleRecruitFormInput = z.input<typeof circleRecruitFormSchema>;

export const circleUpdatePostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "投稿内容を入力してください")
    .max(2000, "2000文字以内で入力してください"),
});

export type CircleUpdatePostInput = z.infer<typeof circleUpdatePostSchema>;

export const reportSchema = z.object({
  targetType: z.enum(["circle", "user"]),
  targetId: z.uuid(),
  reason: z.string().trim().min(1, "通報理由を入力してください").max(1000),
});

export type ReportInput = z.infer<typeof reportSchema>;
