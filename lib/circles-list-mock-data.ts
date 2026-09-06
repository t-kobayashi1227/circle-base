// サークル一覧・検索結果ページの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の circles テーブルへのクエリ（フィルタ・並び替え・ページング）に置き換える。

export type BadgeKey = "recruit" | "beginner" | "visit" | "single";

export const badgeStyle: Record<BadgeKey, { label: string; bg: string; border: string; color: string }> = {
  recruit: { label: "メンバー募集中", bg: "#FDF3E4", border: "#F2E0C0", color: "#C07E1B" },
  beginner: { label: "初心者歓迎", bg: "#EEF7F1", border: "#C9E3D4", color: "#3E8E68" },
  visit: { label: "見学OK", bg: "#FDF6E3", border: "#EFE0B8", color: "#A5842B" },
  single: { label: "単発イベント", bg: "#EDF3F9", border: "#D3E2EF", color: "#4D6B8A" },
};

export interface ListCircle {
  id: string;
  badge: BadgeKey;
  name: string;
  meta: string;
  desc: string;
  members: string;
  freq: string;
  likes: number;
  photoCaption: string;
}

const meta = "中央区・登山・ハイキング";

export const listCircles: ListCircle[] = [
  { id: "c1", badge: "recruit", name: "新潟山歩きの会", meta, desc: "自然を楽しみ、仲間とつながる登山サークルです。", members: "28名", freq: "月2〜3回", likes: 24, photoCaption: "稜線を歩くメンバーの写真" },
  { id: "c2", badge: "beginner", name: "弥彦山ハイキングクラブ", meta, desc: "初心者でも安心！ゆるやかな山歩きを楽しんでいます。", members: "18名", freq: "月1回", likes: 16, photoCaption: "森の登山道の写真" },
  { id: "c3", badge: "visit", name: "下山後のランチ交流会", meta, desc: "登山の後は美味しいランチでわいわい交流しています♪", members: "15名", freq: "月1〜2回", likes: 20, photoCaption: "野外で食事をする写真" },
  { id: "c4", badge: "single", name: "春の角田山トレッキング", meta, desc: "初心者向けトレッキングイベント 一緒に絶景を楽しみましょう！", members: "12名", freq: "2024/5/25", likes: 18, photoCaption: "残雪の山並みの写真" },
  { id: "c5", badge: "beginner", name: "ゆる登山サークル", meta, desc: "体力に合わせてゆっくり登山を楽しむサークルです。", members: "22名", freq: "月2回", likes: 14, photoCaption: "朝焼けの山頂の写真" },
  { id: "c6", badge: "recruit", name: "五頭山ハイキング部", meta, desc: "五頭山を中心に、四季折々の自然を満喫しています。", members: "19名", freq: "月2〜3回", likes: 11, photoCaption: "青空と山並みの写真" },
  { id: "c7", badge: "beginner", name: "週末トレッキング同好会", meta, desc: "週末に気軽に参加できるトレッキングサークルです。", members: "31名", freq: "月1〜2回", likes: 27, photoCaption: "新緑の登山道の写真" },
  { id: "c8", badge: "visit", name: "栗島トレイルの会", meta, desc: "栗島の自然を楽しむトレッキングサークルです。", members: "16名", freq: "不定期", likes: 13, photoCaption: "海と島の風景写真" },
];

export const freqFilterOptions = ["週1回以上", "月2〜3回", "月1回以下", "不定期・単発"];

export const timeSlotFilterOptions = [
  { label: "平日（昼）", defaultChecked: false },
  { label: "平日（夜）", defaultChecked: false },
  { label: "土日（昼）", defaultChecked: true },
  { label: "土日（夜）", defaultChecked: false },
  { label: "その他", defaultChecked: false },
];

export const sortOptions = ["新着順", "更新日順", "メンバー数が多い順"];

export const activeFilterChips = ["中央区", "登山・ハイキング"];
