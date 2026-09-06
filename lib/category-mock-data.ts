// カテゴリ別一覧（SEOランディング）ページの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の categories / circles テーブルへのクエリに置き換える。

export interface CategoryInfo {
  slug: string;
  label: string;
  icon: string;
  heroDesc: string;
  tagline: string;
  about: string;
  recommends: string[];
}

export const categories: CategoryInfo[] = [
  {
    slug: "outdoor-mountain",
    label: "登山・ハイキング",
    icon: "landscape",
    heroDesc: "新潟の山を歩いて、心も体もリフレッシュ\n自然を楽しむ仲間と出会えるサークルが見つかります。",
    tagline: "新しい景色を\n一緒に見に行こう！",
    about: "登山・ハイキングに関するサークルの一覧です。初心者から経験者まで、新潟の自然を楽しむ仲間と出会えます。",
    recommends: ["自然が好きな方", "運動不足を解消したい方", "新しい友達を作りたい方", "初心者から始めてみたい方"],
  },
  {
    slug: "camping",
    label: "キャンプ",
    icon: "cabin",
    heroDesc: "焚き火を囲んで、非日常のひとときを\nキャンプ好きの仲間と自然の中で過ごせます。",
    tagline: "焚き火を囲んで\n語り合おう！",
    about: "キャンプに関するサークルの一覧です。デイキャンプから本格的な野営まで、様々なスタイルの仲間が見つかります。",
    recommends: ["アウトドアが好きな方", "道具集めも楽しみたい方", "焚き火を囲んでゆったりしたい方", "初めてのキャンプに挑戦したい方"],
  },
  {
    slug: "running",
    label: "ランニング",
    icon: "directions_run",
    heroDesc: "走る楽しさを、みんなで分かち合おう\nマラソン大会を目指す仲間も見つかります。",
    tagline: "一緒に走れば\nもっと楽しい！",
    about: "ランニングに関するサークルの一覧です。初心者ジョギングからマラソン挑戦まで、レベルに合った仲間が見つかります。",
    recommends: ["健康のために走りたい方", "マラソン大会に挑戦したい方", "一人では続かなかった方", "走る仲間がほしい方"],
  },
  {
    slug: "yoga-pilates",
    label: "ヨガ・ピラティス",
    icon: "self_improvement",
    heroDesc: "呼吸を整えて、心と体をゆるめよう\n初心者向けのレッスンも多数開催中です。",
    tagline: "深呼吸から\n始めよう。",
    about: "ヨガ・ピラティスに関するサークルの一覧です。運動が苦手な方でも安心して参加できるサークルが揃っています。",
    recommends: ["体をやわらかくしたい方", "リラックスする時間がほしい方", "運動が苦手な方", "マイペースに続けたい方"],
  },
  {
    slug: "spectator-sports",
    label: "スポーツ観戦",
    icon: "sports",
    heroDesc: "みんなで応援すれば、感動も倍に\n新潟のチームをともに応援する仲間が見つかります。",
    tagline: "一緒に応援\nしよう！",
    about: "スポーツ観戦に関するサークルの一覧です。同じチームを応援する仲間と、試合の日を一緒に楽しめます。",
    recommends: ["応援する仲間がほしい方", "地元チームを応援したい方", "観戦後に感想を語り合いたい方", "スポーツ観戦が好きな方"],
  },
  {
    slug: "music-live",
    label: "音楽・ライブ",
    icon: "music_note",
    heroDesc: "好きな音楽を、好きな人たちと\nライブやセッションを楽しむ仲間が見つかります。",
    tagline: "音楽でつながる\n仲間を探そう。",
    about: "音楽・ライブに関するサークルの一覧です。演奏する方も聴くのが好きな方も、楽しめるサークルが揃っています。",
    recommends: ["楽器を演奏する方", "ライブ鑑賞が好きな方", "バンド活動をしたい方", "音楽の話ができる仲間がほしい方"],
  },
  {
    slug: "food-gourmet",
    label: "料理・グルメ",
    icon: "restaurant",
    heroDesc: "作る楽しさも、食べる楽しさも\n新潟の美味しいものを一緒に楽しめます。",
    tagline: "美味しいものを\n一緒に。",
    about: "料理・グルメに関するサークルの一覧です。料理教室から食べ歩きまで、食にまつわる仲間が見つかります。",
    recommends: ["料理が好きな方", "食べ歩きが好きな方", "新しいレシピに挑戦したい方", "一緒にご飯を楽しみたい方"],
  },
  {
    slug: "photography",
    label: "写真・カメラ",
    icon: "photo_camera",
    heroDesc: "新潟の景色を、写真に残そう\n撮影スポットを共有できる仲間が見つかります。",
    tagline: "その瞬間を\n一緒に撮ろう。",
    about: "写真・カメラに関するサークルの一覧です。初心者から本格派まで、撮影を楽しむ仲間が見つかります。",
    recommends: ["カメラを始めたばかりの方", "撮影スポットを知りたい方", "作品を見せ合いたい方", "写真が趣味の方"],
  },
  {
    slug: "other",
    label: "その他",
    icon: "category",
    heroDesc: "ジャンルにとらわれず、新しい出会いを\n様々な趣味のサークルが見つかります。",
    tagline: "新しい趣味を\n見つけよう。",
    about: "上記のカテゴリに当てはまらないサークルの一覧です。多彩な趣味のサークルが揃っています。",
    recommends: ["新しい趣味を探している方", "色々なジャンルに興味がある方", "気軽に参加したい方", "新しい出会いがほしい方"],
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo {
  return categories.find((c) => c.slug === slug) ?? categories[0];
}

export function getRelatedCategories(slug: string): CategoryInfo[] {
  const index = categories.findIndex((c) => c.slug === slug);
  const start = index === -1 ? 0 : index;
  const related: CategoryInfo[] = [];
  for (let i = 1; i <= 3; i++) {
    related.push(categories[(start + i) % categories.length]);
  }
  return related;
}

export type CategoryTagKey = "beginner" | "experienced" | "social";

export const categoryTagStyle: Record<CategoryTagKey, { label: string; bg: string; color: string }> = {
  beginner: { label: "初心者歓迎", bg: "#EEF7F1", color: "#3E8E68" },
  experienced: { label: "経験者向け", bg: "#FDF0E3", color: "#C07E1B" },
  social: { label: "社会人中心", bg: "#EDF3F9", color: "#4D6B8A" },
};

export interface CategoryCircle {
  id: string;
  isNew?: boolean;
  tag: CategoryTagKey;
  name: string;
  area: string;
  desc: string;
  members: string;
  freq: string;
  photoCaption: string;
}

// 実データ接続まではカテゴリに関わらず同じモック一覧を表示する。
export const categoryCircles: CategoryCircle[] = [
  { id: "cc1", isNew: true, tag: "beginner", name: "新潟山歩きの会", area: "新潟市西蒲区", desc: "新潟の山々を中心に、月1〜2回のペースで登山やハイキングを楽し…", members: "28人", freq: "月1〜2回", photoCaption: "稜線を歩くメンバーの写真" },
  { id: "cc2", tag: "beginner", name: "越後ゆるハイク", area: "長岡市", desc: "ゆるく楽しく！絶景スポットをのんびり歩くサークルです。", members: "16人", freq: "月1回", photoCaption: "湖を見下ろす登山道の写真" },
  { id: "cc3", tag: "experienced", name: "紅葉を楽しむ登山部", area: "新潟市中央区", desc: "四季折々の景色を楽しみながら登る登山サークルです。", members: "12人", freq: "不定期", photoCaption: "紅葉の山並みの写真" },
  { id: "cc4", tag: "beginner", name: "雪山チャレンジ隊", area: "上越市", desc: "冬の新潟の山を一緒に楽しみませんか？雪山初心者も大歓迎です！", members: "8人", freq: "月1〜2回", photoCaption: "雪山を登るメンバーの写真" },
  { id: "cc5", tag: "social", name: "やまカフェ倶楽部", area: "新潟市中央区", desc: "登山のあとのカフェタイムも楽しむ、ゆるやかなサークルです。", members: "20人", freq: "月1回", photoCaption: "山中で休憩するメンバーの写真" },
  { id: "cc6", tag: "social", name: "平日ゆるハイキング", area: "新発田市", desc: "平日にのんびりハイキングを楽しむ社会人サークルです。", members: "14人", freq: "月1〜2回", photoCaption: "夕暮れの山頂の写真" },
];

export const categoryFreqChecks = ["週1回以上", "月1〜2回", "不定期"];
export const categoryTargetChecks = ["初心者歓迎", "経験者向け", "女性中心", "社会人中心", "学生歓迎"];
