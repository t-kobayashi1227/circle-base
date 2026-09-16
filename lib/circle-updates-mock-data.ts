// サークル管理画面（基本情報・メンバー募集・活動の様子タブ）の左サイドナビ構成。

export const manageNav = [
  { key: "info", icon: "home", label: "基本情報", href: "/edit" },
  { key: "recruit", icon: "diversity_3", label: "メンバー募集", href: "/recruit" },
  { key: "updates", icon: "photo_camera", label: "活動の様子・メッセージ", href: "/updates" },
  { key: "owner", icon: "person", label: "主催者情報", href: "/owner" },
] as const;
