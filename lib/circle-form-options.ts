// サークル作成フォームの選択肢。
// 実データ接続時は Supabase の categories / areas テーブル取得に置き換える
// （supabase/migrations の初期スキーマ・supabase/seed.sql と対応させたモック）。

export const categoryOptions = [
  {
    id: "sports",
    label: "スポーツ系",
    children: [
      { id: "ball-sports", label: "球技（サッカー／フットサル／バスケ／バレー／テニス／卓球／野球など）" },
      { id: "martial-arts", label: "格闘技" },
      { id: "cycling", label: "サイクルスポーツ" },
      { id: "winter-sports", label: "ウインタースポーツ" },
      { id: "marine-sports", label: "マリンスポーツ" },
      { id: "running", label: "ランニング・マラソン" },
      { id: "outdoor-mountain", label: "アウトドア・登山" },
    ],
  },
  {
    id: "culture",
    label: "文化系",
    children: [
      { id: "board-games", label: "ボードゲーム・カードゲーム" },
      { id: "book-club", label: "読書会" },
      { id: "photography", label: "写真・カメラ" },
      { id: "music", label: "音楽・楽器" },
      { id: "dance", label: "ダンス" },
      { id: "crafts", label: "手芸・クラフト" },
      { id: "cooking", label: "料理・お菓子作り" },
      { id: "esports", label: "eスポーツ" },
      { id: "art-illustration", label: "アート・イラスト" },
    ],
  },
  {
    id: "senior-casual",
    label: "シニア・ゆるやか系",
    children: [
      { id: "go-shogi", label: "囲碁・将棋" },
      { id: "gardening", label: "園芸・ガーデニング" },
      { id: "walking", label: "ウォーキング" },
      { id: "mahjong", label: "麻雀" },
      { id: "calligraphy-tea", label: "書道・茶道" },
    ],
  },
] as const;

export const areaOptions = [
  { id: "chuo-ku", label: "中央区" },
  { id: "higashi-ku", label: "東区" },
  { id: "nishi-ku", label: "西区" },
  { id: "konan-ku", label: "江南区" },
  { id: "akiha-ku", label: "秋葉区" },
  { id: "minami-ku", label: "南区" },
  { id: "kita-ku", label: "北区" },
  { id: "nishikan-ku", label: "西蒲区" },
] as const;

export const citywideAreaId = "citywide";

export const frequencyOptions = [
  { id: "weekly-multi", label: "週2回以上" },
  { id: "weekly", label: "週1回程度" },
  { id: "monthly-2-3", label: "月2〜3回" },
  { id: "monthly-1-2", label: "月1〜2回" },
  { id: "monthly", label: "月1回程度" },
  { id: "irregular", label: "不定期" },
];

export const timeSlotOptions = ["平日（昼）", "平日（夜）", "土日（昼）", "土日（夜）", "その他"];

export const wizardSteps = ["基本情報", "詳細情報", "募集内容", "確認", "完了"];
