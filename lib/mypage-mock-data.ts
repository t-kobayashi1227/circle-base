// マイページのナビゲーション・クイックメニュー用の静的構成データ。
// サークル・プロフィールなどの実データは lib/mypage.ts / lib/circles.ts から取得する。

export const mypageNav = [
  { icon: "home", label: "マイページ", href: "/mypage" },
  { icon: "group", label: "参加中のサークル", href: "/mypage/circles/joined" },
  { icon: "groups", label: "主催中のサークル", href: "/mypage/circles/owned" },
  { icon: "chat_bubble", label: "メッセージ", href: "/mypage/messages" },
  { icon: "favorite_border", label: "お気に入り", href: "/mypage/favorites" },
  { icon: "calendar_month", label: "参加予定のイベント", href: "/mypage/events" },
  { icon: "person", label: "プロフィール編集", href: "/mypage/profile" },
  { icon: "block", label: "ブロックユーザー", href: "/mypage/blocked-users" },
  { icon: "settings", label: "アカウント設定", href: "/mypage/settings" },
  { icon: "help", label: "ヘルプ・お問い合わせ", href: "/contact" },
];

export const quickMenuDesktop = [
  { icon: "group", label: "参加中のサークル", color: "#E5731B", href: "/mypage/circles/joined" },
  { icon: "stars", label: "主催中のサークル", color: "#D9A227", href: "/mypage/circles/owned" },
  { icon: "chat_bubble", label: "メッセージ", color: "#4A87C4", href: "/mypage/messages" },
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
