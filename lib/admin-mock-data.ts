// 管理画面のナビゲーション構成（仕様書2.3の4項目に対応する実装済みページのみ）。

export interface AdminNavItem {
  icon: string;
  label: string;
  href: string;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    title: "サークル管理",
    items: [{ icon: "view_list", label: "サークル一覧", href: "/admin/circles" }],
  },
  {
    title: "通報対応",
    items: [{ icon: "flag", label: "通報一覧", href: "/admin/reports" }],
  },
  {
    title: "マスタ管理",
    items: [
      { icon: "category", label: "カテゴリ管理", href: "/admin/categories" },
      { icon: "place", label: "エリア管理", href: "/admin/areas" },
    ],
  },
];

export const adminBottomNavTabs = [
  { icon: "home", label: "ダッシュボード", href: "/admin" },
  { icon: "groups", label: "サークル", href: "/admin/circles" },
  { icon: "flag", label: "通報", href: "/admin/reports" },
  { icon: "category", label: "マスタ", href: "/admin/categories" },
];
