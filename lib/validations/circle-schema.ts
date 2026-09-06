import { z } from "zod";

export const circleSchema = z
  .object({
    name: z.string().trim().min(1, "サークル名を入力してください").max(100),
    type: z.enum(["ongoing", "one_time"]),
    eventDate: z.coerce.date().optional(),
    categoryId: z.uuid("カテゴリを選択してください"),
    areaId: z.uuid("エリアを選択してください"),
    description: z.string().trim().min(1, "紹介文を入力してください"),
    requirements: z.string().trim().optional().default(""),
    schedule: z.string().trim().optional().default(""),
    location: z.string().trim().optional().default(""),
  })
  .refine((data) => data.type !== "one_time" || data.eventDate !== undefined, {
    message: "単発募集の場合は開催日を入力してください",
    path: ["eventDate"],
  });

export type CircleInput = z.infer<typeof circleSchema>;

// サークル作成ウィザード ステップ1（基本情報）用スキーマ。
// カテゴリ・エリアは実データ接続前のためUUID形式を強制せず、選択肢のidをそのまま使う。
export const circleStep1Schema = z
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
    frequency: z.string().min(1, "頻度を選択してください"),
    timeSlots: z.array(z.string()),
    timeSlotsOther: z.string().trim(),
  })
  .refine((data) => data.isCitywide || data.areaId.length > 0, {
    message: "エリアを選択するか、市内全域を選択してください",
    path: ["areaId"],
  })
  .refine((data) => data.timeSlots.length > 0 || data.timeSlotsOther.length > 0, {
    message: "活動時間を1つ以上選択するか、自由記述を入力してください",
    path: ["timeSlots"],
  });

export type CircleStep1Input = z.infer<typeof circleStep1Schema>;

export const circleUpdateSchema = z.object({
  content: z.string().trim().min(1, "内容を入力してください"),
  imagePath: z.string().trim().optional(),
});

export type CircleUpdateInput = z.infer<typeof circleUpdateSchema>;

// 活動の様子投稿ウィザード ステップ1（内容入力）用スキーマ。
export const activityPostStep1Schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "活動のタイトルを入力してください")
    .max(40, "40文字以内で入力してください"),
  category: z.string().min(1, "カテゴリを選択してください"),
  activityDate: z.string().min(1, "活動日を入力してください"),
  body: z
    .string()
    .trim()
    .min(1, "活動内容を入力してください")
    .max(2000, "2000文字以内で入力してください"),
  visibility: z.enum(["members", "public"], { error: "公開範囲を選択してください" }),
});

export type ActivityPostStep1Input = z.infer<typeof activityPostStep1Schema>;

// サークル編集フォーム用スキーマ。
export const circleEditSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "サークル名を入力してください")
    .max(20, "20文字以内で入力してください"),
  categoryId: z.string().min(1, "カテゴリを選択してください"),
  areaId: z.string().min(1, "活動エリアを選択してください"),
  location: z.string().trim().max(30, "30文字以内で入力してください"),
  description: z
    .string()
    .trim()
    .min(10, "10文字以上で入力してください")
    .max(500, "500文字以内で入力してください"),
  activityTags: z.array(z.string()),
  frequency: z.string().min(1, "活動頻度を選択してください"),
  days: z.array(z.string()).min(1, "主な活動日を1つ以上選択してください"),
  recruitingStatus: z.string().min(1, "メンバー募集の状態を選択してください"),
  recruitingNote: z.string().trim().max(30, "30文字以内で入力してください"),
  visibility: z.enum(["public", "private"]),
});

export type CircleEditInput = z.infer<typeof circleEditSchema>;

export const reportSchema = z.object({
  targetType: z.enum(["circle", "user"]),
  targetId: z.uuid(),
  reason: z.string().trim().min(1, "通報理由を入力してください").max(1000),
});

export type ReportInput = z.infer<typeof reportSchema>;
