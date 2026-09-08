// サークル管理画面（活動の様子タブ）の左サイドナビ構成。
// 実装済みのページ（サークル情報・活動の様子）のみを掲載する。

export const manageNav = [
  { key: "info", icon: "home", label: "サークル情報", href: "/edit" },
  { key: "updates", icon: "photo_camera", label: "活動の様子", href: "/updates" },
] as const;
