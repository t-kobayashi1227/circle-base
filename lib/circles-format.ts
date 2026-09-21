// サークル関連の純粋な整形ヘルパー。lib/supabase/server.ts に依存しないため、
// クライアントコンポーネントから直接importしても安全（lib/circles.ts経由だとサーバー専用の
// createClientが道連れでバンドルされてしまうため、この分離が必要）。

import type { CircleWithRelations, CircleUpdateRow } from "@/lib/circles";

export function formatDateJa(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00+09:00`);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

export function circleTypeLabel(type: string): string {
  return type === "one_time" ? "イベント" : "サークル";
}

const NEW_THRESHOLD_MS = 14 * 24 * 60 * 60 * 1000;

export function isRecentlyCreated(createdAt: string): boolean {
  return Date.now() - new Date(createdAt).getTime() < NEW_THRESHOLD_MS;
}

export function sortedImagePaths(circle: CircleWithRelations): string[] {
  return sortedImages(circle).map((img) => img.path);
}

export function sortedImages(circle: CircleWithRelations): { id: string; path: string }[] {
  return [...(circle.circle_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({ id: img.id, path: img.storage_path }));
}

export function coverImagePath(circle: CircleWithRelations): string | null {
  return sortedImagePaths(circle)[0] ?? null;
}

export function sortedUpdateImagePaths(update: CircleUpdateRow): string[] {
  return sortedUpdateImages(update).map((img) => img.path);
}

export function sortedUpdateImages(update: CircleUpdateRow): { id: string; path: string }[] {
  return [...(update.circle_update_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => ({ id: img.id, path: img.storage_path }));
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

// content の1行目を見出し、残りを説明文として扱う（circle_updates に見出し専用カラムがないため）。
export function splitUpdateContent(content: string): { title: string; desc: string } {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return { title: lines[0] ?? "", desc: lines.slice(1).join(" ") };
}
