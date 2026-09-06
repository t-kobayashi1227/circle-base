// マイページの表示イメージ確認用モックデータ。
// 実データ接続時は Supabase の profiles / circles / conversations / circle_updates テーブル取得に置き換える。

export const mypageNav = [
  { icon: "home", label: "マイページ", href: "/mypage" },
  { icon: "group", label: "参加中のサークル", href: "/mypage/circles/joined" },
  { icon: "groups", label: "主催中のサークル", href: "/mypage/circles/owned" },
  { icon: "chat_bubble", label: "メッセージ", href: "/mypage/messages", badge: 3 },
  { icon: "favorite_border", label: "お気に入り", href: "/mypage/favorites" },
  { icon: "calendar_month", label: "参加予定のイベント", href: "/mypage/events" },
  { icon: "person", label: "プロフィール編集", href: "/mypage/profile" },
  { icon: "notifications", label: "通知設定", href: "/mypage/notifications" },
  { icon: "block", label: "ブロックユーザー", href: "/mypage/blocked-users" },
  { icon: "settings", label: "アカウント設定", href: "/mypage/settings" },
  { icon: "help", label: "ヘルプ・お問い合わせ", href: "/contact" },
];

export const profile = {
  displayName: "山好きさん",
  areaBadge: "新潟市在住",
  ageGender: "28歳・女性",
  bio: "自然やアウトドアが大好きです！いろんな人と楽しく活動したいです。",
  bioShort: "自然やアウトドアが大好きです！",
  joinedCount: 3,
  ownedCount: 1,
  likesCount: 24,
};

export const quickMenuDesktop = [
  { icon: "group", label: "参加中のサークル", color: "#E5731B", href: "/mypage/circles/joined" },
  { icon: "stars", label: "主催中のサークル", color: "#D9A227", href: "/mypage" },
  { icon: "chat_bubble", label: "メッセージ", color: "#4A87C4", href: "/mypage/messages", badge: 3 },
  { icon: "event", label: "参加予定のイベント", color: "#3E9E7A", href: "/mypage/events" },
  { icon: "person", label: "プロフィール編集", color: "#8B8375", href: "/mypage/profile" },
];

export const quickMenuMobile = [
  quickMenuDesktop[0],
  quickMenuDesktop[1],
  quickMenuDesktop[2],
  quickMenuDesktop[3],
  { icon: "verified_user", label: "お気に入り", color: "#D9762B", href: "/mypage/favorites" },
  quickMenuDesktop[4],
];

export interface JoinedCircle {
  id: string;
  name: string;
  next: string;
  nextShort: string;
  freq: string;
  photoCaption: string;
}

export const joinedCircles: JoinedCircle[] = [
  { id: "yamaaruki", name: "新潟山歩きの会", next: "5/18 角田山ハイキング", nextShort: "次回 5/18", freq: "月2〜3回", photoCaption: "稜線を歩くメンバーの写真" },
  { id: "lunch-kai", name: "下山後のランチ交流会", next: "5/12 ランチ会", nextShort: "不定期", freq: "不定期", photoCaption: "野外で食事をする写真" },
  { id: "yurucamp", name: "ゆるキャン△新潟", next: "5/25 キャンプ", nextShort: "次回 5/月程度", freq: "月1回程度", photoCaption: "テントとキャンプの写真" },
  { id: "weekend-trek", name: "週末トレッキング同好会", next: "6/1 トレッキング", nextShort: "次回 6/1", freq: "月1〜2回", photoCaption: "新緑の登山道の写真" },
];

export interface UpcomingEvent {
  id: string;
  date: string;
  dow: string;
  title: string;
  time: string;
  place: string;
}

export const upcomingEvents: UpcomingEvent[] = [
  { id: "e1", date: "5/12", dow: "日", title: "下山後のランチ交流会", time: "11:30〜14:00", place: "新潟市中央区" },
  { id: "e2", date: "5/18", dow: "日", title: "角田山ハイキング", time: "8:00〜12:00", place: "新潟市西蒲区" },
  { id: "e3", date: "5/25", dow: "日", title: "キャンプで星空観察", time: "15:00〜翌10:00", place: "胎内市" },
];

export const notices = [
  { icon: "circle", iconColor: "#E5911B", title: "新しいメッセージが届いています", body: "下山後のランチ交流会の佐藤さんからメッセージが届いています。", ago: "2時間前" },
  { icon: "schedule", iconColor: "#D9A227", title: "イベントのリマインド", body: "5/12 下山後のランチ交流会の開催が近づいています。", ago: "1日前" },
  { icon: "campaign", iconColor: "#D9A227", title: "サークルからのお知らせ", body: "新潟山歩きの会からお知らせが届いています。", ago: "3日前" },
];

export const activities = [
  { text: "下山後のランチ交流会に参加しました", date: "4/28" },
  { text: "角田山ハイキングにコメントしました", date: "4/25" },
  { text: "新潟山歩きの会のイベントに参加予定です", date: "4/20" },
];
