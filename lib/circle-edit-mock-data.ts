// サークル編集ページの表示イメージ確認用モックデータ・選択肢。
// 実データ接続時は Supabase の circles テーブル取得・更新に置き換える。

export const activityTagOptions = [
  "登山・ハイキング",
  "キャンプ",
  "ランニング",
  "ヨガ・ピラティス",
  "音楽・ライブ",
  "料理・グルメ",
  "スポーツ観戦",
  "読書・カフェ",
  "写真・カメラ",
  "ボードゲーム",
  "その他",
];

export const dayOptions = ["平日", "土日", "祝日"];

export const recruitingStatusOptions = [
  { id: "recruiting", label: "募集中" },
  { id: "closed", label: "募集を締め切る" },
];

export const visibilityOptions = [
  { id: "public" as const, label: "公開", note: "すべてのユーザーに公開されます" },
  { id: "private" as const, label: "非公開", note: "招待されたユーザーのみ参加できます" },
];

export const defaultCircleEditValues = {
  name: "新潟山歩きの会",
  categoryId: "outdoor-mountain",
  areaId: "nishikan-ku",
  location: "角田山・弥彦山・五頭山 など",
  description:
    "新潟の山々を中心に、月1〜2回のペースで登山やハイキングを楽しんでいます！初心者の方も大歓迎です。自然の中でリフレッシュしましょう😊",
  activityTags: ["登山・ハイキング", "キャンプ", "写真・カメラ"],
  frequency: "monthly-1-2",
  days: ["土日"],
  recruitingStatus: "recruiting",
  recruitingNote: "初心者の方も大歓迎です！一緒に自然を楽しみましょう🌿",
  visibility: "public" as const,
};
