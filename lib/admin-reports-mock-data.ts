// 通報管理ダッシュボードの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の reports テーブル取得・更新に置き換える。

export type ReportStatus = "pending" | "inProgress" | "done" | "rejected";

export const reportStatusStyle: Record<ReportStatus, { label: string; bg: string; color: string }> = {
  pending: { label: "未対応", bg: "#FDECEA", color: "#C5453A" },
  inProgress: { label: "対応中", bg: "#FDF3E4", color: "#C07E1B" },
  done: { label: "対応済み", bg: "#EEF7F1", color: "#3E8E68" },
  rejected: { label: "却下", bg: "#F3EDE2", color: "#6E6558" },
};

export const reportStatusOrder: ReportStatus[] = ["pending", "inProgress", "done", "rejected"];

export type ReportTargetType = "user" | "circle";

export interface ReportDetail {
  id: string;
  reason: string;
  status: ReportStatus;
  reportedAt: string;
  content: string;
  targetName: string;
  targetType: ReportTargetType;
  targetPhotoCaption: string;
  reportedMessage: string;
  reporterName: string;
  reporterPhotoCaption: string;
}

export const reports: ReportDetail[] = [
  {
    id: "#R-2024-0012",
    reason: "不適切な投稿・誹謗中傷",
    status: "pending",
    reportedAt: "2024/05/30 14:32",
    content:
      "特定の個人に対する誹謗中傷の内容が含まれている投稿を見つけました。他のメンバーが不快に感じる可能性があります。",
    targetName: "山田 太郎",
    targetType: "user",
    targetPhotoCaption: "山田太郎さんの写真",
    reportedMessage: "この人のやり方はおかしいと思います。参加しない方がいいです。",
    reporterName: "佐藤 花子",
    reporterPhotoCaption: "佐藤花子さんの写真",
  },
  {
    id: "#R-2024-0011",
    reason: "迷惑行為・勧誘",
    status: "inProgress",
    reportedAt: "2024/05/30 11:15",
    content: "サークル内のメッセージで、別サービスへの勧誘を繰り返し行っているとの報告です。",
    targetName: "新潟ハイキング部",
    targetType: "circle",
    targetPhotoCaption: "新潟ハイキング部の写真",
    reportedMessage: "よかったらこちらのグループにも参加してみませんか？お得な情報が届きます。",
    reporterName: "田中 健一",
    reporterPhotoCaption: "田中健一さんの写真",
  },
  {
    id: "#R-2024-0010",
    reason: "不適切なプロフィール",
    status: "inProgress",
    reportedAt: "2024/05/29 19:48",
    content: "プロフィール画像・自己紹介文に不適切な表現が含まれているとの報告です。",
    targetName: "鈴木 美咲",
    targetType: "user",
    targetPhotoCaption: "鈴木美咲さんの写真",
    reportedMessage: "（プロフィール自己紹介文より）他のユーザーが不快に感じる表現が含まれています。",
    reporterName: "伊藤 翔",
    reporterPhotoCaption: "伊藤翔さんの写真",
  },
  {
    id: "#R-2024-0009",
    reason: "不適切な投稿・誹謗中傷",
    status: "done",
    reportedAt: "2024/05/29 16:22",
    content: "活動報告の投稿コメント欄で、他メンバーへの誹謗中傷が確認されたとの報告です。対応済みです。",
    targetName: "ボードゲームで遊ぼう会",
    targetType: "circle",
    targetPhotoCaption: "ボードゲームの写真",
    reportedMessage: "こんな人がいるサークルには参加したくないですね。",
    reporterName: "髙橋 優子",
    reporterPhotoCaption: "髙橋優子さんの写真",
  },
  {
    id: "#R-2024-0008",
    reason: "迷惑行為・勧誘",
    status: "done",
    reportedAt: "2024/05/28 22:07",
    content: "個別メッセージで繰り返し勧誘行為が行われたとの報告です。当該ユーザーには警告済みです。",
    targetName: "佐々木 健",
    targetType: "user",
    targetPhotoCaption: "佐々木健さんの写真",
    reportedMessage: "今度うちのイベントにも来ませんか？連絡先を教えてください。",
    reporterName: "山本 彩",
    reporterPhotoCaption: "山本彩さんの写真",
  },
];

// タブの件数は通報全体（12件）に対する集計値。一覧に表示するモック行は先頭ページ分の5件のみ。
export const reportTabs = [
  { key: "all" as const, label: "すべて", count: 12 },
  { key: "pending" as const, label: "未対応", count: 5 },
  { key: "inProgress" as const, label: "対応中", count: 3 },
  { key: "done" as const, label: "対応済み", count: 4 },
];
