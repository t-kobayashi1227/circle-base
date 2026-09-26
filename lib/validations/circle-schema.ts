import { z } from "zod";
import { activityDayOptions } from "@/lib/circle-form-options";

// 「メンバー募集」タブ専用のスキーマ。一言・求める方は募集種別を問わず表示するが、
// 募集対象・人数・参加費・申し込み方法はサークル（ongoing）のみが対象。
export const circleRecruitFormSchema = z.object({
  recruitTagline: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
  requirements: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
  recruitTarget: z.string().trim().max(200, "200文字以内で入力してください").optional().default(""),
  recruitCapacity: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
  recruitCost: z.string().trim().max(200, "200文字以内で入力してください").optional().default(""),
  recruitHowToApply: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
  paymentMethod: z.string().trim().max(200, "200文字以内で入力してください").optional().default(""),
});

export type CircleRecruitFormInput = z.input<typeof circleRecruitFormSchema>;

// 「メンバー募集」タブの編集用。会費を入力した場合は支払い方法も必須にする。
export const circleRecruitEditSchema = circleRecruitFormSchema.refine(
  (data) => !data.recruitCost || data.paymentMethod.length > 0,
  { message: "会費を入力した場合は支払い方法を入力してください", path: ["paymentMethod"] },
);

// 「主催者情報」タブに表示する、サークルの紹介文とは別の主催者からのメッセージ。
export const circleOwnerMessageSchema = z.object({
  ownerMessage: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
});

export type CircleOwnerMessageInput = z.input<typeof circleOwnerMessageSchema>;

// サークル作成・編集で共通利用するフォームスキーマ。
// DBの circles テーブル（supabase/migrations 参照）に1:1で対応する項目のみを扱う。
// 作成時は「メンバー募集」「主催者からのメッセージ」もあわせて入力できるよう、
// 両スキーマの項目をここに統合している（編集時はそれぞれ専用タブで扱う）。
// サークル（ongoing）とイベント（one_time）で必須項目・文字数上限が異なるため、
// 共通部分は緩い上限だけを持たせ、種別ごとのチェックは superRefine で行う。
// イベントの開始時刻・定員などは作成フォームでのみ入力するため、編集時（mode = "edit"）は必須にしない。
export function buildCircleFormSchema(mode: "create" | "edit") {
  return z
    .object({
      type: z.enum(["ongoing", "one_time"], { error: "サークルの種別を選択してください" }),
      status: z.enum(["published", "unpublished"]).optional().default("published"),
      name: z.string().trim().max(40, "40文字以内で入力してください"),
      tagline: z.string().trim().max(100, "100文字以内で入力してください"),
      categoryMajorId: z.string().min(1, "大カテゴリを選択してください"),
      categoryMinorId: z.string().min(1, "小カテゴリを選択してください"),
      isCitywide: z.boolean(),
      areaId: z.string(),
      location: z.string().trim(),
      locationAccess: z.string().trim().max(300, "300文字以内で入力してください").optional().default(""),
      scheduleFrequency: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
      scheduleTime: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
      memberCount: z.string().trim().max(50, "50文字以内で入力してください").optional().default(""),
      foundedAt: z.string().trim().max(50, "50文字以内で入力してください").optional().default(""),
      activityDays: z.array(z.enum(activityDayOptions)).optional().default([]),
      eventDate: z.string().trim(),
      eventStartTime: z.string().trim().optional().default(""),
      eventEndNote: z.string().trim().max(100, "100文字以内で入力してください").optional().default(""),
      applicationDeadline: z.string().trim().optional().default(""),
      belongings: z.string().trim().max(500, "500文字以内で入力してください").optional().default(""),
      description: z
        .string()
        .trim()
        .min(10, "10文字以上で入力してください")
        .max(1000, "1000文字以内で入力してください"),
      ...circleRecruitFormSchema.shape,
      ...circleOwnerMessageSchema.shape,
    })
    .refine((data) => data.isCitywide || data.areaId.length > 0, {
      message: "エリアを選択するか、市内全域を選択してください",
      path: ["areaId"],
    })
    .superRefine((data, ctx) => {
      const isEvent = data.type === "one_time";
      const issue = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });

      if (!data.name) issue("name", isEvent ? "イベント名を入力してください" : "サークル名を入力してください");
      if (!data.tagline) issue("tagline", isEvent ? "紹介文を入力してください" : "一言を入力してください");
      if (!data.location) issue("location", isEvent ? "開催場所を入力してください" : "主な活動場所を入力してください");

      if (!isEvent) {
        if (data.tagline.length > 60) issue("tagline", "60文字以内で入力してください");
        if (data.description.length > 500) issue("description", "500文字以内で入力してください");
        if (!data.scheduleFrequency) issue("scheduleFrequency", "活動頻度を入力してください");
        if (mode === "create" && data.recruitCost && !data.paymentMethod) {
          issue("paymentMethod", "会費を入力した場合は支払い方法を入力してください");
        }
        return;
      }

      if (!data.eventDate) issue("eventDate", "開催日を入力してください");
      if (mode === "edit") return;
      if (!data.eventStartTime) issue("eventStartTime", "開始時刻を入力してください");
      if (data.applicationDeadline && data.eventDate && data.applicationDeadline > data.eventDate) {
        issue("applicationDeadline", "応募締切は開催日以前の日付を選択してください");
      }
      if (!/^[1-9]\d{0,3}$/.test(data.recruitCapacity)) {
        issue("recruitCapacity", "募集人数を1以上の数字で入力してください");
      }
      if (data.recruitCost && !data.paymentMethod) {
        issue("paymentMethod", "参加費を入力した場合は支払い方法を入力してください");
      }
    });
}

export const circleFormSchema = buildCircleFormSchema("create");

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
