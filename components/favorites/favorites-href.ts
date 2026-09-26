import type { FavoritesSort } from "@/lib/circle-favorites";

export type FavoritesFilter = "all" | "circle" | "event";

// お気に入りページの種別タブ・並び替えをクエリ文字列に反映したURLを組み立てる。
// サーバー（ページ）とクライアント（ツールバー）の両方から使うため、"use client" ファイルとは分けている。
export function favoritesHref(filter: FavoritesFilter, sort: FavoritesSort): string {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("type", filter);
  if (sort !== "new") params.set("sort", sort);
  const qs = params.toString();
  return qs ? `/mypage/favorites?${qs}` : "/mypage/favorites";
}
