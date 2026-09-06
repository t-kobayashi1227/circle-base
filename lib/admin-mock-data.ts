// 管理者ダッシュボードの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の circles / profiles / reports / circle_updates への集計クエリに置き換える。

export interface AdminNavItem {
  icon: string;
  label: string;
  href: string;
  badge?: number;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "サークル管理",
    items: [
      { icon: "view_list", label: "サークル一覧", href: "/admin/circles" },
      { icon: "schedule", label: "サークル承認（確認）", href: "/admin/circles?status=pending", badge: 5 },
      { icon: "category", label: "サークルカテゴリ", href: "/admin/categories" },
    ],
  },
  {
    title: "ユーザー管理",
    items: [
      { icon: "person", label: "ユーザー一覧", href: "/admin/users" },
      { icon: "schedule", label: "ユーザー承認（確認）", href: "/admin/users?status=pending", badge: 4 },
      { icon: "block", label: "ブロックユーザー", href: "/admin/users?status=blocked" },
    ],
  },
  {
    title: "投稿・活動管理",
    items: [
      { icon: "photo_camera", label: "活動一覧（報告・削除）", href: "/admin/updates" },
      { icon: "flag", label: "通報一覧", href: "/admin/reports", badge: 12 },
      { icon: "campaign", label: "お知らせ管理", href: "/admin/notices" },
    ],
  },
  {
    title: "システム設定",
    items: [
      { icon: "settings", label: "サイト設定", href: "/admin/settings" },
      { icon: "description", label: "利用規約・ガイドライン", href: "/admin/settings/terms" },
      { icon: "mail", label: "メールテンプレート", href: "/admin/settings/email-templates" },
      { icon: "history", label: "ログ管理", href: "/admin/logs" },
    ],
  },
];

export const adminBottomNavTabs = [
  { icon: "home", label: "ダッシュボード", href: "/admin" },
  { icon: "groups", label: "サークル", href: "/admin/circles" },
  { icon: "person", label: "ユーザー", href: "/admin/users" },
  { icon: "flag", label: "通報・投稿", href: "/admin/reports" },
  { icon: "settings", label: "設定", href: "/admin/settings" },
];

export interface StatCard {
  icon: string;
  label: string;
  value: string;
  unit: string;
  delta: string;
  shortDelta: string;
}

export const dashboardStats: StatCard[] = [
  { icon: "group", label: "総ユーザー数", value: "1,284", unit: "人", delta: "+28人（前月比 +2.2%）", shortDelta: "+28人" },
  { icon: "groups", label: "公開中サークル数", value: "312", unit: "件", delta: "+12件（前月比 +4.0%）", shortDelta: "+12件" },
  { icon: "calendar_month", label: "今月の新規活動数", value: "156", unit: "件", delta: "+18件（前月比 +13.0%）", shortDelta: "+18件" },
  { icon: "chat_bubble", label: "今月のメッセージ数", value: "842", unit: "件", delta: "+95件（前月比 +12.7%）", shortDelta: "+95件" },
];

export interface CircleApplication {
  id: string;
  name: string;
  category: string;
  date: string;
  photoCaption: string;
}

export const circleApplications: CircleApplication[] = [
  { id: "a1", name: "ゆるキャン△新潟", category: "キャンプ・アウトドア", date: "2024/05/30", photoCaption: "テントとキャンプの写真" },
  { id: "a2", name: "新潟カフェ巡り部", category: "食べ歩き・グルメ", date: "2024/05/30", photoCaption: "カフェの写真" },
  { id: "a3", name: "にいがた写真部", category: "写真・カメラ", date: "2024/05/29", photoCaption: "街並みの写真" },
  { id: "a4", name: "ボードゲームで遊ぼう会", category: "ゲーム・ボードゲーム", date: "2024/05/28", photoCaption: "ボードゲーム卓の写真" },
];

export type ReportTag = "post" | "annoy" | "user" | "other";

export const reportTagStyle: Record<ReportTag, { bg: string; color: string; label: string }> = {
  post: { bg: "#FDECEA", color: "#C5453A", label: "不適切な投稿" },
  annoy: { bg: "#FDECEA", color: "#C5453A", label: "迷惑行為" },
  user: { bg: "#FDECEA", color: "#C5453A", label: "不適切なユーザー" },
  other: { bg: "#F3EDE2", color: "#6E6558", label: "その他" },
};

export interface ReportItem {
  id: string;
  tag: ReportTag;
  title: string;
  by: string;
  ago: string;
}

export const recentReports: ReportItem[] = [
  { id: "r1", tag: "post", title: "山歩きの会の活動写真について", by: "佐藤 さくら", ago: "2時間前" },
  { id: "r2", tag: "annoy", title: "メッセージでのしつこい勧誘", by: "田中 美咲", ago: "5時間前" },
  { id: "r3", tag: "user", title: "プロフィールの内容について", by: "高橋 健太", ago: "1日前" },
  { id: "r4", tag: "other", title: "規約違反の可能性", by: "伊藤 翔", ago: "2日前" },
];

export const adminNotices = [
  { icon: "campaign", title: "システムメンテナンスのお知らせ", body: "6/5（水）02:00〜05:00にシステムメンテナンスを実施します。", date: "2024/05/30" },
  { icon: "campaign", title: "利用ガイドラインの改定について", body: "6/1より利用ガイドラインを改定します。詳細をご確認ください。", date: "2024/05/28" },
  { icon: "campaign", title: "不正利用に関する注意喚起", body: "不正な勧誘や迷惑行為が増えています。見かけた場合は通報をお願いします。", date: "2024/05/25" },
];

export const userGrowthChartLabels = ["4/1", "4/8", "4/15", "4/22", "4/29", "5/6", "5/13", "5/20", "5/27"];

// SVGパス座標（viewBox 0 0 560 236）。デザインの折れ線チャートをそのまま再現。
export const userGrowthChartAreaPath =
  "M0,222 L18,218 L36,214 L54,205 L72,207 L90,196 L108,186 L126,178 L144,181 L162,166 L180,158 L198,148 L216,152 L234,138 L252,127 L270,118 L288,124 L306,104 L324,90 L342,79 L360,86 L378,68 L396,74 L414,58 L432,63 L450,48 L468,40 L486,49 L504,36 L522,29 L540,33 L560,26 L560,236 L0,236 Z";
export const userGrowthChartLinePath =
  "M0,222 L18,218 L36,214 L54,205 L72,207 L90,196 L108,186 L126,178 L144,181 L162,166 L180,158 L198,148 L216,152 L234,138 L252,127 L270,118 L288,124 L306,104 L324,90 L342,79 L360,86 L378,68 L396,74 L414,58 L432,63 L450,48 L468,40 L486,49 L504,36 L522,29 L540,33 L560,26";
