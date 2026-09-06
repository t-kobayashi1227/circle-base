// トップページのカテゴリ・新着サークルの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の categories / circles テーブルからの取得に置き換える。

export const popularCategories = [
  { label: "スポーツ", icon: "directions_run", color: "#E5731B" },
  { label: "アウトドア・登山", icon: "landscape", color: "#3E9E6A" },
  { label: "文化・趣味", icon: "menu_book", color: "#D9536A" },
  { label: "音楽・楽器", icon: "music_note", color: "#7B5FD1" },
  { label: "ゲーム", icon: "sports_esports", color: "#3F7FD1" },
  { label: "料理・手芸", icon: "restaurant", color: "#D9756A" },
  { label: "シニア・ゆるやか", icon: "groups", color: "#6E7A86" },
  { label: "その他", icon: "apps", color: "#9A9284" },
];

type CircleType = "ongoing" | "one_time";

export interface MockCircle {
  slug: string;
  type: CircleType;
  photoCaption: string;
  name: string;
  area: string;
  desc: string;
  metaIcon: string;
  meta: string;
  meta2?: string;
}

const typeBadge: Record<CircleType, { label: string; color: string }> = {
  ongoing: { label: "継続団体", color: "#4D6B8A" },
  one_time: { label: "単発募集", color: "#D9762B" },
};

export function circleBadge(type: CircleType) {
  return typeBadge[type];
}

export const newCircles: MockCircle[] = [
  {
    slug: "niigata-futsal",
    type: "ongoing",
    photoCaption: "フットサルの活動写真",
    name: "新潟市フットサルサークル",
    area: "中央区",
    desc: "初心者歓迎！楽しくフットサルをしています！",
    metaIcon: "person_add",
    meta: "メンバー募集中",
    meta2: "初心者歓迎",
  },
  {
    slug: "kakudayama-hiking",
    type: "one_time",
    photoCaption: "角田山の登山写真",
    name: "角田山ハイキング会",
    area: "西蒲区",
    desc: "5/25（日）開催のハイキング参加募集！",
    metaIcon: "calendar_month",
    meta: "5/25（日）開催",
    meta2: "初心者歓迎",
  },
  {
    slug: "shakaijin-basketball",
    type: "ongoing",
    photoCaption: "バスケの試合写真",
    name: "社会人バスケチーム",
    area: "東区",
    desc: "経験者・未経験者問わず楽しく活動中！",
    metaIcon: "person_add",
    meta: "メンバー募集中",
  },
  {
    slug: "photo-club",
    type: "ongoing",
    photoCaption: "カメラ撮影の写真",
    name: "写真を楽しむ会",
    area: "中央区",
    desc: "初心者からベテランまで、写真を楽しむ会です。",
    metaIcon: "person_add",
    meta: "メンバー募集中",
    meta2: "初心者歓迎",
  },
  {
    slug: "board-game-night",
    type: "one_time",
    photoCaption: "ボードゲーム卓の写真",
    name: "ボードゲーム会",
    area: "中央区",
    desc: "5/31（土）ボードゲームで遊ぼう！",
    metaIcon: "calendar_month",
    meta: "5/31（土）開催",
    meta2: "初心者歓迎",
  },
  {
    slug: "morning-running",
    type: "ongoing",
    photoCaption: "朝のランニング写真",
    name: "ランニングサークル",
    area: "江南区",
    desc: "週末の朝に楽しくランニング！",
    metaIcon: "person_add",
    meta: "メンバー募集中",
  },
];
