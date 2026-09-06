// サークル詳細ページの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の circles / circle_images テーブル取得に置き換える。

export interface CircleDetail {
  slug: string;
  name: string;
  tagline: string;
  badges: { label: string; tone: "primary" | "green" | "purple" }[];
  categoryPath: { label: string; href: string }[];
  category: string;
  area: string;
  stats: { icon: string; label: string; value: string }[];
  photos: { id: string; caption: string }[];
  description: string[];
  tags: string[];
  activities: string[];
  requirements: string[];
  locationPrimary: string;
  locationSecondary: string;
  locationNote: string;
  scheduleDetail: { label: string; value: string }[];
}

export const mockCircleDetail: CircleDetail = {
  slug: "niigata-yamaaruki",
  name: "新潟山歩きの会",
  tagline: "自然を楽しみ、仲間とつながる登山サークル",
  badges: [
    { label: "メンバー募集中", tone: "primary" },
    { label: "初心者歓迎", tone: "green" },
    { label: "見学OK", tone: "purple" },
  ],
  categoryPath: [
    { label: "ホーム", href: "/" },
    { label: "サークルを探す", href: "/circles" },
    { label: "スポーツ", href: "/circles" },
    { label: "アウトドア・登山", href: "/circles" },
  ],
  category: "アウトドア・登山",
  area: "新潟市中央区・市内全域",
  stats: [
    { icon: "event_repeat", label: "活動頻度", value: "月2〜3回" },
    { icon: "schedule", label: "主な活動時間", value: "土日・祝日" },
    { icon: "group", label: "メンバー数", value: "28名（男性16名・女性12名）" },
    { icon: "calendar_month", label: "設立", value: "2021年4月" },
  ],
  photos: [
    { id: "main", caption: "稜線を歩くメンバー" },
    { id: "sub1", caption: "集合写真" },
    { id: "sub2", caption: "森の登山道" },
    { id: "sub3", caption: "湖の風景" },
    { id: "sub4", caption: "下山後の食事" },
  ],
  description: [
    "新潟の自然を楽しみながら、登山を通じて仲間づくりをしています。",
    "初心者から経験者まで、それぞれのペースで山を楽しめるアットホームなサークルです。",
    "安全第一で、無理のない計画を立てて活動しています。",
  ],
  tags: ["初心者歓迎", "経験者歓迎", "見学OK", "男性歓迎", "女性歓迎"],
  activities: [
    "新潟県内外の山への日帰り登山・ハイキング",
    "季節ごとの自然観察・写真撮影",
    "登山技術や装備の情報交換",
    "下山後の温泉・食事会などの交流",
  ],
  requirements: [
    "18歳以上の方（高校生は要相談）",
    "登山経験は問いません",
    "自然を大切にする気持ちのある方",
    "ルールやマナーを守れる方",
  ],
  locationPrimary: "新潟県内の山（角田山・弥彦山・栗ヶ岳・守門岳など）",
  locationSecondary: "県外（谷川岳・尾瀬・八海山・妙高山など）",
  locationNote: "※集合場所は新潟市内の駐車場や駅周辺が中心です。",
  scheduleDetail: [
    { label: "頻度", value: "月2〜3回程度" },
    { label: "時間", value: "日帰り（6:00〜17:00頃）" },
    { label: "曜日", value: "主に土日・祝日" },
  ],
};

interface DetailTab {
  key: string;
  label: string;
  mobileLabel: string | null;
  icon: string;
  mobileIcon?: string;
  href: string | null;
  count?: number;
}

export const detailTabs: DetailTab[] = [
  { key: "basic", label: "基本情報", mobileLabel: "基本情報", icon: "article", href: null },
  { key: "updates", label: "活動の様子", mobileLabel: "活動の様子", icon: "photo_camera", href: "updates", count: 18 },
  { key: "recruit", label: "メンバー募集内容", mobileLabel: "募集内容", icon: "group", mobileIcon: "event_note", href: null },
  { key: "messages", label: "メッセージ", mobileLabel: "メッセージ", icon: "chat_bubble", href: null, count: 3 },
  { key: "owner", label: "主催者情報", mobileLabel: null, icon: "person", href: null },
];

const badgeTone: Record<CircleDetail["badges"][number]["tone"], string> = {
  primary: "bg-cb-accent text-white",
  green: "bg-[#EEF7F1] border border-[#C9E3D4] text-[#3E8E68]",
  purple: "bg-[#F2F0FA] border border-[#D6D0EE] text-[#6E5FC0]",
};

export function badgeClassName(tone: CircleDetail["badges"][number]["tone"]) {
  return badgeTone[tone];
}
