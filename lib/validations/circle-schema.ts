import { z } from "zod";

// 「メンバー募集」タブ専用のスキーマ。一言・求める方は募集種別を問わず表示するが、
// 募集対象・人数・参加費・申し込み方法はサークル（ongoing）のみが対象。
export const circleRecruitFormSchema = z.object({
  recruitTagline: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
  requirements: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
  recruitTarget: z.string().trim().max(200, "200文字以内で入力してください").optional().default(""),
  recruitCapacity: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
  recruitCost: z.string().trim().max(200, "200文字以内で入力してください").optional().default(""),
  recruitHowToApply: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
});

export type CircleRecruitFormInput = z.input<typeof circleRecruitFormSchema>;

// 「主催者情報」タブに表示する、サークルの紹介文とは別の主催者からのメッセージ。
export const circleOwnerMessageSchema = z.object({
  ownerMessage: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
});

export type CircleOwnerMessageInput = z.input<typeof circleOwnerMessageSchema>;

// サークル作成・編集で共通利用するフォームスキーマ。
// DBの circles テーブル（supabase/migrations 参照）に1:1で対応する項目のみを扱う。
// 作成時は「メンバー募集」「主催者からのメッセージ」もあわせて入力できるよう、
// 両スキーマの項目をここに統合している（編集時はそれぞれ専用タブで扱う）。
export const circleFormSchema = z
  .object({
    type: z.enum(["ongoing", "one_time"], { error: "サークルの種別を選択してください" }),
    status: z.enum(["published", "unpublished"]).optional().default("published"),
    name: z
      .string()
      .trim()
      .min(1, "サークル名を入力してください")
      .max(40, "40文字以内で入力してください"),
    tagline: z
      .string()
      .trim()
      .min(1, "一言を入力してください")
      .max(60, "60文字以内で入力してください"),
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
    ...circleRecruitFormSchema.shape,
    ...circleOwnerMessageSchema.shape,
  })
  .refine((data) => data.isCitywide || data.areaId.length > 0, {
    message: "エリアを選択するか、市内全域を選択してください",
    path: ["areaId"],
  })
  .refine((data) => data.type !== "one_time" || data.eventDate.length > 0, {
    message: "イベントの場合は開催日を入力してください",
    path: ["eventDate"],
  })
  .refine((data) => data.scheduleFrequency.trim().length > 0, {
    message: "活動頻度を入力してください",
    path: ["scheduleFrequency"],
  });

export type CircleFormInput = z.input<typeof circleFormSchema>;

// 「活動の様子」: 写真付きの活動報告。写真はフォーム側で必須チェックする。
export const circleActivityPostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "投稿内容を入力してください")
    .max(2000, "2000文字以内で入力してください"),
});

export type CircleActivityPostInput = z.infer<typeof circleActivityPostSchema>;

// 「メッセージ」: 次回の予定やお知らせ程度の、写真を伴わない短い連絡。
export const circleMessagePostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "タイトルを入力してください")
    .max(100, "100文字以内で入力してください"),
  content: z
    .string()
    .trim()
    .min(1, "本文を入力してください")
    .max(500, "500文字以内で入力してください"),
});

export type CircleMessagePostInput = z.infer<typeof circleMessagePostSchema>;

export const reportSchema = z.object({
  targetType: z.enum(["circle", "user"]),
  targetId: z.uuid(),
  reason: z.string().trim().min(1, "通報理由を入力してください").max(1000),
});

export type ReportInput = z.infer<typeof reportSchema>;
