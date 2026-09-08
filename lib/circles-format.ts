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
  return type === "one_time" ? "単発募集" : "継続団体";
}

export function sortedImagePaths(circle: CircleWithRelations): string[] {
  return [...(circle.circle_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.storage_path);
}

export function coverImagePath(circle: CircleWithRelations): string | null {
  return sortedImagePaths(circle)[0] ?? null;
}

export function sortedUpdateImagePaths(update: CircleUpdateRow): string[] {
  return [...(update.circle_update_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.storage_path);
}
