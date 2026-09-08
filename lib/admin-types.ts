// 管理画面向けの型・定数（クライアントコンポーネントからも安全に import できるよう、
// サーバー専用コード（lib/supabase/server.ts など）に依存しないファイルに分離している）。

import type { CircleWithRelations } from "@/lib/circles";

export interface AdminStats {
  totalUsers: number;
  publishedCircles: number;
  unpublishedCircles: number;
  pendingReports: number;
}

export interface AdminCircleRow extends CircleWithRelations {
  ownerDisplayName: string;
}

export interface AdminReportRow {
  id: string;
  targetType: string;
  targetId: string;
  reason: string;
  status: string;
  createdAt: string;
  reporterDisplayName: string;
  targetLabel: string;
  targetHref: string | null;
  targetCircleId: string | null;
  targetCircleStatus: string | null;
}

export const reportStatusLabel: Record<string, string> = {
  pending: "未対応",
  in_progress: "対応中",
  resolved: "対応済み",
};
