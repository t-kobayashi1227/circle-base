// アカウント設定ページの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase Auth（メール・パスワード）と profiles テーブルに置き換える。

export interface AccountField {
  label: string;
  value: string;
  mvalue: string;
}

export const accountFields: AccountField[] = [
  { label: "ユーザー名", value: "山田 太郎", mvalue: "山田 太郎" },
  { label: "メールアドレス", value: "yamada.taro@example.com", mvalue: "yamada.taro\n@example.com" },
  { label: "電話番号", value: "090-1234-5678", mvalue: "090-1234-5678" },
  { label: "生年月日", value: "1995年6月15日", mvalue: "1995年6月15日" },
  { label: "性別", value: "男性", mvalue: "男性" },
];

export interface NotifSetting {
  key: string;
  label: string;
  desc: string;
}

export const notifSettings: NotifSetting[] = [
  { key: "messages", label: "メッセージの受信通知", desc: "新しいメッセージを受信したときに通知します" },
  { key: "circleApprovals", label: "サークルの承認・参加通知", desc: "サークルの承認や参加に関する通知を受け取る" },
  { key: "eventReminders", label: "イベントのリマインド通知", desc: "参加予定のイベントのリマインドを受け取る" },
  { key: "announcements", label: "運営からのお知らせ", desc: "サービスのアップデートや重要なお知らせを受け取る" },
];

export const deleteWarnings = [
  "参加中のサークルから自動的に退会されます",
  "メッセージ履歴や投稿内容はすべて削除されます",
  "一度削除すると元に戻すことはできません",
];
