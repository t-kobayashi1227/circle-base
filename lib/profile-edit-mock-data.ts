// プロフィール編集ページの表示イメージ確認用モックデータ・選択肢。
// 実データ接続時は Supabase の profiles テーブル取得・更新に置き換える。

export const genderOptions = ["女性", "男性", "その他", "回答しない"];

export const ageRangeOptions = [
  "10代",
  "20代前半（20〜24歳）",
  "20代後半（25〜29歳）",
  "30代前半（30〜34歳）",
  "30代後半（35〜39歳）",
  "40代",
  "50代以上",
];

export const areaOptions = [
  "中央区",
  "東区",
  "西区",
  "江南区",
  "秋葉区",
  "南区",
  "北区",
  "西蒲区",
  "市内全域",
];

export const interestOptions = [
  "登山・ハイキング",
  "キャンプ",
  "ランニング",
  "ヨガ・ピラティス",
  "音楽・ライブ",
  "料理・グルメ",
  "スポーツ観戦",
  "読書・カフェ",
  "写真・カメラ",
  "旅行・観光",
  "ボードゲーム",
  "その他",
];

export const defaultProfileValues = {
  displayName: "山好きさん",
  gender: "女性",
  ageRange: "20代後半（25〜29歳）",
  area: "中央区",
  bio: "自然やアウトドアが大好きです！いろんな人と楽しく活動したいです。\nよろしくお願いします😊",
  interests: ["登山・ハイキング", "キャンプ", "料理・グルメ"],
  instagram: "@yamasuki_niigata",
  x: "@yamasuki_28",
  link: "https://example.com",
  visibility: "public" as const,
};

export const visibilityOptions = [
  { id: "public" as const, label: "公開", note: "すべてのユーザーに公開します" },
  { id: "members" as const, label: "サークルメンバーのみ", note: "参加しているサークルのメンバーにのみ公開します" },
  { id: "private" as const, label: "非公開", note: "自分以外には公開されません" },
];
